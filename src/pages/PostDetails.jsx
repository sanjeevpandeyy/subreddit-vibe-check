import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:4000/api/reddit/post/${id}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch post.");
        }

        setPost(data.post);
      } catch (err) {
        console.error("Post details error:", err);

        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] text-white">
        <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-5">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />

            <p className="mt-5 text-sm text-zinc-500">
              Loading post...
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-[#090909] text-white">
        <main className="mx-auto max-w-4xl px-5 py-10 sm:py-16">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 text-sm text-zinc-500 transition hover:text-white"
          >
            ← Back to posts
          </button>

          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
            <div className="flex items-start gap-3">
              <span className="text-red-400">!</span>

              <div>
                <h2 className="font-semibold text-red-300">
                  Something went wrong
                </h2>

                <p className="mt-2 text-sm text-red-200/60">
                  {error}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // No post
  if (!post) {
    return (
      <div className="min-h-screen bg-[#090909] text-white">
        <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-5">
          <div className="text-center">
            <h2 className="text-xl font-semibold">
              Post not found
            </h2>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              Go Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  const isMockPost = post.id?.startsWith("mock-");

  return (
    <div className="min-h-screen bg-[#090909] text-white">

      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-16">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 text-sm text-zinc-500 transition hover:text-white"
        >
          ← Back to posts
        </button>

        {/* Post Card */}
        <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10">

          {/* Top Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-500">
              Reddit Post
            </span>

            <span className="text-xs text-zinc-600">
              ID: {post.id}
            </span>

          </div>

          {/* Title */}
          <h1 className="mt-8 text-3xl font-bold leading-tight sm:text-5xl">
            {post.title}
          </h1>

          {/* Author / Subreddit / Date */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-500">

            <span>
              u/{post.author || "[deleted]"}
            </span>

            {post.subreddit && (
              <span>
                r/{post.subreddit}
              </span>
            )}

            {post.createdAt && (
              <span>
                {new Date(post.createdAt * 1000).toLocaleString()}
              </span>
            )}

          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">

            {/* Score */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

              <p className="text-xs text-zinc-600">
                Score
              </p>

              <p className="mt-2 text-2xl font-bold">
                {Number(post.score || 0).toLocaleString()}
              </p>

            </div>

            {/* Comments */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

              <p className="text-xs text-zinc-600">
                Comments
              </p>

              <p className="mt-2 text-2xl font-bold">
                {Number(post.comments || 0).toLocaleString()}
              </p>

            </div>

            {/* Subreddit */}
            <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:col-span-1">

              <p className="text-xs text-zinc-600">
                Subreddit
              </p>

              <p className="mt-2 text-lg font-semibold">
                {post.subreddit
                  ? `r/${post.subreddit}`
                  : "Unknown"}
              </p>

            </div>

          </div>

          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">

              <img
                src={post.thumbnail}
                alt={post.title}
                className="max-h-[500px] w-full object-cover"
              />

            </div>
          )}

          {/* Bottom Section */}
          <div className="mt-10 border-t border-white/10 pt-8">

            {/* Real Reddit Post */}
            {!isMockPost && post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Open on Reddit ↗
              </a>
            )}

            {/* Mock Post */}
            {isMockPost && (
              <div className="rounded-xl border border-yellow-400/10 bg-yellow-400/5 px-4 py-3">

                <p className="text-sm text-yellow-200/70">
                  This is a demo mock post. A real Reddit link
                  will be available when the application uses
                  live Reddit data.
                </p>

              </div>
            )}

          </div>

        </article>
      </main>
    </div>
  );
}

export default PostDetails;