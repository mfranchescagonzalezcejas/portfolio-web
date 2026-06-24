import { ArrowUpRight, Rocket } from "lucide-react";
import type { CaseStudy, CaseStudySectionHeading } from "../../content/site";

type CaseStudiesProps = {
  caseStudies: CaseStudy[];
  section: CaseStudySectionHeading;
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
        <div className="case-studies-header">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="case-studies-title" className="section-title">
            <span className="text-gradient">{section.title}</span>
          </h2>
          <p className="case-studies-description">{section.description}</p>
        </div>

        <div className="case-studies-grid">
          {caseStudies.map((caseStudy) => (
            <article
              key={caseStudy.title}
              className="card-surface case-study-card"
            >
              <div className="case-study-icon" aria-hidden="true">
                <Rocket className="h-4 w-4" />
              </div>

              <div className="grid gap-4">
                <h3 className="case-study-title font-display">
                  {caseStudy.title}
                </h3>

                <dl className="case-study-details">
                  <div>
                    <dt>{section.contextLabel}</dt>
                    <dd>{caseStudy.context}</dd>
                  </div>
                  <div>
                    <dt>{section.roleLabel}</dt>
                    <dd>{caseStudy.role}</dd>
                  </div>
                  <div>
                    <dt>{section.stackLabel}</dt>
                    <dd>
                      <ul
                        className="project-stack-list mt-1"
                        aria-label={`${caseStudy.title} ${section.stackLabel}`}
                      >
                        {caseStudy.stack.map((item) => (
                          <li key={item} className="project-tech-badge">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt>{section.demonstratesLabel}</dt>
                    <dd>{caseStudy.demonstrates}</dd>
                  </div>
                </dl>

                {caseStudy.links && caseStudy.links.length > 0 ? (
                  <div className="case-study-links">
                    {caseStudy.links.map((link) => (
                      <a
                        key={`${caseStudy.title}-${link.href}`}
                        href={link.href}
                        className="case-study-link"
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.external ? (
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                          />
                        ) : null}
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
