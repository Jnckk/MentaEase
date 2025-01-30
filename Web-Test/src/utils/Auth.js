import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
};

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
};

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error("Login gagal:", error.message);
  }
};

export const signOut = async () => {
  await supabase.auth.signOut();
};