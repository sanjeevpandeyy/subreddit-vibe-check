const API_BASE_URL = "http://localhost:4000/api";

export async function getHotPosts(subreddit) {
  const response = await fetch(
    `${API_BASE_URL}/reddit/${encodeURIComponent(subreddit)}/hot`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch posts.");
  }

  return data.posts;
}

export async function getPostById(id) {
  const response = await fetch(
    `${API_BASE_URL}/reddit/post/${encodeURIComponent(id)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch post.");
  }

  return data.post;
}