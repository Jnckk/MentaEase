const express = require("express");
const supabase = require("../../../utils/supabase");
const verifyToken = require("../../../middlewares/verifyToken");

const router = express.Router();

router.delete("/Delete-Account", verifyToken, async (req, res) => {
  const userId = req.userId; // Mendapatkan userId dari middleware verifyToken

  try {
    // Menghapus pengguna dari auth.users menggunakan admin API
    const { data, error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      console.error("Failed to delete user:", error);
      return res.status(400).json({ error: "Gagal menghapus akun pengguna." });
    }

    console.log("User deleted successfully:", data);
    return res.status(200).json({ message: "Akun berhasil dihapus." });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server." });
  }
});

module.exports = router;
