function LoadingState({ subreddit }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />

      <p className="mt-5 text-sm text-zinc-400">
        Analyzing r/{subreddit}...
      </p>

      <p className="mt-1 text-xs text-zinc-600">
        Fetching hot posts and analyzing sentiment
      </p>
    </div>
  );
}

export default LoadingState;