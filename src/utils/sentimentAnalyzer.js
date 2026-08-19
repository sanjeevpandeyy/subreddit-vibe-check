import Sentiment from "sentiment";

const sentiment = new Sentiment();

export function analyzePosts(posts) {
  return posts.map((post) => {
    const result = sentiment.analyze(post.title);

    let label = "neutral";

    if (result.score > 0) {
      label = "positive";
    } else if (result.score < 0) {
      label = "negative";
    }

    return {
      ...post,
      sentiment: {
        label,
        score: result.score,
      },
    };
  });
}

export function getSentimentCounts(posts) {
  return posts.reduce(
    (counts, post) => {
      counts[post.sentiment.label]++;
      return counts;
    },
    {
      positive: 0,
      neutral: 0,
      negative: 0,
    }
  );
}