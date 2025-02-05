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
  }
}

export async function checkAuth() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      return { user: user };
    } else {
      return { user: null };
    }
  } catch (error) {
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
    return false;
  }
}

export function removeUserData() {
  try {
    localStorage.removeItem("currentUser");
  } catch (error) {
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    removeUserData();
  } catch (error) {
  }
}
