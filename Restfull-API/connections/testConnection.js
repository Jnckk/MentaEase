require("dotenv").config();
const { Pool } = require("pg");

const DATABASE_URL = process.env.DATABASE_URL;

console.log("DATABASE_URL:", DATABASE_URL);

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const testConnection = async () => {
  try {
    const result = await pool.query("SELECT 1 AS connected");
    console.log("Terhubung ke database. Hasil:", result.rows);
  } catch (err) {
    console.error("Koneksi gagal:", err.message);
  } finally {
    await pool.end();
  }
};

testConnection();
