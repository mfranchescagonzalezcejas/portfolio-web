import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const globalCss = readFileSync(
  resolve(process.cwd(), "src/styles/global.css"),
  "utf8",
);

const experienceSource = readFileSync(
  resolve(process.cwd(), "src/sections/experience/Experience.tsx"),
  "utf8",
);

const compactHeaderStart = globalCss.indexOf("@media (max-width: 879px)");
const compactHeaderEnd = globalCss.indexOf(
  "@media (max-width: 639px)",
  compactHeaderStart,
);
const heroGlowStart = globalCss.indexOf(".hero-section::before");
const heroGlowEnd = globalCss.indexOf(".hero-content", heroGlowStart);

/** Extract a media-query block from CSS between its header and the next @media */
function extractMediaBlock(css: string, header: string): string {
  const start = css.indexOf(header);
  if (start < 0) return "";
  const next = css.indexOf("@media", start + header.length);
  return css.slice(start, next > start ? next : undefined);
}

const compact639Block = extractMediaBlock(
  globalCss,
  "@media (max-width: 639px)",
);
const mobileInkscrollerBlock = extractMediaBlock(
  globalCss,
  "@media (max-width: 47.999rem)",
);
const desktopInkscrollerBlock = extractMediaBlock(
  globalCss,
  "@media (min-width: 48rem)",
);

/** Escape regex metacharacters, then normalize whitespace around colon */
function decl(prop: string): string {
  const escaped = prop.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const normalized = escaped.replace(/\s*:\s*/g, "\\s*:\\s*");
  // Ensure declaration starts after { or ; to avoid partial matches (e.g. width inside max-width)
  return `(?<=[;{]\\s*)${normalized}`;
}

/** Assert that a CSS rule block (from a given source) contains all given declarations */
function blockContains(
  source: string,
  selector: string,
  ...declarations: string[]
) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Anchor to rule boundary: start of string, after }, after { (media query), or after comma
  const pattern = new RegExp(`(?:^|}|\\{|,)\\s*${escaped}\\s*\\{[^}]*}`);
  const match = source.match(pattern);
  const block = match ? match[0] : "";
  for (const d of declarations) {
    expect(block).toMatch(new RegExp(decl(d)));
  }
}

