import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import SummaryCards from "./components/SummaryCards";
import SentimentOverview from "./components/SentimentOverview";
import PostList from "./components/PostList";
import LoadingState from "./components/LoadingState";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import PostDetails from "./pages/PostDetails";

import { getHotPosts } from "./services/redditApi";
import {
  analyzePosts,
  getSentimentCounts,
} from "./utils/sentimentAnalyzer";

function Home() {
  const [subreddit, setSubreddit] = useState("");
  const [posts, setPosts] = useState([]);
  const [counts, setCounts] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(value) {
    const cleanValue = value
      .trim()
      .replace(/^r\//i, "")
      .replace(/^\/r\//i, "")
      .replace(/^\/+|\/+$/g, "");

    if (!cleanValue) {
      setError("Please enter a subreddit name.");
      setPosts([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const redditPosts = await getHotPosts(cleanValue);

      const analyzedPosts = analyzePosts(redditPosts);

      const sentimentCounts = getSentimentCounts(analyzedPosts);

      setSubreddit(cleanValue);
      setPosts(analyzedPosts);
      setCounts(sentimentCounts);
    } catch (err) {
      setPosts([]);

      setCounts({
        positive: 0,
        neutral: 0,
        negative: 0,
      });

      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 pb-20 pt-16 lg:px-8">

        <section className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-400">
            Reddit Sentiment Intelligence
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            The Subreddit
            <span className="block text-zinc-500">
              Vibe Check
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
            Analyze the hottest conversations on Reddit and discover
            the sentiment behind their titles.
          </p>

          <div className="mx-auto mt-10 max-w-2xl">
            <SearchBar
              onSearch={handleSearch}
              loading={loading}
            />
          </div>

          <p className="mt-4 text-xs text-zinc-700">
            Try: programming · javascript · webdev · technology
          </p>
        </section>

        <section className="mx-auto mt-16 max-w-5xl">

          {loading && (
            <LoadingState subreddit={subreddit} />
          )}

          {!loading && error && (
            <ErrorMessage message={error} />
          )}

          {!loading && !error && !hasSearched && (
            <EmptyState />
          )}

          {!loading &&
            !error &&
            hasSearched &&
            posts.length > 0 && (
              <div className="space-y-8">

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
                      Analysis Results
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold">
                      r/{subreddit}
                    </h2>
                  </div>

                  <p className="text-sm text-zinc-600">
                    {posts.length} posts analyzed
                  </p>
                </div>

                <SummaryCards
                  counts={counts}
                  total={posts.length}
                />

                <SentimentOverview
                  counts={counts}
                  total={posts.length}
                />

                <PostList posts={posts} />

              </div>
            )}

          {!loading &&
            !error &&
            hasSearched &&
            posts.length === 0 && (
              <EmptyState />
            )}

        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/post/:id"
          element={<PostDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;