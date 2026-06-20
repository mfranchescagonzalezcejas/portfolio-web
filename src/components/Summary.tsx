import type { SummaryContent } from "../data/site";

type SummaryProps = {
  summary: SummaryContent;
};

export default function Summary({ summary }: SummaryProps) {
  return (
    <section
      id="about"
      className="scroll-mt-32 px-6 py-12 lg:px-8"
      aria-labelledby="summary-title"
    >
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1fr_20rem] lg:grid-cols-[1fr_24rem]">
        <div className="rounded-3xl border border-[#134E4A] bg-[#0B1B2A] p-8 sm:p-10">
          <p className="text-xs font-extrabold tracking-[0.32em] text-teal-300 uppercase">
            {summary.eyebrow}
          </p>
          <h2
            id="summary-title"
            className="mt-5 text-3xl leading-tight font-extrabold text-white sm:text-4xl"
          >
            {summary.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#B6E7E1]">
            {summary.body}
          </p>
        </div>

        <aside
          className="rounded-3xl border border-[#0E7490] bg-[#062A30] p-7"
          aria-label={summary.workingStyleLabel}
        >
          <p className="text-xs font-extrabold tracking-[0.28em] text-cyan-300 uppercase">
            {summary.workingStyleLabel}
          </p>
          <h3 className="mt-4 text-2xl font-extrabold text-white">
            {summary.cleanArchitectureTitle}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#BAE6FD]">
            {summary.cleanArchitectureBody}
          </p>
          <h3 className="mt-5 text-2xl font-extrabold text-white">
            {summary.qualityMindsetTitle}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#BAE6FD]">
            {summary.qualityMindsetBody}
          </p>
        </aside>
      </div>
    </section>
  );
}
