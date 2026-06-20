import type { HeroContent, LinkItem } from "../data/site";

type IconProps = {
  className?: string;
};

function ArrowUpRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function DownloadIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v9" />
      <path d="m8 11 4 4 4-4" />
      <path d="M4 19h16" />
    </svg>
  );
}

function GitHubIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 22v-2.87a3.26 3.26 0 0 0-.94-2.37c3.14-.35 6.44-1.54 6.44-6.97a5.6 5.6 0 0 0-1.5-3.89 5.2 5.2 0 0 0-.09-3.9s-1.15-.37-3.8 1.5a13.16 13.16 0 0 0-7 0c-2.65-1.87-3.8-1.5-3.8-1.5a5.2 5.2 0 0 0-.09 3.9 5.6 5.6 0 0 0-1.5 3.89c0 5.41 3.3 6.62 6.44 6.97a3.26 3.26 0 0 0-.94 2.37V22" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

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

function HeroVisual() {
  return (
    <aside className="hero-visual" aria-label="Product demo mockup">
      <div className="hero-phone-glow hero-float-glow" aria-hidden="true" />

      <div className="hero-phone" aria-hidden="true">
        <span className="hero-phone-notch" aria-hidden="true" />

        <div className="hero-phone-screen">
          <div className="hero-phone-status" aria-label="Header status row">
            <span>9:41</span>
            <span>InkScroller</span>
          </div>

          <div className="hero-reading-card">
            <p className="text-[0.62rem] font-bold tracking-[0.22em] text-cyan-200/80 uppercase">
              Reading now
            </p>
            <p className="mt-1 text-sm font-semibold text-white">Chapter 47</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-300 to-teal-300" />
            </div>
          </div>

          <div className="hero-library-list" aria-label="Library rows">
            {[1, 2, 3, 4].map((row) => (
              <div className="hero-library-row" key={row}>
                <div className="hero-cover" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2 w-3/4 rounded bg-white/15" />
                  <div className="h-1.5 w-1/2 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>

          <div className="hero-phone-bottom" aria-label="Bottom quick actions">
            {["■", "❤", "↓", "☰"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-code-overlay hero-code" aria-hidden="true">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
          <span className="h-2 w-2 rounded-full bg-green-400/70" />
          <span className="ml-2 font-mono text-[0.62rem] text-slate-400">
            main.dart
          </span>
        </div>
        <pre className="m-0 overflow-hidden font-mono text-[0.62rem] leading-relaxed text-cyan-50/85">{`class Library extends
  ConsumerWidget {
  build(ctx, ref) {
    final manga = ref
      .watch(libraryProvider);
    return manga.when(
      data: (m) => Grid(m),
    );
  }
}`}</pre>
      </div>

      <div className="hero-stack-pill" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
        <span>Flutter · Riverpod</span>
      </div>

      <div className="hero-delivery-card" aria-hidden="true">
        <div className="hero-delivery-icon">↗</div>
        <div>
          <p className="m-0 text-[0.68rem] font-semibold text-white">
            Production-ready
          </p>
          <p className="m-0 font-mono text-[0.62rem] text-slate-400">
            mobile delivery
          </p>
        </div>
      </div>

      <div className="hero-architecture-card" aria-hidden="true">
        <div className="hero-delivery-icon">◎</div>
        <div>
          <p className="m-0 text-[0.68rem] font-semibold text-white">
            Clean Architecture
          </p>
          <p className="m-0 font-mono text-[0.62rem] text-slate-400">
            Repository Pattern
          </p>
        </div>
      </div>
    </aside>
  );
}

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

      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-8">
        <div className="space-y-5">
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

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={hero.quickCtaHref} className="cta-button hero-cta-primary">
              <span>{hero.quickCtaLabel}</span>
              <ArrowUpRightIcon className="hero-cta-icon" />
            </a>

            <a href="/cv.pdf" className="cta-outline hero-cta-secondary">
              <DownloadIcon className="hero-cta-icon" />
              <span>{hero.cvLabel}</span>
            </a>

            {fallbackLinks.map((link) => (
              <a
                key={link.href}
                className="cta-outline hero-cta-secondary"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label.toLowerCase().includes("github") ? (
                  <GitHubIcon className="hero-cta-icon" />
                ) : link.label.toLowerCase().includes("linkedin") ? (
                  <LinkedInIcon className="hero-cta-icon" />
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

        <HeroVisual />
      </div>
    </section>
  );
}
