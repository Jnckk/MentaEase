const express = require("express");
const router = express.Router();
const cors = require("cors"); // Import cors middleware
const Groq = require("groq-sdk");
const { v4: uuidv4 } = require("uuid");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const aiIdentity = `Nama Anda adalah AiThor, seorang psikolog profesional dan spesialis di bidang psikologi, lulusan Universitas Muhammadiyah Malang. Tugas Anda adalah memberikan penjelasan dan saran terkait psikologi dengan gaya bahasa yang santai dan mudah dipahami. Anda harus mampu menyesuaikan gaya bahasa dengan pengguna, sehingga terasa akrab namun tetap profesional. Fokuskan jawaban pada topik psikologi, termasuk masalah kesehatan mental, terapi, dan pengembangan diri. Jika menerima pertanyaan di luar topik psikologi, sampaikan bahwa Anda adalah psikolog dan tidak bisa menjawab selain tentang psikologi. Pastikan untuk menghindari istilah teknis yang rumit dan tetap menjaga relevansi jawaban dengan topik psikologi.`;

const sessionHistories = {};

async function getGroqChatCompletion(sessionId, prompt, language) {
  const systemMessage =
    language === "id"
      ? "Kamu harus menjawab semua pertanyaan menggunakan bahasa Indonesia, apapun jenis pertanyaan yang diberikan dan bahasa yang digunakan, kamu harus tetap menjawab menggunakan bahasa Indonesia."
      : "You must answer all questions in English, regardless of the type of question asked or the language used, you must always respond in English.";

  const messages = sessionHistories[sessionId] || [];

  // Jika sesi baru, tambahkan sistem pesan awal (identity dan aturan bahasa)
  if (messages.length === 0) {
    messages.push(
      {
        role: "system",
        content: aiIdentity,
      },
      {
        role: "system",
        content: systemMessage,
      }
    );
    sessionHistories[sessionId] = messages; // Simpan sesi
  } else {
    // Pastikan aturan bahasa terbaru tetap digunakan di sesi ini
    const languageMessageIndex = messages.findIndex(
      (msg) =>
        msg.role === "system" && msg.content.startsWith("You must answer")
    );

    if (languageMessageIndex !== -1) {
      messages[languageMessageIndex].content = systemMessage;
    } else {
      messages.push({
        role: "system",
        content: systemMessage,
      });
    }
  }

  // Tambahkan prompt pengguna ke riwayat pesan
  messages.push({
    role: "user",
    content: prompt,
  });

  // Kirim permintaan ke Groq API
  return groq.chat.completions.create({
    messages: messages,
    model: "llama3-70b-8192",
  });
}

// Tambahkan middleware CORS untuk route ini
router.use(
  cors({
    origin: "*", // Atur sesuai kebutuhan Anda
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

router.post("/", async (req, res) => {
  const { prompt, sessionId, language } = req.body;

  if (!prompt || !sessionId || !language) {
    return res.status(400).send("Prompt, sessionId, and language are required");
  }

  if (!sessionHistories[sessionId]) {
    sessionHistories[sessionId] = [];
  }

  try {
    const chatCompletion = await getGroqChatCompletion(
      sessionId,
      prompt,
      language
    );
    const responseContent = chatCompletion.choices[0]?.message?.content || "";
    sessionHistories[sessionId].push({
      role: "assistant",
      content: responseContent,
    });
    res.send(responseContent);
  } catch (error) {
    console.error("Error connecting to Groq API:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
