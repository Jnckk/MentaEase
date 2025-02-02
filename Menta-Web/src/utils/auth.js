import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

export async function signInWithGoogle(navigate) {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      throw error;
    }

    if (data) {
      navigate("/home");
    }
  } catch (error) {
    console.error("Error in sign in:", error);
  }
}

export async function checkAuth() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      console.log("User sudah login:", user);
      return { user: user };
    } else {
      console.log("User belum login");
      return { user: null };
    }
  } catch (error) {
    console.error("Error checking auth:", error);
    return { user: null };
  }
}

export function storeUserData(user) {
  try {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    } else {
      localStorage.removeItem("currentUser");
      return false;
    }
  } catch (error) {
    console.error("Error storing user data:", error);
    return false;
  }
}

export function removeUserData() {
  try {
    localStorage.removeItem("currentUser");
  } catch (error) {
    console.error("Error removing user data:", error);
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error signing out:", error);
      throw error;
    }
    removeUserData();
    console.log("User has been signed out");
  } catch (error) {
    console.error("Error in sign out:", error);
  }
}
