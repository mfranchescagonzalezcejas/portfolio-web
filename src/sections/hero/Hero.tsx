import { ArrowUpRight, createLucideIcon, Download } from "lucide-react";
import type { HeroContent, LinkItem } from "../../content/site";
import HeroVisual from "./HeroVisual";

const Github = createLucideIcon("Github", [
  [
    "path",
    {
      d: "M16 22v-2.87a3.26 3.26 0 0 0-.94-2.37c3.14-.35 6.44-1.54 6.44-6.97a5.6 5.6 0 0 0-1.5-3.89 5.2 5.2 0 0 0-.09-3.9s-1.15-.37-3.8 1.5a13.16 13.16 0 0 0-7 0c-2.65-1.87-3.8-1.5-3.8-1.5a5.2 5.2 0 0 0-.09 3.9 5.6 5.6 0 0 0-1.5 3.89c0 5.41 3.3 6.62 6.44 6.97a3.26 3.26 0 0 0-.94 2.37V22",
      key: "github-logo",
    },
  ],
]);

const Linkedin = createLucideIcon("Linkedin", [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z",
      key: "linkedin-network",
    },
  ],
  ["rect", { x: "2", y: "9", width: "4", height: "12", key: "linkedin-i" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "linkedin-dot" }],
]);

function splitHeadlineWithAccent(tagline: string) {
  const match =
    tagline.match(/^(.*?)(mobile apps|apps m\u00f3viles|apps mobiles)(.*)$/i) ??
    tagline.match(
      /^(.*?)(mobile applications|aplicaciones m\u00f3viles)(.*)$/i,
    );

  if (!match) {
    return { lead: "", highlight: "", tail: tagline };
  }

  const [, lead, highlight, tail] = match;

  return {
    lead: lead.trim(),
    highlight: highlight,
    tail: tail.trim(),
  };
}

type HeroProps = {
  hero: HeroContent;
  links: LinkItem[];
};

export default function Hero({ hero, links }: HeroProps) {
  const profileLinks = links
    .filter((link) => {
      const normalized = link.label.toLowerCase();
      return normalized.includes("github") || normalized.includes("linkedin");
    })
    .slice(0, 2);

  const fallbackLinks =
    profileLinks.length > 0 ? profileLinks : links.slice(0, 2);
  const firstName = hero.name.split(" ")[0] || hero.name;
  const parsedTagline = splitHeadlineWithAccent(hero.tagline);

  const headlineLine = parsedTagline.highlight ? (
    <>
      {parsedTagline.lead ? `${parsedTagline.lead} ` : ""}
      <span className="text-gradient">{parsedTagline.highlight}</span>
      {parsedTagline.tail ? ` ${parsedTagline.tail}` : ""}
    </>
  ) : (
    <span className="text-gradient">{hero.tagline}</span>
  );

  const heroTechStack = hero.skills;

  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-8">
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

            {fallbackLinks.map((link) => (
              <a
                key={link.href}
                className="cta-outline hero-cta-secondary hero-cta-social"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label.toLowerCase().includes("github") ? (
                  <Github className="hero-cta-icon" aria-hidden="true" />
                ) : link.label.toLowerCase().includes("linkedin") ? (
                  <Linkedin className="hero-cta-icon" aria-hidden="true" />
                ) : null}
                <span>{link.label}</span>
              </a>
            ))}
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
