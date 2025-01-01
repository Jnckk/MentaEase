// routes/otherAuth/otherAuth.js
const express = require("express");
const Login = require("../../routes/providersAuth/google/Login");

const router = express.Router();

router.use("/", Login);

module.exports = router;
