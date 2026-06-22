import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { siteContentByLocale } from "./content/site";

type LocaleEntrypoint = {
  path: string;
  locale: keyof typeof siteContentByLocale;
};

type SeoContract = {
  canonical: string;
  alternates: {
    en: string;
    es: string;
    "x-default": string;
  };
};

const productionSiteUrl = "https://devdigi.dev";

type StaticContract = {
  skipLabel: string;
  sectionHeadings: string[];
  heroSnippet: string;
  valuesSnippet: string;
  valuesItems: string[];
  summaryHeading: string;
  summarySnippet: string;
  summaryBrandSnippet: string;
  cta: string;
  portfolioItems: string[];
  footerText: string;
  navLabel: string;
  skillsNavLabel: string;
};

const entrypoints: LocaleEntrypoint[] = [
  { path: "index.html", locale: "en" },
  { path: "en/index.html", locale: "en" },
  { path: "es/index.html", locale: "es" },
];

const seoContracts: Record<string, SeoContract> = {
  "index.html": {
    canonical: `${productionSiteUrl}/en`,
    alternates: {
      en: `${productionSiteUrl}/en`,
      es: `${productionSiteUrl}/es`,
      "x-default": `${productionSiteUrl}/en`,
    },
  },
  "en/index.html": {
    canonical: `${productionSiteUrl}/en`,
    alternates: {
      en: `${productionSiteUrl}/en`,
      es: `${productionSiteUrl}/es`,
      "x-default": `${productionSiteUrl}/en`,
    },
  },
  "es/index.html": {
    canonical: `${productionSiteUrl}/es`,
    alternates: {
      en: `${productionSiteUrl}/en`,
      es: `${productionSiteUrl}/es`,
      "x-default": `${productionSiteUrl}/en`,
    },
  },
};

const sectionIds = [
  "top",
  "values",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
];

const staticContracts: Record<
  keyof typeof siteContentByLocale,
  StaticContract
> = {
  en: {
    skipLabel: "Skip to content",
    sectionHeadings: [
      "About",
      "What I bring as a mobile developer",
      "Experience",
      "Selected proof of work",
      "Tools and engineering stack",
      "Education",
      "Contact",
    ],
    heroSnippet: "I build polished mobile apps for real users.",
    valuesSnippet:
      "Practical engineering that turns into shipped, maintainable mobile products.",
    valuesItems: [
      "Production mobile apps",
      "Clean architecture",
      "Release & CI/CD workflows",
      "QA & product validation",
    ],
    summaryHeading: "Software engineer, mobile by craft.",
    summarySnippet: "Software Engineer specialized in mobile development",
    summaryBrandSnippet:
      "where I showcase my mobile work, projects and technical growth",
    cta: "Contact me",
    portfolioItems: ["InkScroller", "DevDigi Portfolio Web"],
    footerText: "Built with care in Barcelona",
    navLabel: "Primary navigation",
    skillsNavLabel: "Skills",
  },
  es: {
    skipLabel: "Saltar al contenido",
    sectionHeadings: [
      "Sobre mí",
      "Lo que aporto como desarrolladora móvil",
      "Experiencia",
      "Trabajos seleccionados",
      "Herramientas y stack de ingeniería",
      "Educación",
      "Contacto",
    ],
    heroSnippet: "Construyo apps móviles pulidas para usuarios reales.",
    valuesSnippet:
      "Ingeniería práctica que se traduce en productos móviles entregados y mantenibles.",
    valuesItems: [
      "Apps móviles en producción",
      "Arquitectura limpia",
      "Releases y CI/CD",
      "QA y validación de producto",
    ],
    summaryHeading: "Ingeniera de software, mobile por oficio.",
    summarySnippet: "Ingeniera de Software especializada en desarrollo móvil",
    summaryBrandSnippet:
      "donde muestro mi trabajo mobile, proyectos y crecimiento técnico",
    cta: "Contáctame",
    portfolioItems: ["InkScroller", "DevDigi Portfolio Web"],
    footerText: "Desarrollado con cariño en Barcelona",
    navLabel: "Navegación principal",
    skillsNavLabel: "Competencias",
  },
};

const readHtml = (relativePath: string): string =>
  readFileSync(resolve(process.cwd(), relativePath), "utf8");

