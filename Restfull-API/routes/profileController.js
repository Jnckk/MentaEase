// profileController.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../utils/supabaseClient");

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

router.put("/profile", verifyToken, async (req, res) => {
  const { email, phone_number, password } = req.body;
  const userId = req.user.userId;

  if (!email && !phone_number && !password) {
    return res
      .status(400)
      .json({ message: "At least one field is required to update" });
  }

  try {
    const userCheck = await pool.query(`SELECT id FROM users WHERE id = $1`, [
      userId,
    ]);

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    let query = `UPDATE users SET`;
    const values = [];
    let setValues = [];

    if (email) {
      const emailCheck = await pool.query(
        `SELECT id FROM users WHERE email = $1 AND id != $2`,
        [email, userId]
      );
      if (emailCheck.rows.length > 0) {
        return res.status(400).json({ message: "Email is already taken" });
      }
      setValues.push("email = $1");
      values.push(email);
    }

    if (phone_number) {
      setValues.push("phone_number = $2");
      values.push(phone_number);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      setValues.push("password = $3");
      values.push(hashedPassword);
    }

    query += ` ${setValues.join(", ")} WHERE id = $${values.length + 1}`;
    values.push(userId);

    await pool.query(query, values);

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error updating profile", error: err.message });
  }
});

module.exports = router;
