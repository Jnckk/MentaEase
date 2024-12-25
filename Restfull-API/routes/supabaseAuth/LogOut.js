const express = require("express");
const supabase = require("../../utils/supabase");
const verifyToken = require("../../middlewares/verifyToken"); // Middleware untuk verifikasi token

const router = express.Router();

// Endpoint untuk logout pengguna
router.post("/Logout", verifyToken, async (req, res) => {
  try {
    // Memanggil Supabase untuk sign out pengguna
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error);
      return res.status(400).json({ error: "Gagal logout pengguna" });
    }

    // Sukses logout
    return res.status(200).json({ message: "Logout berhasil" });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

module.exports = router;
