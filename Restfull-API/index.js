// index.js
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const groqRoutes = require("./routes/GroqAPI");
const userRoutes = require("./routes/userController");
const loginController = require("./routes/loginController");
const profileController = require("./routes/profileController");
const deleteController = require("./routes/deleteController");
const { inject } = require("@vercel/analytics");

inject();

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is backend");
});

app.use("/groq", groqRoutes);
app.use("/api", userRoutes);
app.use("/api", loginController);
app.use("/api", profileController);
app.use("/api", deleteController);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server berjalan di URL: http://localhost:${PORT}`);
});
