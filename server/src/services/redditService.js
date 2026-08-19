const REDDIT_BASE_URL = "https://www.reddit.com";

const DEMO_POSTS = [
  "I absolutely love building projects with programming",
  "This is the worst bug I have ever encountered",
  "How do you learn programming effectively?",
  "Amazing new technology everyone should know about",
  "I finally solved this difficult problem!",
  "Why is this framework so frustrating?",
  "Great resources for beginners",
  "Nothing works and I have no idea why",
  "The future of web development looks exciting",
  "What are your thoughts on this?",
];

function cleanSubredditName(subreddit) {
  return subreddit
    .trim()
    .replace(/^\/?r\//i, "")
    .replace(/^\/+|\/+$/g, "");
}

function getMockPosts(subreddit) {
  return Array.from({ length: 50 }, (_, index) => ({
    id: `mock-${index + 1}`,
    title: DEMO_POSTS[index % DEMO_POSTS.length],
    score: 1000 - index * 13,
    comments: 250 - index * 3,
    author: `user_${index + 1}`,
    subreddit,
    url: `https://www.reddit.com/r/${subreddit}/comments/mock-${index + 1}/demo-post-${index + 1}/`,
    createdAt: Date.now() / 1000 - index * 3600,
    thumbnail: "",
  }));
}

function mapRedditPost(post) {
  return {
    id: post.id,

    title: post.title,

    score: post.score,

    comments: post.num_comments,

    author: post.author,

    subreddit: post.subreddit,

    url: `https://www.reddit.com${post.permalink}`,

    createdAt: post.created_utc,

    thumbnail:
      post.thumbnail &&
      post.thumbnail.startsWith("http")
        ? post.thumbnail
        : "",
  };
}

async function redditFetch(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "reddit-sentiment-internship-app/1.0 by sanjeev-kumar-pandey",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error(
      `Reddit API returned ${response.status} ${response.statusText}`
    );

    error.status = response.status;

    throw error;
  }

  return response.json();
}

export async function fetchHotPosts(subreddit) {
  if (!subreddit) {
    const error = new Error("Subreddit name is required.");
    error.status = 400;
    throw error;
  }

  const cleanSubreddit = cleanSubredditName(subreddit);

  if (!cleanSubreddit) {
    const error = new Error("Invalid subreddit name.");
    error.status = 400;
    throw error;
  }

  // Keep mock mode for development/testing.
  if (process.env.REDDIT_USE_MOCK === "true") {
    return getMockPosts(cleanSubreddit);
  }

  try {
    const url =
      `${REDDIT_BASE_URL}/r/${encodeURIComponent(cleanSubreddit)}` +
      `/hot.json?limit=50`;

    const data = await redditFetch(url);

    if (!data?.data?.children) {
      const error = new Error("Invalid response received from Reddit.");
      error.status = 502;
      throw error;
    }

    return data.data.children
      .filter((child) => child.kind === "t3")
      .map((child) => mapRedditPost(child.data));
  } catch (error) {
    console.error("Reddit API Error:", error);

    if (error.status) {
      throw error;
    }

    const apiError = new Error(
      "Unable to fetch posts from Reddit."
    );

    apiError.status = 502;

    throw apiError;
  }
}

export async function fetchPostById(postId) {
  if (!postId) {
    const error = new Error("Post ID is required.");
    error.status = 400;
    throw error;
  }

  // Mock mode
  if (process.env.REDDIT_USE_MOCK === "true") {
    const index = parseInt(postId.replace("mock-", ""), 10);

    if (
      !Number.isInteger(index) ||
      index < 1 ||
      index > 50
    ) {
      const error = new Error("Post not found.");
      error.status = 404;
      throw error;
    }

    const posts = getMockPosts("programming");

    return posts[index - 1];
  }

  try {
    const url =
      `${REDDIT_BASE_URL}/comments/${encodeURIComponent(postId)}.json`;

    const data = await redditFetch(url);

    if (
      !Array.isArray(data) ||
      !data[0]?.data?.children?.length
    ) {
      const error = new Error("Post not found.");
      error.status = 404;
      throw error;
    }

    const postData = data[0].data.children[0].data;

    if (!postData) {
      const error = new Error("Post not found.");
      error.status = 404;
      throw error;
    }

    return mapRedditPost(postData);
  } catch (error) {
    console.error("Reddit Post API Error:", error);

    if (error.status) {
      throw error;
    }

    const apiError = new Error(
      "Unable to fetch the Reddit post."
    );

    apiError.status = 502;

    throw apiError;
  }
}