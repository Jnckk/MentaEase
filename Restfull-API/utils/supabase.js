// utils/supabase.js
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// Ambil URL dan Key Supabase dari environment variable
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Inisialisasi Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
