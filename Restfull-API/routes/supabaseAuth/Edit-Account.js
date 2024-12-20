const express = require("express");
const supabase = require("../../utils/supabase");
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router();

router.post("/Edit-Account", verifyToken, async (req, res) => {
  const userId = req.userId;
  const { email, oldPassword, newPassword, phone, displayName } = req.body;

  console.log("Request body received:", req.body);

  if (!email && !oldPassword && !newPassword && !phone && !displayName) {
    return res
      .status(400)
      .json({
        error:
          "Harus ada perubahan pada email, password, phone, atau display_name",
      });
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

    if (email && (oldPassword || newPassword)) {
      return res.status(400).json({
        error:
          "Email dan password tidak dapat diperbarui secara bersamaan. Harap lakukan satu per satu.",
      });
    }

    if (email) {
      console.log("Updating email to:", email);
      const { error: emailError } = await supabase.auth.updateUser({ email });

      if (emailError) {
        console.error("Email update failed:", emailError);
        return res.status(400).json({
          error:
            "Gagal memperbarui email. Periksa email baru Anda untuk tautan konfirmasi.",
        });
      }

      console.log("Email updated successfully");
      return res.status(200).json({
        message:
          "Email berhasil diperbarui. Periksa email baru Anda untuk tautan konfirmasi.",
      });
    }

    if (oldPassword && newPassword) {
      console.log("Verifying old password...");
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: oldPassword,
      });

      if (signInError) {
        console.error("Old password verification failed:", signInError);
        return res.status(400).json({ error: "Password lama salah." });
      }

      console.log("Old password verified successfully");

      console.log("Updating password...");
      const { error: passwordError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (passwordError) {
        console.error("Password update failed:", passwordError);
        return res.status(400).json({ error: "Gagal memperbarui password." });
      }

      console.log("Password updated successfully");
      return res.status(200).json({ message: "Password berhasil diperbarui." });
    }

    if (phone) {
      console.log("Updating phone to:", phone);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, phone")
        .eq("id", user.id);

      if (profileError) {
        console.error("Profile fetch failed:", profileError);
        return res.status(400).json({ error: "Gagal mengambil data profil." });
      }

      if (profileData.length === 0) {
        console.error("User profile not found in profiles table.");
        return res
          .status(400)
          .json({ error: "Profil pengguna tidak ditemukan." });
      }

      const { error: phoneError } = await supabase
        .from("profiles")
        .update({ phone })
        .eq("id", user.id);

      if (phoneError) {
        console.error("Phone update failed:", phoneError);
        return res.status(400).json({ error: "Gagal memperbarui phone." });
      }

      console.log("Phone updated successfully");
      return res.status(200).json({
        message: "Phone berhasil diperbarui di profil.",
      });
    }

    if (displayName) {
      console.log("Updating display_name to:", displayName);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, display_name")
        .eq("id", user.id);

      if (profileError) {
        console.error("Profile fetch failed:", profileError);
        return res.status(400).json({ error: "Gagal mengambil data profil." });
      }

      if (profileData.length === 0) {
        console.error("User profile not found in profiles table.");
        return res
          .status(400)
          .json({ error: "Profil pengguna tidak ditemukan." });
      }

      const { error: displayNameError } = await supabase
        .from("profiles")
        .update({ display_name: displayName })
        .eq("id", user.id);

      if (displayNameError) {
        console.error("Display name update failed:", displayNameError);
        return res
          .status(400)
          .json({ error: "Gagal memperbarui display name." });
      }

      console.log("Display name updated successfully");
      return res.status(200).json({
        message: "Display name berhasil diperbarui di profil.",
      });
    }

    return res.status(400).json({ error: "Permintaan tidak valid." });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

module.exports = router;
