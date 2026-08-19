import { useNavigate } from "react-router-dom";

function PostCard({ post, index }) {
  const navigate = useNavigate();

  const sentimentStyles = {
    Positive: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    Neutral: "border-zinc-400/20 bg-zinc-400/10 text-zinc-300",
    Negative: "border-red-400/20 bg-red-400/10 text-red-300",
  };

  const badgeStyle =
    sentimentStyles[post.sentiment.label] || sentimentStyles.Neutral;

  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-medium text-zinc-600">
          #{String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeStyle}`}
        >
          {post.sentiment.label}
        </span>
      </div>

      <button
        type="button"
        onClick={() => navigate(`/post/${post.id}`)}
        className="mt-4 block w-full text-left text-lg font-semibold leading-7 text-white transition group-hover:text-zinc-300"
      >
        {post.title}
      </button>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500">
        <span>↑ {post.score.toLocaleString()}</span>

        <span>💬 {post.comments.toLocaleString()}</span>

        <span>u/{post.author || "[deleted]"}</span>
      </div>
    </article>
  );
}

export default PostCard;