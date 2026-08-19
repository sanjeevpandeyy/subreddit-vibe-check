import "dotenv/config";
import express from "express";
import cors from "cors";

import redditRoutes from "./routes/redditRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reddit", redditRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Reddit Sentiment API is running",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});