const express = require("express");
const supabase = require("../../utils/supabase");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email dan password wajib diisi" });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const userId = data.user.id;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("email, display_name, phone")
      .eq("id", userId)
      .single();

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    return res.status(200).json({
      message: "Login berhasil",
      user: data.user,
      profile: profileData,
      access_token: data.session.access_token,
    });
  } catch (err) {
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

module.exports = router;
