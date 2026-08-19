import express from "express";
import cors from "cors";

import redditRoutes from "./routes/redditRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Subreddit Vibe Check API is running",
  });
});

app.use("/api/reddit", redditRoutes);

export default app;