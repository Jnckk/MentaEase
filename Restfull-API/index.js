require("dotenv").config();
const cors = require("cors");
const express = require("express");
const groqRoutes = require("./routes/GroqAPI");
const email = require("./utils/providers/email");
const google = require("./utils/providers/google");
const SaveHistory = require("./utils/History");
const { corsOptions, setCustomHeaders } = require("./middlewares/corsConfig");
const app = express();

app.use(express.json());
app.use(setCustomHeaders);
app.use(cors(corsOptions));

app.get("/", (res) => {
  res.send("This is backend");
});
app.use("/groq", groqRoutes);
app.use("/email", email);
app.use("/google", google);
app.use("/history", SaveHistory);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server berjalan di URL: http://localhost:${PORT}`);
});
