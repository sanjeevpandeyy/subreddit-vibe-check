const API_BASE_URL =
  "https://subreddit-vibe-check-d09z.onrender.com";

export async function getHotPosts(subreddit) {
  const cleanSubreddit = subreddit
    .trim()
    .replace(/^\/?r\//i, "")
    .replace(/^\/+|\/+$/g, "");

  if (!cleanSubreddit) {
    throw new Error("Please enter a subreddit name.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/reddit/${encodeURIComponent(
      cleanSubreddit
    )}/hot`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch posts."
    );
  }

  return data.posts;
}

export async function getPostById(id) {
  const response = await fetch(
    `${API_BASE_URL}/api/reddit/post/${encodeURIComponent(id)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch post."
    );
  }

  return data.post;
}