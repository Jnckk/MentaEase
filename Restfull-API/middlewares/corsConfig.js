// corsConfig.js
const cors = require("cors");

const corsOptions = {
  origin: "*",
  methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  allowedHeaders: "X-Requested-With,content-type",
  credentials: true,
};

const setCustomHeaders = (req, res, next) => {
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
};

module.exports = { corsOptions, setCustomHeaders };
