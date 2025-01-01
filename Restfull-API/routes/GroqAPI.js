const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const aiIdentity = {
  id: `Halo! Nama saya AiThor, dan saya adalah seorang psikolog profesional lulusan Universitas Muhammadiyah Malang. Saya berfokus pada membantu orang-orang memahami dan mengatasi masalah kesehatan mental serta mengembangkan diri mereka menjadi lebih baik. Saya di sini untuk membantu menjawab pertanyaan-pertanyaan Anda tentang psikologi, terapi, dan pengembangan diri. Saya akan menjawab dengan gaya bahasa yang santai dan mudah dipahami, sehingga kita dapat berdiskusi dengan nyaman dan akrab. Jadi, apa pertanyaan Anda tentang psikologi?`,
  en: `Hello! My name is AiThor, and I am a professional psychologist who graduated from Muhammadiyah University of Malang. I specialize in helping people understand and overcome mental health challenges while improving themselves to become better. I'm here to answer your questions about psychology, therapy, and personal development. I'll respond in a relaxed and easy-to-understand style, so we can have a comfortable and friendly discussion. What questions do you have about psychology?`,
};

const sessionHistories = {};

async function getGroqChatCompletion(sessionId, prompt, language) {
  const systemMessage =
    language === "id"
      ? "Kamu harus menjawab semua pertanyaan menggunakan bahasa Indonesia, apapun jenis pertanyaan yang diberikan dan bahasa yang digunakan, kamu harus tetap menjawab menggunakan bahasa Indonesia."
      : "You must answer all questions in English, regardless of the type of question asked or the language used, you must always respond in English.";

  const messages = sessionHistories[sessionId] || [];

  if (messages.length === 0) {
    messages.push(
      {
        role: "system",
        content: aiIdentity[language] || aiIdentity["en"],
      },
      {
        role: "system",
        content: systemMessage,
      }
    );
    sessionHistories[sessionId] = messages;
  } else {
    const languageMessageIndex = messages.findIndex(
      (msg) =>
        msg.role === "system" &&
        (msg.content.startsWith("Kamu harus menjawab") ||
          msg.content.startsWith("You must answer"))
    );

    if (
      languageMessageIndex !== -1 &&
      messages[languageMessageIndex].content !== systemMessage
    ) {
      messages[languageMessageIndex].content = systemMessage;
    } else if (languageMessageIndex === -1) {
      messages.push({
        role: "system",
        content: systemMessage,
      });
    }
  }

  messages.push({
    role: "user",
    content: prompt,
  });

  return groq.chat.completions.create({
    messages: messages,
    model: "llama3-70b-8192",
  });
}

router.post("/", async (req, res) => {
  const { prompt, sessionId, language } = req.body;

  if (!sessionId || !language) {
    return res
      .status(400)
      .json({ error: "SessionId and language are required" });
  }

  if (!prompt && !sessionHistories[sessionId]) {
    return res.json({ response: aiIdentity[language] || aiIdentity["en"] });
  }

  if (!sessionHistories[sessionId]) {
    sessionHistories[sessionId] = [];
  }

  try {
    const chatCompletion = await getGroqChatCompletion(
      sessionId,
      prompt || "",
      language
    );
    const responseContent = chatCompletion.choices[0]?.message?.content || "";
    sessionHistories[sessionId].push({
      role: "assistant",
      content: responseContent,
    });
    res.json({ response: responseContent });
  } catch (error) {
    console.error("Error connecting to Groq API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
