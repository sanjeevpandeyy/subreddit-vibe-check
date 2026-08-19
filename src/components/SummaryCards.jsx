function SummaryCards({ counts, total }) {
  const cards = [
    {
      label: "Total Posts",
      value: total,
      description: "Hot posts analyzed",
    },
    {
      label: "Positive",
      value: counts.positive,
      description: "Positive titles",
    },
    {
      label: "Neutral",
      value: counts.neutral,
      description: "Neutral titles",
    },
    {
      label: "Negative",
      value: counts.negative,
      description: "Negative titles",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
        >
          <p className="text-sm text-zinc-500">{card.label}</p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            {card.value}
          </p>

          <p className="mt-2 text-xs text-zinc-600">{card.description}</p>
        </div>
      ))}
    </section>
  );
}

export default SummaryCards;