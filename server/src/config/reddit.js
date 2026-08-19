export const redditConfig = {
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  userAgent:
    process.env.REDDIT_USER_AGENT || "subreddit-vibe-check/1.0 by sanjeev",
};