import type { CaseStudy, SectionHeading } from "../../content/site";

type CaseStudiesProps = {
  caseStudies: CaseStudy[];
  section: SectionHeading & {
    challengeLabel: string;
    approachLabel: string;
    outcomeLabel: string;
  };
};

export default function CaseStudies({
  caseStudies,
  section,
}: CaseStudiesProps) {
  return (
    <section
      id="case-studies"
      className="section-shell scroll-mt-32"
      aria-labelledby="case-studies-title"
    >
      <div className="section-inner">
        <div className="max-w-3xl">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="case-studies-title" className="section-title">
            {section.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-6">
          {caseStudies.map((caseStudy) => (
            <article key={caseStudy.title} className="card-surface">
              <div className="grid gap-2">
                <h3 className="section-title text-2xl font-extrabold">
                  {caseStudy.title}
                </h3>
                <p className="case-study-scope text-xs font-semibold tracking-[0.16em] uppercase">
                  {caseStudy.scope}
                </p>
                <p className="hero-copy text-sm">{caseStudy.summary}</p>
                <p className="hero-copy text-sm">
                  <span className="case-study-label font-semibold">
                    {section.challengeLabel}
                  </span>{" "}
                  {caseStudy.challenge}
                </p>
                <p className="hero-copy text-sm">
                  <span className="case-study-label font-semibold">
                    {section.approachLabel}
                  </span>{" "}
                  {caseStudy.approach}
                </p>
                <p className="hero-copy text-sm">
                  <span className="case-study-label font-semibold">
                    {section.outcomeLabel}
                  </span>{" "}
                  {caseStudy.outcome}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {caseStudy.stack.map((item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
