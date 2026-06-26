import { GitBranch, Smartphone } from "lucide-react";
import type { Project, SectionHeading } from "../../content/site";
import { formatProjectLabel } from "./projectLabel";

type FeaturedProjectProps = {
  project: Project;
  section: SectionHeading & {
    kicker: string;
    linksLabel: string;
    stackLabel: string;
    linkAriaLabel: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
};

export default function FeaturedProject({
  project,
  section,
}: FeaturedProjectProps) {
  const [primaryLink, secondaryLink] = project.links;
  const primaryCtaLabel = primaryLink?.ctaLabel ?? section.primaryCtaLabel;
  const secondaryCtaLabel =
    secondaryLink?.ctaLabel ?? section.secondaryCtaLabel;
  const mockupLabels = project.mockupLabels ?? [];

  return (
    <section
      id="featured"
      className="section-shell featured-section scroll-mt-32"
      aria-labelledby="featured-title"
    >
      <div className="section-inner">
        <div className="values-header featured-showcase-header">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="featured-title" className="section-title">
            <span className="text-gradient">{section.title}</span>
          </h2>
        </div>

        <div className="featured-project-card card-surface">
          <div className="featured-project-glow featured-project-glow-primary" />
          <div className="featured-project-glow featured-project-glow-secondary" />

          <div className="featured-project-layout">
            <div className="featured-project-copy">
              <p className="featured-project-kicker">{section.kicker}</p>
              <h3 className="featured-project-title">
                <span className="text-gradient">{project.name}</span>
              </h3>
              <p className="featured-project-description">
                {project.description}
              </p>

              <ul
                className="project-stack-list"
                aria-label={formatProjectLabel(section.stackLabel, {
                  project: project.name,
                })}
              >
                {project.stack.map((stackItem) => (
                  <li key={stackItem} className="project-tech-badge">
                    {stackItem}
                  </li>
                ))}
              </ul>

              {project.links.length > 0 && (
                <ul
                  className="featured-project-links"
                  aria-label={`${project.name} · ${section.linksLabel}`}
                >
                  {primaryLink ? (
                    <li>
                      <a
                        className="cta-button featured-project-link-primary"
                        href={primaryLink.href}
                        target={primaryLink.external ? "_blank" : undefined}
                        rel={
                          primaryLink.external
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={formatProjectLabel(section.linkAriaLabel, {
                          label: primaryCtaLabel,
                          project: project.name,
                        })}
                      >
                        <GitBranch
                          aria-hidden="true"
                          className="project-link-icon"
                        />
                        {primaryCtaLabel}
                      </a>
                    </li>
                  ) : null}
                  {secondaryLink ? (
                    <li>
                      <a
                        className="cta-outline featured-project-link-secondary"
                        href={secondaryLink.href}
                        target={secondaryLink.external ? "_blank" : undefined}
                        rel={
                          secondaryLink.external
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={formatProjectLabel(section.linkAriaLabel, {
                          label: secondaryCtaLabel,
                          project: project.name,
                        })}
                      >
                        <GitBranch
                          aria-hidden="true"
                          className="project-link-icon"
                        />
                        {secondaryCtaLabel}
                      </a>
                    </li>
                  ) : null}
                </ul>
              )}
            </div>

            <div className="featured-project-mockups" aria-hidden="true">
              {mockupLabels.map((label, index) => (
                <div
                  key={label}
                  className={`featured-phone featured-phone-${index + 1}`}
                >
                  <div className="featured-phone-notch" />
                  <div className="featured-phone-screen">
                    <div className="featured-phone-icon">
                      <Smartphone aria-hidden="true" />
                    </div>
                    <p className="featured-phone-label">{label}</p>
                    <p className="featured-phone-status">
                      {project.mockupStatus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
