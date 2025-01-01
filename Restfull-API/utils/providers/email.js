// routes/supabaseAuth/supabaseAuth.js
const express = require("express");
const Registration = require("../../routes/providersAuth/email/Registration");
const Login = require("../../routes/providersAuth/email/Login");
const Profile = require("../../routes/providersAuth/email/Profile");
const Edit = require("../../routes/providersAuth/email/Edit-Account");
const Delete = require("../../routes/providersAuth/email/Delete-Account");
const Reset = require("../../routes/providersAuth/email/Reset-Password");
const Logout = require("../../routes/providersAuth/email/LogOut");

const router = express.Router();

router.use("/", Registration);
router.use("/", Login);
router.use("/", Profile);
router.use("/", Edit);
router.use("/", Delete);
router.use("/", Reset);
router.use("/", Logout);

module.exports = router;
