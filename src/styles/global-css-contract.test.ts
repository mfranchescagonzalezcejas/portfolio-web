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

const mobileHeaderStart = globalCss.indexOf("@media (max-width: 767px)");
const mobileHeaderEnd = globalCss.indexOf(
  ".header-lang-toggle",
  mobileHeaderStart,
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
      ".hero-section::before {\n  content: \"\";\n  position: absolute;",
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

  it("keeps mobile header containment and CTA hiding at the mobile breakpoint", () => {
    expect(
      mobileHeaderStart,
      "mobile header media query start marker should exist",
    ).toBeGreaterThanOrEqual(0);
    expect(
      mobileHeaderEnd,
      "mobile header end marker should be found after the start marker",
    ).toBeGreaterThan(mobileHeaderStart);

    const mobileHeaderBlock = globalCss.slice(
      mobileHeaderStart,
      mobileHeaderEnd,
    );

    expect(mobileHeaderBlock).toContain(".header-shell");
    expect(mobileHeaderBlock).toContain("flex-wrap: wrap;");
    expect(mobileHeaderBlock).toContain("max-width: calc(100vw - 2rem);");
    expect(mobileHeaderBlock).toContain("overflow: hidden;");
    expect(mobileHeaderBlock).toContain(".header-primary-nav");
    expect(mobileHeaderBlock).toContain("flex: 0 0 100%;");
    expect(mobileHeaderBlock).toContain("overflow-x: auto;");
    expect(mobileHeaderBlock).toContain(".header-shell .header-contact-cta");
    expect(mobileHeaderBlock).toContain("display: none;");
    expect(
      globalCss.match(/\.header-contact-cta \{\s+display: none;\s+\}/g),
    ).toHaveLength(1);
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
});
