function SentimentOverview({ counts, total }) {
  const getPercentage = (value) => {
    if (!total) return 0;

    return Math.round((value / total) * 100);
  };

  const data = [
    {
      label: "Positive",
      value: counts.positive,
      percentage: getPercentage(counts.positive),
    },
    {
      label: "Neutral",
      value: counts.neutral,
      percentage: getPercentage(counts.neutral),
    },
    {
      label: "Negative",
      value: counts.negative,
      percentage: getPercentage(counts.negative),
    },
  ];

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Sentiment Overview
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">
          How does this subreddit feel?
        </h2>
      </div>

      <div className="space-y-5">
        {data.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-zinc-300">{item.label}</span>

              <span className="text-zinc-500">
                {item.value} · {item.percentage}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white transition-all duration-700"
                style={{
                  width: `${item.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SentimentOverview;