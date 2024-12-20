// userController.js
const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../utils/supabaseClient");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, phone_number, password } = req.body;

  if (!email || !phone_number || !password) {
    return res
      .status(400)
      .json({ message: "Email, phone number, and password are required" });
  }

  try {
    const emailCheck = await pool.query(
      `SELECT email FROM users WHERE email = $1`,
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const phoneCheck = await pool.query(
      `SELECT phone_number FROM users WHERE phone_number = $1`,
      [phone_number]
    );

    if (phoneCheck.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Phone number is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (email, phone_number, password, created_at, updated_at) 
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id, email, phone_number`,
      [email, phone_number, hashedPassword]
    );

    const user = result.rows[0];
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

module.exports = router;
