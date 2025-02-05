const express = require("express");
const supabase = require("../../utils/supabase");

const router = express.Router();

router.get("/list/:email", async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: "Email wajib diisi" });
  }

  try {
    const { data, error } = await supabase.storage
      .from("HistoryAI")
      .list(email, { limit: 50 });

    if (error) {
      throw error;
    }

    let historyList = [];

    for (let file of data) {
      const { data: fileData, error: fileError } = await supabase.storage
        .from("HistoryAI")
        .download(`${email}/${file.name}`);

      if (fileError) {
        console.error("Gagal mengunduh file:", fileError);
        continue;
      }

      const chatHistory = await fileData.text();
      const parsedHistory = JSON.parse(chatHistory);

      let header = "No Title";
      if (parsedHistory.length > 0 && parsedHistory[0].messages.length > 0) {
        const firstUserMessage = parsedHistory[0].messages.find(
          (msg) => msg.role === "user"
        );
        if (firstUserMessage) {
          header = firstUserMessage.content.split(" ").slice(0, 2).join(" ");
        }
      }

      historyList.push({
        sessionId: file.name.replace(".json", ""),
        header,
      });
    }

    res.status(200).json({ history: historyList });
  } catch (err) {
    console.error("Gagal mengambil daftar history:", err);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil history" });
  }
});

router.get("/detail/:email/:sessionId", async (req, res) => {
  const { email, sessionId } = req.params;

  if (!email || !sessionId) {
    return res.status(400).json({ error: "Email dan sessionId wajib diisi" });
  }

  try {
    const { data, error } = await supabase.storage
      .from("HistoryAI")
      .download(`${email}/${sessionId}.json`);

    if (error) {
      throw error;
    }

    const chatHistory = await data.text();
    res.status(200).json({ messages: JSON.parse(chatHistory) });
  } catch (err) {
    console.error("Gagal mengambil detail history:", err);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil history" });
  }
});

module.exports = router;
