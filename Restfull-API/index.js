require("dotenv").config();
const cors = require("cors");
const express = require("express");
const groqRoutes = require("./routes/GroqAPI");
const supabaseAuth = require("./utils/supabaseAuth");
const { corsOptions, setCustomHeaders } = require("./middlewares/corsConfig");
const { inject } = require("@vercel/analytics");
const { injectSpeedInsights } = require("@vercel/speed-insights");
const app = express();

app.use(express.json());
app.use(setCustomHeaders);
app.use(cors(corsOptions));
inject();
injectSpeedInsights();

app.get("/", (req, res) => {
  res.send("This is backend");
});
app.use("/groq", groqRoutes);
app.use("/api", supabaseAuth);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server berjalan di URL: http://localhost:${PORT}`);
});
