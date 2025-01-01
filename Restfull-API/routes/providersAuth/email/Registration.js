const express = require("express");
const supabase = require("../../../utils/supabase");

const router = express.Router();

router.post("/registration", async (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ error: "Email dan password wajib diisi" });
  }

  try {
    // Periksa apakah email sudah terdaftar
    const { data: existingUser, error: fetchError } = await supabase
      .from("profiles") // Supabase menyimpan data user di tabel "auth.users"
      .select("*")
      .eq("email", email)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // Jika terjadi error selain "not found", kembalikan error
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan saat memeriksa email" });
    }

    if (existingUser) {
      // Email sudah terdaftar
      return res.status(400).json({ error: "Email sudah terdaftar" });
    }

    // Lanjutkan registrasi jika email belum terdaftar
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
