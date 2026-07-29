import { GitBranch } from "lucide-react";
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

        <div className="featured-card-enclosure">
          <div className="featured-project-card card-surface">
            <div className="featured-project-glow featured-project-glow-primary" />
            <div className="featured-project-glow featured-project-glow-secondary" />

            <div className="featured-project-layout">
              <div className="featured-project-copy">
                <p className="featured-project-kicker">{section.kicker}</p>
                <h3 className="featured-project-title">
                  <span className="featured-project-title-icon">
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
            </div>
          </div>

          <div className="featured-project-mockups" aria-hidden="true">
            {mockups.map((mockup, index) => (
              <div
                key={mockup.src}
                className={`mockup-phone featured-mockup featured-mockup-${index + 1}`}
              >
                <div className="mockup-phone-screen">
                  <img
                    src={mockup.src}
                    width={mockup.width}
                    height={mockup.height}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mockup-phone-frame" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
