// src/utils/auth.js
import { createClient } from "@supabase/supabase-js";

// Menggunakan variabel environment untuk keamanan
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

// Fungsi untuk mendapatkan sesi pengguna saat aplikasi dimuat
export const getCurrentUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user || null;
};

// Listener untuk perubahan status autentikasi
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
};

// Fungsi login dengan Google
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error("Login gagal:", error.message);
  }
};

// Fungsi logout
export const signOut = async () => {
  await supabase.auth.signOut();
};
