import { ArrowUpRight, Download } from "lucide-react";
import type { ContactLinkItem, HeroContent } from "../../content/types";
import { getContactIcon } from "../contact/contactIcons";
import HeroVisual from "./HeroVisual";

function splitHeadlineWithAccent(tagline: string, accent?: string) {
  if (!accent) {
    return { lead: "", highlight: "", tail: tagline };
  }

  const accentIndex = tagline.indexOf(accent);
  if (accentIndex < 0) {
    return { lead: "", highlight: "", tail: tagline };
  }

  return {
    lead: tagline.slice(0, accentIndex).trim(),
    highlight: accent,
    tail: tagline.slice(accentIndex + accent.length).trim(),
  };
}

type HeroProps = {
  hero: HeroContent;
  links: ContactLinkItem[];
};

export default function Hero({ hero, links }: HeroProps) {
  const profileLinks = links.filter(
    (link) => link.kind === "linkedin" || link.kind === "github",
  );
  const firstName = hero.name.split(" ")[0] || hero.name;
  const parsedTagline = splitHeadlineWithAccent(
    hero.tagline,
    hero.taglineAccent,
  );

  const headlineLine = parsedTagline.highlight ? (
    <>
      {parsedTagline.lead ? `${parsedTagline.lead} ` : ""}
      <span className="text-gradient">{parsedTagline.highlight}</span>
      {parsedTagline.tail
        ? `${/^[.,;:!?]/.test(parsedTagline.tail) ? "" : " "}${parsedTagline.tail}`
        : ""}
    </>
  ) : (
    <span className="text-gradient">{hero.tagline}</span>
  );

  const heroTechStack = hero.skills;

  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />

      <div className="hero-content mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-8">
        <div>
          <p className="hero-status">
            <span className="hero-status-dot" aria-hidden="true">
              <span className="hero-status-dot-ping" />
              <span className="hero-status-dot-core" />
            </span>
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="font-display hero-title text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span>
              {hero.greeting} {firstName}.
            </span>
            <br />
            <span>{headlineLine}</span>
          </h1>

          <p className="hero-copy mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            {hero.summary}
          </p>

          <div className="hero-cta-row mt-8 flex flex-wrap gap-3">
            <a href={hero.quickCtaHref} className="cta-button hero-cta-primary">
              <span>{hero.quickCtaLabel}</span>
              <ArrowUpRight className="hero-cta-icon" aria-hidden="true" />
            </a>

            <a
              href="/cv.pdf"
              className="cta-outline hero-cta-secondary hero-cta-download"
            >
              <Download className="hero-cta-icon" aria-hidden="true" />
              <span>{hero.cvLabel}</span>
            </a>

            {profileLinks.map((link, index) => {
              const Icon = getContactIcon(link.kind);
              const variantClass =
                link.kind === "linkedin"
                  ? "contact-cta-link-primary cta-button"
                  : "contact-cta-link-secondary cta-outline";

              return (
                <a
                  key={`${link.href}-${index}`}
                  className={`contact-cta-link ${variantClass}`}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  <Icon
                    className="contact-cta-icon"
                    aria-hidden="true"
                    data-contact-icon={link.kind}
                  />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {heroTechStack.map((tech) => (
              <span key={tech} className="hero-tech-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <HeroVisual visual={hero.visual} />
      </div>
    </section>
  );
}
