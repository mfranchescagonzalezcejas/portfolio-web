import type { HeroContent, LinkItem } from "../data/site";

type HeroProps = {
  hero: HeroContent;
  links: LinkItem[];
};

function HeroVisual() {
  return (
    <aside className="hero-visual" aria-label="Product demo mockup">
      <div className="hero-phone-glow" aria-hidden="true" />

      <div className="hero-phone">
        <span className="hero-phone-notch" aria-hidden="true" />

        <div className="hero-phone-screen">
          <div className="hero-phone-status" aria-label="Header status row">
          <span>9:41</span>
            <span>InkScroller</span>
          </div>

          <div className="hero-reading-card">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-cyan-200/80">
              Reading now
          </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Chapter 47
          </p>
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

      <div className="hero-code-overlay" aria-hidden="true">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
          <span className="h-2 w-2 rounded-full bg-green-400/70" />
          <span className="ml-2 font-mono text-[0.62rem] text-slate-400">main.dart</span>
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

      <div className="hero-stack-pill hero-stack-pill-top" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
        <span>Flutter · Riverpod</span>
      </div>

      <div className="hero-delivery-card" aria-hidden="true">
        <div className="hero-delivery-icon">↗</div>
        <div>
          <p className="m-0 text-[0.68rem] font-semibold text-white">Production-ready</p>
          <p className="m-0 font-mono text-[0.62rem] text-slate-400">mobile delivery</p>
        </div>
      </div>

      <div className="hero-architecture-card" aria-hidden="true">
        <div className="hero-delivery-icon">◎</div>
        <div>
          <p className="m-0 text-[0.68rem] font-semibold text-white">Clean Architecture</p>
          <p className="m-0 font-mono text-[0.62rem] text-slate-400">Repository Pattern</p>
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

  const fallbackLinks = profileLinks.length > 0 ? profileLinks : links.slice(0, 2);
  const firstName = hero.name.split(" ")[0] || hero.name;

  const heroTechStack = hero.skills;

  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-8">
          <div className="space-y-5">
            <p className="hero-status">{hero.eyebrow}</p>
            <h1
              id="hero-title"
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
            Hi, I&apos;m {firstName}.<br />
            I build polished <span className="text-gradient">mobile apps</span> for real users.
            <span className="sr-only">{hero.tagline}</span>
            </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {hero.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={hero.quickCtaHref} className="cta-button">
              {hero.quickCtaLabel}
              </a>

            <a href="/cv.pdf" className="cta-outline">
              Download CV
              </a>

            {fallbackLinks.map((link) => (
              <a
                key={link.href}
                className="cta-outline"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {heroTechStack.map((tech) => (
                <span key={tech} className="pill">
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
