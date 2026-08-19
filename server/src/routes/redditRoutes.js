import express from "express";

import {
  getHotPosts,
  getPostById,
} from "../controllers/redditController.js";

const router = express.Router();

router.get("/:subreddit/hot", getHotPosts);

router.get("/post/:id", getPostById);

export default router;