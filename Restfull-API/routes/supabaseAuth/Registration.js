const express = require("express");
const supabase = require("../../utils/supabase");

const router = express.Router();

router.post("/registration", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email dan password wajib diisi" });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          phone: null,
        },
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      message: "Registrasi berhasil",
      user: data.user,
    });
  } catch (err) {
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

module.exports = router;