const assertNoJsContract = (
  html: string,
  locale: keyof typeof siteContentByLocale,
) => {
  const contract = staticContracts[locale];
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");
  const body = document.body;
  const bodyText = (body.textContent ?? "").replace(/\s+/g, " ").trim();
  const sections = Array.from(body.querySelectorAll("section"));
  const sectionOrder = (sectionId: string) =>
    sections.findIndex((section) => section.id === sectionId);
  const topIndex = sectionOrder("top");
  const valuesIndex = sectionOrder("values");
  const aboutIndex = sectionOrder("about");
  const experienceIndex = sectionOrder("experience");

  expect(bodyText).toContain(contract.skipLabel);
  expect(body.querySelector("main#main-content")).not.toBeNull();
  expect(
    body.querySelector(`nav[aria-label="${contract.navLabel}"]`),
  ).not.toBeNull();
  expect(
    body
      .querySelector(`nav[aria-label="${contract.navLabel}"] a[href="#skills"]`)
      ?.textContent?.trim(),
  ).toBe(contract.skillsNavLabel);

  for (const sectionId of sectionIds) {
    const section = body.querySelector(`section#${sectionId}`);
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-labelledby")).toBeTruthy();
  }

  expect(topIndex).toBeGreaterThanOrEqual(0);
  expect(valuesIndex).toBeGreaterThanOrEqual(0);
  expect(aboutIndex).toBeGreaterThanOrEqual(0);
  expect(experienceIndex).toBeGreaterThanOrEqual(0);
  expect(topIndex).toBeLessThan(valuesIndex);
  expect(valuesIndex).toBeLessThan(aboutIndex);
  expect(aboutIndex).toBeLessThan(experienceIndex);

  for (const heading of contract.sectionHeadings) {
    expect(bodyText).toContain(heading);
  }

  for (const projectName of contract.portfolioItems) {
    expect(bodyText).toContain(projectName);
  }

  expect(bodyText).toContain(contract.heroSnippet);
  expect(bodyText).toContain(contract.valuesSnippet);

  for (const valueItem of contract.valuesItems) {
    expect(bodyText).toContain(valueItem);
  }

  expect(bodyText).toContain(contract.summaryHeading);
  expect(bodyText).toContain(contract.summarySnippet);
  expect(bodyText).toContain(contract.summaryBrandSnippet);
  expect(bodyText).toContain(contract.cta);
  expect(bodyText).toContain(contract.footerText);
  expect(bodyText).not.toMatch(/\u00A9\s*20\d{2}/);
  expect(bodyText.trim().length).toBeGreaterThan(400);
};

describe("Localized static entrypoints", () => {
  it.each(entrypoints)(
    "uses locale-specific metadata for $path",
    ({ path, locale }) => {
      const html = readHtml(path);
      const site = siteContentByLocale[locale];

      expect(html).toContain(`<html lang="${locale}">`);
      expect(html).toContain(`<title>${site.meta.title}</title>`);
      expect(html).toContain(`content="${site.meta.description}"`);
      expect(html).toContain(
        `<script type="module" src="/src/main.tsx"></script>`,
      );
    },
  );

  it.each(entrypoints)(
    "contains localized pre-hydration SEO fallback content for $path",
    ({ path, locale }) => {
      const html = readHtml(path);

      expect(html).toContain(`<html lang="${locale}">`);
      expect(html).toContain('<main id="main-content">');
      expect(html).toContain('href="#about"');
      expect(html).toContain('href="#experience"');
      expect(html).toContain('href="#projects"');
      expect(html).toContain('href="#skills"');
      expect(html).toContain('href="#education"');
      expect(html).toContain('href="#contact"');

      assertNoJsContract(html, locale);
    },
  );

  it.each(entrypoints)(
    "includes canonical and hreflang alternates for $path",
    ({ path }) => {
      const html = readHtml(path);
      const parser = new DOMParser();
      const document = parser.parseFromString(html, "text/html");
      const seo = seoContracts[path];

      const canonical = document.head.querySelector('link[rel="canonical"]');
      expect(canonical).not.toBeNull();
      expect(canonical?.getAttribute("href")).toBe(seo.canonical);

      const enAlternate = document.head.querySelector(
        'link[rel="alternate"][hreflang="en"]',
      );
      const esAlternate = document.head.querySelector(
        'link[rel="alternate"][hreflang="es"]',
      );
      const xDefaultAlternate = document.head.querySelector(
        'link[rel="alternate"][hreflang="x-default"]',
      );

      expect(enAlternate).not.toBeNull();
      expect(esAlternate).not.toBeNull();
      expect(xDefaultAlternate).not.toBeNull();

      expect(enAlternate?.getAttribute("href")).toBe(seo.alternates.en);
      expect(esAlternate?.getAttribute("href")).toBe(seo.alternates.es);
      expect(xDefaultAlternate?.getAttribute("href")).toBe(
        seo.alternates["x-default"],
      );
    },
  );

  it("routes locale paths to localized static HTML in vercel config", () => {
    const vercelConfig = JSON.parse(
      readFileSync(resolve(process.cwd(), "vercel.json"), "utf8"),
    ) as { rewrites: { source: string; destination: string }[] };

    expect(vercelConfig.rewrites).toEqual(
      expect.arrayContaining([
        { source: "/en", destination: "/en/index.html" },
        { source: "/en/:path*", destination: "/en/index.html" },
        { source: "/es", destination: "/es/index.html" },
        { source: "/es/:path*", destination: "/es/index.html" },
      ]),
    );
  });
});
