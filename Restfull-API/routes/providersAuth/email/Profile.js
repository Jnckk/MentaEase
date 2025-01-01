const express = require("express");
const supabase = require("../../../utils/supabase");
const verifyToken = require("../../../middlewares/verifyToken");

const router = express.Router();

router.get("/profile", verifyToken, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID tidak ditemukan" });
  }

  try {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("email, display_name, phone")
      .eq("id", userId)
      .single();

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    return res.status(200).json({
      message: "Data profil berhasil diambil",
      profile: profileData,
    });
  } catch (err) {
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

module.exports = router;
