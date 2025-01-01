const express = require("express");
const supabase = require("../../../utils/supabase");

const router = express.Router();

// Endpoint untuk meminta reset password
router.post("/Reset-Password", async (req, res) => {
  const { email } = req.body;

  // Validasi email
  if (!email) {
    return res.status(400).json({ error: "Email wajib diisi" });
  }

  try {
    // Panggil Supabase untuk mengirim email reset password
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      console.error("Error sending reset password email:", error.message);
      return res
        .status(400)
        .json({ error: "Gagal mengirim email reset password" });
    }

    // Tanggapan sukses
    return res.status(200).json({
      message: "Email reset password berhasil dikirim. Silakan cek inbox Anda.",
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

module.exports = router;
