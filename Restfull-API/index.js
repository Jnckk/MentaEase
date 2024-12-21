// index.js
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const groqRoutes = require("./routes/GroqAPI");

// Manual Auth
const userRoutes = require("./routes/manualAuth/userController");
const loginController = require("./routes/manualAuth/loginController");
const profileController = require("./routes/manualAuth/profileController");
const deleteController = require("./routes/manualAuth/deleteController");

// Supabase Auth
const Registration = require("./routes/supabaseAuth/Registration");
const Login = require("./routes/supabaseAuth/Login");
const Profile = require("./routes/supabaseAuth/Profile");
const Edit = require("./routes/supabaseAuth/Edit-Account");
const Delete = require("./routes/supabaseAuth/Delete-Account");

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

// Supabase
app.use("/api", Registration);
app.use("/api", Login);
app.use("/api", Profile);
app.use("/api", Edit);
app.use("/api", Delete);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server berjalan di URL: http://localhost:${PORT}`);
});
