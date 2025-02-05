const express = require("express");
const Save = require("../routes/historyChat/SaveHistory")
const Show = require("../routes/historyChat/ShowHistory")

const router = express.Router();

router.use("/", Save);
router.use("/", Show);

module.exports = router;
