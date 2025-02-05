const express = require("express");
const supabase = require("../../utils/supabase");

const router = express.Router();

router.post("/save", async (req, res) => {
  const { email, sessionId, messages } = req.body;

  if (!email || !sessionId || !messages || messages.length === 0) {
    return res
      .status(400)
      .json({ error: "Email, sessionId, dan messages wajib diisi" });
  }

  try {
    let processedMessages = [];
    let header = "";

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].role === "user") {
        if (!header) {
          header = messages[i].content.split(" ").slice(0, 2).join(" ");
        }

        const assistantMessage =
          i + 1 < messages.length && messages[i + 1].role === "assistant"
            ? messages[i + 1]
            : null;

        const entry = {
          messages: [messages[i]],
        };

        if (assistantMessage) {
          entry.messages.push(assistantMessage);
          i++;
        }

        processedMessages.push(entry);
      }
    }

    if (processedMessages.length > 0) {
      processedMessages[0] = { header, ...processedMessages[0] };
    }

    const filePath = `${email}/${sessionId}.json`;
    const fileContent = JSON.stringify(processedMessages, null, 2);

    const { error } = await supabase.storage
      .from("HistoryAI")
      .upload(filePath, fileContent, {
        contentType: "application/json",
        upsert: true,
      });

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "History berhasil disimpan", filePath });
  } catch (err) {
    console.error("Gagal menyimpan history:", err);
    res.status(500).json({ error: "Terjadi kesalahan saat menyimpan history" });
  }
});

module.exports = router;
