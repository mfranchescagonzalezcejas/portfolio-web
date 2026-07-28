import { GitBranch, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const mockups = project.mockups ?? [];
  const mockupLabels = project.mockupLabels ?? [];
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || revealed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <section
      ref={sectionRef}
      id="featured"
      className={`section-shell featured-section scroll-mt-32 ${revealed ? "featured-reveal featured-revealed" : "featured-reveal"}`}
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
                <span className="featured-project-title-icon">
                  <img
                    src="/inkscroller/icons/background-v1.png"
                    alt=""
                    className="featured-icon-bg"
                    aria-hidden="true"
                    loading="lazy"
                    width="1024"
                    height="1024"
                  />
                  <img
                    src="/inkscroller/icons/foreground-v1.png"
                    alt=""
                    className="featured-icon-fg"
                    aria-hidden="true"
                    loading="lazy"
                    width="500"
                    height="500"
                  />
                </span>
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
                  {project.links.map((link, index) => {
                    const ctaLabel =
                      link.ctaLabel ??
                      (index === 0
                        ? section.primaryCtaLabel
                        : section.secondaryCtaLabel);

                    return (
                      <li key={link.href}>
                        <a
                          className={
                            index === 0
                              ? "cta-button featured-project-link-primary"
                              : "cta-outline featured-project-link-secondary"
                          }
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          aria-label={formatProjectLabel(
                            section.linkAriaLabel,
                            {
                              label: ctaLabel,
                              project: project.name,
                            },
                          )}
                        >
                          <GitBranch
                            aria-hidden="true"
                            className="project-link-icon"
                          />
                          {ctaLabel}
                        </a>
                      </li>
                    );
                  })}
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
                    {mockups[index] ? (
                      <img
                        src={mockups[index].src}
                        width={mockups[index].width}
                        height={mockups[index].height}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <>
                        <div className="featured-phone-icon">
                          <Smartphone aria-hidden="true" />
                        </div>
                        <p className="featured-phone-label">{label}</p>
                        <p className="featured-phone-status">
                          {project.mockupStatus}
                        </p>
                      </>
                    )}
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
