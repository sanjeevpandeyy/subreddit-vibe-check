function EmptyState() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-xl">
        ✦
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white">
        Check the vibe of a subreddit
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
        Enter a subreddit above to analyze its 50 hottest posts and discover
        whether the overall vibe is positive, neutral, or negative.
      </p>
    </div>
  );
}

export default EmptyState;