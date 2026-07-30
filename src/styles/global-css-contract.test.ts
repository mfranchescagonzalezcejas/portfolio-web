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

describe("responsive CSS contract", () => {
  it("keeps root overflow clipped without invalid color-mix percentages", () => {
    expect(globalCss).toContain(
      "html {\n  overflow-x: hidden;\n  overflow-x: clip;",
    );
    expect(globalCss).toContain(
      "body {\n  overflow-x: hidden;\n  overflow-x: clip;",
    );
    expect(globalCss).toContain(
      ".hero-visual {\n  position: relative;\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  justify-content: center;\n  min-height: 34rem;\n  overflow-x: hidden;\n  overflow-x: clip;",
    );
    expect(globalCss).toContain(
      '.hero-section::before {\n  content: "";\n  position: absolute;',
    );
    expect(globalCss).toContain(
      ".hero-content {\n  position: relative;\n  z-index: 1;",
    );
    expect(heroGlowStart).toBeGreaterThanOrEqual(0);
    expect(heroGlowEnd).toBeGreaterThan(heroGlowStart);

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
    expect(globalCss).toContain(
      "@media (max-width: 639px) {\n  .header-shell .header-contact-cta {\n    display: none;",
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
    expect(globalCss).toContain(
      ".header-theme-toggle {\n  display: grid;\n  place-items: center;\n  min-width: 2.25rem;\n  width: 2.25rem;\n  min-height: 2.25rem;\n  height: 2.25rem;",
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
    expect(globalCss).toContain(
      ".hero-profile-links {\n  display: flex;\n  flex-wrap: wrap;",
    );
    expect(globalCss).toContain(
      ".hero-profile-link {\n  display: inline-flex;\n  align-items: center;\n  min-height: 2.75rem;",
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
    expect(globalCss).toMatch(
      /\.inkscroller-carousel\s*\{[\s\S]*position:\s*relative;[\s\S]*width:\s*100%;[\s\S]*padding-inline:\s*0;/,
    );
    expect(globalCss).toMatch(
      /\.inkscroller-slide\s*\{[^}]*flex:\s*0 0 82%;[^}]*\}/,
    );
    expect(globalCss).toMatch(
      /\.inkscroller-slide\.active\s*\{[\s\S]*transform:\s*scale\(1\.02\);/,
    );
    expect(globalCss).toMatch(
      /\.inkscroller-slide:not\(\.active\)\s*\{[^}]*transform:\s*scale\(0\.88\);[^}]*opacity:\s*0\.3;[^}]*\}/,
    );
    expect(globalCss).toContain(
      ".inkscroller-slide:not(.active) .inkscroller-slide-title,\n.inkscroller-slide:not(.active) .inkscroller-slide-desc {\n  visibility: hidden;",
    );
    expect(globalCss).toContain(
      "@media (max-width: 47.999rem) {\n  .inkscroller-prev {\n    left: -0.75rem;\n  }\n  .inkscroller-next {\n    right: -0.75rem;",
    );
    expect(globalCss).toContain(
      "@media (min-width: 48rem) {\n  .inkscroller-carousel {\n    padding-inline: 1.5rem;",
    );
    expect(globalCss).toContain(".inkscroller-slide {\n    flex-basis: 35%;");
    expect(globalCss).toContain(
      ".inkscroller-slide.active {\n    transform: scale(1.05);",
    );
    expect(globalCss).toContain(
      ".inkscroller-slide:not(.active) {\n    transform: scale(0.92);\n    opacity: 0.45;",
    );
    expect(globalCss).toContain(
      ".inkscroller-slide:not(.active) .inkscroller-slide-title,\n  .inkscroller-slide:not(.active) .inkscroller-slide-desc {\n    visibility: visible;",
    );
  });

  it("keeps Learning project cards symmetric", () => {
    expect(globalCss).toContain(
      ".projects-grid {\n  display: grid;\n  align-items: stretch;",
    );
    expect(globalCss).toContain(".projects-learning-group {");
    expect(globalCss).toContain(".projects-learning-header {");
    expect(globalCss).toContain(
      ".projects-grid {\n    grid-template-columns: repeat(3, minmax(0, 1fr));",
    );
    expect(globalCss).not.toContain(".project-card-primary");
    expect(globalCss).not.toContain(".project-card-icon-visual");
  });
});
