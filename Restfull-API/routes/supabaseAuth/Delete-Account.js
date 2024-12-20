const express = require("express");
const supabase = require("../../utils/supabase");
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router();

router.delete("/Delete-Account", verifyToken, async (req, res) => {
  const userId = req.userId;
  const { password } = req.body;

  if (!password) {
    console.log("Password is missing from the request body");
    return res
      .status(400)
      .json({ error: "Password harus disertakan untuk menghapus akun." });
  }

  try {
    console.log("User ID from token:", userId);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Failed to get user data:", userError);
      return res.status(400).json({ error: "Gagal mendapatkan data pengguna" });
    }

    console.log("User data retrieved:", user);

    console.log("Verifying user password...");
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    });

    if (signInError) {
      console.error("Password verification failed:", signInError);
      return res
        .status(400)
        .json({ error: "Password salah. Tidak dapat menghapus akun." });
    }

    console.log("Password verified successfully");

    const { error: deleteError } = await supabase.auth.deleteUser(
      user.id
    );

    if (deleteError) {
      console.error("Failed to delete user:", deleteError);
      return res.status(400).json({ error: "Gagal menghapus akun pengguna." });
    }

    console.log("User deleted successfully");
    return res.status(200).json({ message: "Akun berhasil dihapus." });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

module.exports = router;
