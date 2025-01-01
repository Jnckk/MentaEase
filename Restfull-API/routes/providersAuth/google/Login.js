const express = require("express");
const supabase = require("../../../utils/supabase");

const router = express.Router();

router.get("/login", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Google login failed:", error);
      return res.status(400).json({ error: "Login dengan Google gagal." });
    }

    res.redirect(data.url);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Terjadi kesalahan server." });
  }
});

module.exports = router;
