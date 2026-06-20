import type { SummaryContent } from "../data/site";

type SummaryProps = {
  summary: SummaryContent;
};

export default function Summary({ summary }: SummaryProps) {
  return (
    <section
      id="about"
      className="section-shell scroll-mt-32"
      aria-labelledby="summary-title"
    >
        <div className="section-inner grid gap-6 md:grid-cols-[1fr_20rem] lg:grid-cols-[1fr_24rem]">
        <div className="card-surface">
          <p className="eyebrow">{summary.eyebrow}</p>
          <h2 id="summary-title" className="section-title">
            {summary.title}
          </h2>
          <p className="hero-copy mt-5">
            {summary.body}
          </p>
        </div>

        <aside
          className="section-card"
          aria-label={summary.workingStyleLabel}
        >
          <p className="eyebrow">{summary.workingStyleLabel}</p>

          {(summary.cards?.length ? summary.cards : [
            {
              title: summary.cleanArchitectureTitle,
              body: summary.cleanArchitectureBody,
            },
            {
              title: summary.qualityMindsetTitle,
              body: summary.qualityMindsetBody,
            },
          ]).map((card) => (
            <div key={card.title} className="mt-4 first:mt-0">
              <h3 className="text-2xl font-extrabold text-white">
                {card.title}
              </h3>
              <p className="mt-3 hero-copy text-sm leading-6">{card.body}</p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