describe("responsive CSS contract", () => {
  it("keeps root overflow clipped without invalid color-mix percentages", () => {
    blockContains(
      globalCss,
      "html",
      "overflow-x: hidden;",
      "overflow-x: clip;",
    );
    blockContains(
      globalCss,
      "body",
      "overflow-x: hidden;",
      "overflow-x: clip;",
    );
    blockContains(
      globalCss,
      ".hero-visual",
      "min-height: 34rem",
      "overflow-x: hidden;",
      "overflow-x: clip;",
    );
    expect(globalCss).toContain(".hero-section::before");
    expect(globalCss).toContain('content: ""');
    expect(globalCss).toContain("position: absolute;");
    expect(heroGlowStart).toBeGreaterThanOrEqual(0);

    const heroGlowBlock = globalCss.slice(heroGlowStart, heroGlowEnd);
    expect(heroGlowBlock).toContain("width: min(");
    expect(heroGlowBlock).toContain("height:");
    expect(heroGlowBlock).toContain("border-radius: 9999px;");
    expect(heroGlowBlock).not.toContain("inset: 0;");
    expect(globalCss).not.toContain(".hero-visual::before");
    expect(globalCss).not.toContain(".hero-phone-glow");
    expect(globalCss).not.toContain(".hero-float-glow");
    expect(globalCss).not.toContain("46rem 38rem");
    expect(globalCss).not.toMatch(/color-mix\([^)]*\b1[0-9]{2}%/);
    expect(globalCss).not.toContain("var(--overlay-bg) 150%");
  });

  it("keeps the header compact through tablet portrait while retaining its CTA", () => {
    expect(
      compactHeaderStart,
      "compact header media query start marker should exist",
    ).toBeGreaterThanOrEqual(0);
    expect(
      compactHeaderEnd,
      "compact header end marker should be found after the start marker",
    ).toBeGreaterThan(compactHeaderStart);

    const compactHeaderBlock = globalCss.slice(
      compactHeaderStart,
      compactHeaderEnd,
    );

    expect(compactHeaderBlock).toContain(".header-shell");
    expect(compactHeaderBlock).toContain("flex-wrap: wrap;");
    expect(compactHeaderBlock).toContain("max-width: calc(100vw - 2rem);");
    expect(compactHeaderBlock).toContain("overflow: hidden;");
    expect(compactHeaderBlock).toContain(".header-primary-nav");
    expect(compactHeaderBlock).toContain("flex: 0 0 100%;");
    expect(compactHeaderBlock).toContain("overflow-x: auto;");
    expect(compactHeaderBlock).not.toContain(
      ".header-shell .header-contact-cta",
    );
    expect(compact639Block).toMatch(
      /\.header-shell\s+\.header-contact-cta\s*\{[^}]*display:\s*none/,
    );
    expect(
      globalCss.match(/\.header-contact-cta \{\s+display: none;\s+\}/g),
    ).toHaveLength(1);
    for (const selector of [
      ".header-brand-link",
      ".header-nav-link",
      ".header-lang-toggle",
      ".header-contact-cta",
    ]) {
      expect(globalCss).toContain(`${selector} {`);
    }
    expect(
      globalCss.match(/min-height: 2\.75rem;/g)?.length,
    ).toBeGreaterThanOrEqual(4);
    blockContains(
      globalCss,
      ".header-theme-toggle",
      "display: grid;",
      "place-items: center;",
      "min-width: 2.25rem;",
      "width: 2.25rem;",
      "min-height: 2.25rem;",
      "height: 2.25rem;",
    );
  });

  it("lets Experience period badges stack and wrap on narrow screens", () => {
    expect(experienceSource).not.toContain("grid-cols-[minmax(0,1fr)_auto]");
    expect(experienceSource).toContain("flex min-w-0 flex-col items-start");
    expect(experienceSource).toContain("experience-period-badge");
    expect(experienceSource).toContain("sm:flex-row");
    expect(experienceSource).toContain("max-w-full");
    expect(experienceSource).toContain("whitespace-normal");
    expect(experienceSource).toContain("break-words");
    expect(experienceSource).toContain("sm:shrink-0 sm:whitespace-nowrap");
  });

  it("keeps hero profile links quiet while retaining 44px touch targets", () => {
    blockContains(
      globalCss,
      ".hero-profile-links",
      "display: flex;",
      "flex-wrap: wrap;",
    );
    blockContains(
      globalCss,
      ".hero-profile-link",
      "display: inline-flex;",
      "align-items: center;",
      "min-height: 2.75rem;",
    );
    expect(globalCss).toContain("text-decoration: underline;");
    expect(globalCss).not.toContain(".hero-cta-social");
  });

  it("keeps InkScroller dots visually small with 24px hit targets", () => {
    expect(globalCss).toMatch(
      /\.inkscroller-dot\s*\{[\s\S]*width:\s*1\.5rem;[\s\S]*height:\s*1\.5rem;[\s\S]*min-width:\s*1\.5rem;[\s\S]*min-height:\s*1\.5rem;/,
    );
    expect(globalCss).toMatch(
      /\.inkscroller-dot::before\s*\{[\s\S]*width:\s*0\.75rem;[\s\S]*height:\s*0\.75rem;/,
    );
    expect(globalCss).toContain(".inkscroller-dot.active::before");
  });

  it("keeps a dominant mobile InkScroller focus and restores the three-slide gallery at 768px", () => {
    blockContains(
      globalCss,
      ".inkscroller-carousel",
      "position: relative;",
      "width: 100%;",
      "padding-inline: 0;",
    );
    blockContains(globalCss, ".inkscroller-slide", "flex: 0 0 82%;");
    blockContains(
      globalCss,
      ".inkscroller-slide.active",
      "transform: scale(1.02);",
    );
    blockContains(
      globalCss,
      ".inkscroller-slide:not(.active)",
      "transform: scale(0.88);",
      "opacity: 0.3;",
    );
    expect(globalCss).toMatch(
      /\.inkscroller-slide:not\(\.active\)\s+\.inkscroller-slide-title\s*,\s*\.inkscroller-slide:not\(\.active\)\s+\.inkscroller-slide-desc\s*\{[^}]*visibility:\s*hidden;/,
    );
    expect(mobileInkscrollerBlock).toMatch(
      /\.inkscroller-prev\s*\{[^}]*left:\s*-0\.75rem;/,
    );
    expect(mobileInkscrollerBlock).toMatch(
      /\.inkscroller-next\s*\{[^}]*right:\s*-0\.75rem;/,
    );
    blockContains(
      desktopInkscrollerBlock,
      ".inkscroller-carousel",
      "padding-inline: 1.5rem;",
    );
    blockContains(
      desktopInkscrollerBlock,
      ".inkscroller-slide",
      "flex-basis: 35%;",
    );
    blockContains(
      desktopInkscrollerBlock,
      ".inkscroller-slide.active",
      "transform: scale(1.05);",
    );
    blockContains(
      desktopInkscrollerBlock,
      ".inkscroller-slide:not(.active)",
      "transform: scale(0.92);",
      "opacity: 0.45;",
    );
    expect(desktopInkscrollerBlock).toMatch(
      /\.inkscroller-slide:not\(\.active\)\s+\.inkscroller-slide-title\s*,\s*\.inkscroller-slide:not\(\.active\)\s+\.inkscroller-slide-desc\s*\{[^}]*visibility:\s*visible;/,
    );
  });

  it("keeps Learning project cards symmetric", () => {
    blockContains(
      globalCss,
      ".projects-grid",
      "display: grid;",
      "align-items: stretch;",
    );
    expect(globalCss).toContain(".projects-learning-group {");
    expect(globalCss).toContain(".projects-learning-header {");
    expect(globalCss).toMatch(
      /\.projects-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/,
    );
    expect(globalCss).not.toContain(".project-card-primary");
    expect(globalCss).not.toContain(".project-card-icon-visual");
  });
});
