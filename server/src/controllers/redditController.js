import {
  fetchHotPosts,
  fetchPostById,
} from "../services/redditService.js";

export async function getPostById(req, res) {
  try {
    const { id } = req.params;

    const post = await fetchPostById(id);

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Error fetching post:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}

export async function getHotPosts(req, res) {
  try {
    const { subreddit } = req.params;

    if (!subreddit) {
      return res.status(400).json({
        success: false,
        message: "Subreddit name is required.",
      });
    }

    const cleanSubreddit = subreddit
      .trim()
      .replace(/^r\//i, "")
      .replace(/^\/r\//i, "")
      .replace(/^\/+|\/+$/g, "");

    const posts = await fetchHotPosts(cleanSubreddit);

    return res.status(200).json({
      success: true,
      subreddit: cleanSubreddit,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Reddit Controller Error:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to fetch Reddit posts.",
    });
  }
}