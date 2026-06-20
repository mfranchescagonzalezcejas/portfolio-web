import type { CaseStudy, SectionHeading } from "../data/site";

type CaseStudiesProps = {
  caseStudies: CaseStudy[];
  section: SectionHeading;
};

export default function CaseStudies({ caseStudies, section }: CaseStudiesProps) {
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
                <h3 className="text-2xl font-extrabold text-white">{caseStudy.title}</h3>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-200/90">
                  {caseStudy.scope}
                </p>
                <p className="hero-copy text-sm">{caseStudy.summary}</p>
                <p className="hero-copy text-sm">{caseStudy.challenge}</p>
                <p className="hero-copy text-sm">
                  <span className="font-semibold text-teal-100">Approach:</span>{" "}
                  {caseStudy.approach}
                </p>
                <p className="hero-copy text-sm">
                  <span className="font-semibold text-teal-100">Outcome:</span>{" "}
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
