// routes/supabaseAuth/supabaseAuth.js
const express = require("express");
const Registration = require("../routes/supabaseAuth/Registration");
const Login = require("../routes/supabaseAuth/Login");
const Profile = require("../routes/supabaseAuth/Profile");
const Edit = require("../routes/supabaseAuth/Edit-Account");
const Delete = require("../routes/supabaseAuth/Delete-Account");

const router = express.Router();

router.use("/", Registration);
router.use("/", Login);
router.use("/", Profile);
router.use("/", Edit);
router.use("/", Delete);

module.exports = router;
