import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";

import { inkscrollerContent } from "./content/inkscroller";
import { betaContent } from "./content/beta";
import { siteContentByLocale, validateSiteContent } from "./content/site";

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
  openGraph: {
    locale: string;
    alternateLocale: string;
    url: string;
  };
};

const productionSiteUrl = "https://www.devdigi.dev";
const socialImageUrl = `${productionSiteUrl}/social-preview.png`;
const socialImagePath = resolve(process.cwd(), "public/social-preview.png");
const carouselRenderPath = resolve(process.cwd(), "src/lib/carousel-render.ts");
const globalStylesPath = resolve(process.cwd(), "src/styles/global.css");
const fontStylesheetUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
const pngSignature = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

const requiredProjectRepoUrls = [
  "https://github.com/mfranchescagonzalezcejas/inkscroller_frontend",
  "https://github.com/mfranchescagonzalezcejas/Inkscroller_backend",
  "https://github.com/mfranchescagonzalezcejas/AppSwiftUI",
  "https://github.com/mfranchescagonzalezcejas/AppUIKit",
  "https://github.com/mfranchescagonzalezcejas/AppAndroid",
];

const requiredContactUrls = [
  "https://www.linkedin.com/in/mercedes-franchesca-gonzalez-cejas-7555a7177",
  "https://github.com/mfranchescagonzalezcejas",
  "/cv.pdf",
  "mailto:mercedesgon03@gmail.com",
];

const requiredCaseStudyUrls = [
  "https://play.google.com/store/apps/details?id=cat.bcn.festamerce&pcampaignid=web_share",
  "https://play.google.com/store/apps/details?id=cat.bcn.butxaca&pcampaignid=web_share",
  "https://play.google.com/store/apps/details?id=com.nestle.nescafe.dolcegusto&pcampaignid=web_share",
];

const homeMockupPaths = (locale: "en" | "es", theme: "dark" | "light") =>
  ["explore", "home", "library"].map(
    (capture) => `/inkscroller/screenshots/${theme}/${locale}/${capture}.jpg`,
  );

const responsiveSrcset = (src: string, format: "avif" | "webp") => {
  const stem = src.slice(0, -4);
  return `${stem}-216w.${format} 216w, ${stem}-432w.${format} 432w`;
};

type StaticContract = {
  skipLabel: string;
  sectionHeadings: string[];
  heroSnippet: string;
  heroVisualStrings: string[];
  valuesSnippet: string;
  valuesItems: string[];
  summaryHeading: string;
  summarySnippet: string;
  summaryBrandSnippet: string;
  cta: string;
  portfolioItems: string[];
  learningProjectsTitle: string;
  learningProjectsDescription: string;
  caseStudyItems: string[];
  caseStudySnippets: string[];
  skillsHeading: string;
  skillCategories: string[];
  skillItems: string[];
  omittedSkills: string[];
  footerText: string;
  footerYearText: string;
  navLabel: string;
  primaryNav: [string, string][];
  educationHeading: string;
  educationCard: string;
  languagesCard: string;
  languageItems: [string, string][];
  contactHeading: string;
  cvLabel: string;
};

const entrypoints: LocaleEntrypoint[] = [
  { path: "dist/index.html", locale: "en" },
  { path: "dist/en/index.html", locale: "en" },
  { path: "dist/es/index.html", locale: "es" },
];

const productEntrypoints = [
  {
    path: "dist/en/projects/inkscroller/index.html",
    locale: "en",
    title: "InkScroller | DevDigi",
    canonical: `${productionSiteUrl}/en/projects/inkscroller`,
    alternate: `${productionSiteUrl}/es/proyectos/inkscroller`,
    hero: "Keep your next chapter within reach.",
    preview: "Browse curated stories and discover new reads.",
    beta: "Apply as a tester",
  },
  {
    path: "dist/es/proyectos/inkscroller/index.html",
    locale: "es",
    title: "InkScroller | DevDigi",
    canonical: `${productionSiteUrl}/es/proyectos/inkscroller`,
    alternate: `${productionSiteUrl}/en/projects/inkscroller`,
    hero: "Tu próximo capítulo, siempre a mano.",
    preview: "Navega por historias seleccionadas y descubre nuevas lecturas.",
    beta: "Solicitar acceso",
  },
] as const;

const seoContracts: Record<string, SeoContract> = {
  "dist/index.html": {
    canonical: `${productionSiteUrl}/en`,
    alternates: {
      en: `${productionSiteUrl}/en`,
      es: `${productionSiteUrl}/es`,
      "x-default": `${productionSiteUrl}/en`,
    },
    openGraph: {
      locale: "en_US",
      alternateLocale: "es_ES",
      url: `${productionSiteUrl}/en`,
    },
  },
  "dist/en/index.html": {
    canonical: `${productionSiteUrl}/en`,
    alternates: {
      en: `${productionSiteUrl}/en`,
      es: `${productionSiteUrl}/es`,
      "x-default": `${productionSiteUrl}/en`,
    },
    openGraph: {
      locale: "en_US",
      alternateLocale: "es_ES",
      url: `${productionSiteUrl}/en`,
    },
  },
  "dist/es/index.html": {
    canonical: `${productionSiteUrl}/es`,
    alternates: {
      en: `${productionSiteUrl}/en`,
      es: `${productionSiteUrl}/es`,
      "x-default": `${productionSiteUrl}/en`,
    },
    openGraph: {
      locale: "es_ES",
      alternateLocale: "en_US",
      url: `${productionSiteUrl}/es`,
    },
  },
};

const sectionIds = [
  "top",
  "values",
  "about",
  "experience",
  "featured",
  "projects",
  "case-studies",
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
      "Featured project",
      "Inkscroller",
      "Selected work",
      "Skills",
      "Technical toolbox",
      "Education and languages",
      "Education and languages",
      "Let’s build great mobile products.",
    ],
    heroSnippet: "I help product teams ship reliable mobile apps.",
    heroVisualStrings: ["Reading now", "Chapter 47"],
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
    portfolioItems: ["AppSwiftUI", "AppUIKit", "AppAndroid"],
    learningProjectsTitle: "Learning projects",
    learningProjectsDescription: "Worldline internship learning projects",
    caseStudyItems: [
      "La Mercè production release",
      "Barcelona a la Butxaca air quality",
      "Nescafé Dolce Gusto QA validation",
    ],
    caseStudySnippets: [
      "Professional work shown with public app references only",
      "My role",
      "release validation",
      "air quality feature",
      "reconnection and brew flow validation",
    ],
    skillsHeading: "Technical toolbox",
    skillCategories: [
      "Mobile",
      "Architecture",
      "Backend & APIs",
      "Delivery & Quality",
      "Ways of working",
    ],
    skillItems: [
      "Flutter",
      "Jetpack Compose",
      "Repository Pattern",
      "FastAPI",
      "GitHub Actions",
      "QA validation",
      "Agile/Scrum",
    ],
    omittedSkills: ["Remote collaboration"],
    footerText: "Built with care in Barcelona",
    footerYearText: `© ${new Date().getFullYear()} · Built with care in Barcelona`,
    navLabel: "Primary",
    primaryNav: [
      ["About", "#about"],
      ["Experience", "#experience"],
      ["Projects", "#projects"],
      ["Skills", "#skills"],
      ["Education", "#education"],
      ["Contact", "#contact"],
    ],
    educationHeading: "Education and languages",
    educationCard: "Education",
    languagesCard: "Languages",
    languageItems: [
      ["Spanish", "Native"],
      ["Catalan", "Native"],
      ["English", "B2"],
    ],
    contactHeading: "Let’s build great mobile products.",
    cvLabel: "Download CV",
  },
  es: {
    skipLabel: "Saltar al contenido",
    sectionHeadings: [
      "Sobre mí",
      "Lo que aporto como desarrolladora móvil",
      "Experiencia",
      "Proyecto destacado",
      "Inkscroller",
      "Trabajos seleccionados",
      "Competencias",
      "Caja de herramientas técnicas",
      "Formación e idiomas",
      "Formación e idiomas",
      "Construyamos grandes productos móviles.",
    ],
    heroSnippet: "Ayudo a equipos de producto a entregar apps móviles fiables.",
    heroVisualStrings: ["Leyendo ahora", "Capítulo 47"],
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
    portfolioItems: ["AppSwiftUI", "AppUIKit", "AppAndroid"],
    learningProjectsTitle: "Proyectos de aprendizaje",
    learningProjectsDescription: "prácticas en Worldline",
    caseStudyItems: [
      "Release en producción de La Mercè",
      "Barcelona a la Butxaca calidad del aire",
      "Nescafé Dolce Gusto validación QA",
    ],
    caseStudySnippets: [
      "Trabajo profesional mostrado solo con referencias públicas",
      "Mi rol",
      "validación de release",
      "calidad del aire",
      "validación de flujos de reconexión y preparación",
    ],
    skillsHeading: "Caja de herramientas técnicas",
    skillCategories: [
      "Mobile",
      "Arquitectura",
      "Backend y APIs",
      "Entrega y calidad",
      "Formas de trabajo",
    ],
    skillItems: [
      "Flutter",
      "Jetpack Compose",
      "Patrón Repository",
      "FastAPI",
      "GitHub Actions",
      "Validación QA",
      "Agile/Scrum",
    ],
    omittedSkills: ["Colaboración remota"],
    footerText: "Desarrollado con cariño en Barcelona",
    footerYearText: `© ${new Date().getFullYear()} · Desarrollado con cariño en Barcelona`,
    navLabel: "Principal",
    primaryNav: [
      ["Sobre mí", "#about"],
      ["Experiencia", "#experience"],
      ["Proyectos", "#projects"],
      ["Habilidades", "#skills"],
      ["Educación", "#education"],
      ["Contacto", "#contact"],
    ],
    educationHeading: "Formación e idiomas",
    educationCard: "Formación",
    languagesCard: "Idiomas",
    languageItems: [
      ["Español", "Nativo"],
      ["Catalán", "Nativo"],
      ["Inglés", "B2"],
    ],
    contactHeading: "Construyamos grandes productos móviles.",
    cvLabel: "Descargar CV",
  },
};

const readHtml = (relativePath: string): string =>
  readFileSync(resolve(process.cwd(), relativePath), "utf8");

const normalizeReadableText = (text: string): string =>
  text.replace(/\s+/g, " ").replace(/,(\S)/g, ", $1").trim();

const assertNoJsContract = (
  html: string,
  locale: keyof typeof siteContentByLocale,
) => {
  const contract = staticContracts[locale];
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");
  const body = document.body;
  const bodyText = normalizeReadableText(body.textContent ?? "");
  const sections = Array.from(body.querySelectorAll("section"));
  const sectionOrder = (sectionId: string) =>
    sections.findIndex((section) => section.id === sectionId);
  const topIndex = sectionOrder("top");
  const valuesIndex = sectionOrder("values");
  const aboutIndex = sectionOrder("about");
  const experienceIndex = sectionOrder("experience");
  const featuredIndex = sectionOrder("featured");
  const projectsIndex = sectionOrder("projects");
  const caseStudiesIndex = sectionOrder("case-studies");
  const skillsIndex = sectionOrder("skills");
  const educationIndex = sectionOrder("education");
  const contactIndex = sectionOrder("contact");

  expect(bodyText).toContain(contract.skipLabel);
  expect(body.querySelector("main#main-content")).not.toBeNull();
  expect(
    body.querySelector(`nav[aria-label="${contract.navLabel}"]`),
  ).not.toBeNull();
  const primaryNav = body.querySelector(
    `nav[aria-label="${contract.navLabel}"]`,
  );
  expect(
    Array.from(primaryNav?.querySelectorAll("a") ?? []).map((link) => [
      link.textContent?.trim(),
      link.getAttribute("href"),
    ]),
  ).toEqual(contract.primaryNav);

  const inkScrollerPath =
    locale === "en" ? "/en/projects/inkscroller" : "/es/proyectos/inkscroller";
  expect(primaryNav?.querySelector(`a[href="${inkScrollerPath}"]`)).toBeNull();
  expect(
    body.querySelector(`section#featured a[href="${inkScrollerPath}"]`),
  ).not.toBeNull();

  const featuredMockups = Array.from(
    body.querySelectorAll<HTMLImageElement>(
      'section#featured .mockup-phone-screen img[alt=""][loading="lazy"]',
    ),
  );
  expect(featuredMockups).toHaveLength(3);
  expect(featuredMockups.map((mockup) => mockup.getAttribute("src"))).toEqual(
    homeMockupPaths(locale, "dark"),
  );
  featuredMockups.forEach((mockup) => {
    expect(mockup.getAttribute("width")).toBe("1080");
    expect(mockup.getAttribute("height")).toBe("2340");
    expect(mockup.getAttribute("decoding")).toBe("async");
  });
  expect(
    featuredMockups.map((mockup) => mockup.getAttribute("data-light-src")),
  ).toEqual(homeMockupPaths(locale, "light"));
  expect(html).not.toContain("drive-download-20260726T185531Z-1-001");

  for (const sectionId of sectionIds) {
    const section = body.querySelector(`section#${sectionId}`);
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-labelledby")).toBeTruthy();
  }

  expect(topIndex).toBeGreaterThanOrEqual(0);
  expect(valuesIndex).toBeGreaterThanOrEqual(0);
  expect(aboutIndex).toBeGreaterThanOrEqual(0);
  expect(experienceIndex).toBeGreaterThanOrEqual(0);
  expect(featuredIndex).toBeGreaterThanOrEqual(0);
  expect(projectsIndex).toBeGreaterThanOrEqual(0);
  expect(caseStudiesIndex).toBeGreaterThanOrEqual(0);
  expect(skillsIndex).toBeGreaterThanOrEqual(0);
  expect(educationIndex).toBeGreaterThanOrEqual(0);
  expect(contactIndex).toBeGreaterThanOrEqual(0);
  expect(topIndex).toBeLessThan(valuesIndex);
  expect(valuesIndex).toBeLessThan(aboutIndex);
  expect(aboutIndex).toBeLessThan(experienceIndex);
  expect(experienceIndex).toBeLessThan(featuredIndex);
  expect(featuredIndex).toBeLessThan(projectsIndex);
  expect(projectsIndex).toBeLessThan(caseStudiesIndex);
  expect(caseStudiesIndex).toBeLessThan(skillsIndex);
  expect(skillsIndex).toBeLessThan(educationIndex);
  expect(educationIndex).toBeLessThan(contactIndex);

  for (const heading of contract.sectionHeadings) {
    expect(bodyText).toContain(heading);
  }

  for (const projectName of contract.portfolioItems) {
    expect(bodyText).toContain(projectName);
  }
  const projectsSection = body.querySelector("section#projects");
  expect(projectsSection?.querySelector("h3")?.textContent?.trim()).toBe(
    contract.learningProjectsTitle,
  );
  expect(projectsSection?.textContent).toContain(
    contract.learningProjectsDescription,
  );
  expect(projectsSection?.querySelectorAll("article")).toHaveLength(3);

  const caseStudiesSection = body.querySelector("section#case-studies");
  expect(caseStudiesSection).not.toBeNull();
  expect(caseStudiesSection?.querySelectorAll("article")).toHaveLength(3);
  for (const caseStudyItem of contract.caseStudyItems) {
    expect(bodyText).toContain(caseStudyItem);
  }
  for (const caseStudySnippet of contract.caseStudySnippets) {
    expect(bodyText).toContain(caseStudySnippet);
  }

  const skillsSection = body.querySelector("section#skills");
  expect(skillsSection).not.toBeNull();
  expect(skillsSection?.querySelector("h2")?.textContent?.trim()).toBe(
    contract.skillsHeading,
  );

  const skillCards = Array.from(
    skillsSection?.querySelectorAll("article") ?? [],
  );
  expect(skillCards).toHaveLength(5);
  expect(
    skillCards.map((card) => card.querySelector("h3")?.textContent?.trim()),
  ).toEqual(contract.skillCategories.map((category) => `/${category}`));

  for (const skillItem of contract.skillItems) {
    expect(skillsSection?.textContent).toContain(skillItem);
  }

  for (const omittedSkill of contract.omittedSkills) {
    expect(skillsSection?.textContent).not.toContain(omittedSkill);
  }

  expect(bodyText).not.toContain("Expense Tracker");
  expect(bodyText).not.toContain("storyboards");

  for (const href of requiredProjectRepoUrls) {
    const repoLink = body.querySelector(`a[href="${href}"]`);
    expect(repoLink).not.toBeNull();
    expect(repoLink?.getAttribute("target")).toBe("_blank");
    expect(repoLink?.getAttribute("rel")?.split(/\s+/)).toEqual(
      expect.arrayContaining(["noopener", "noreferrer"]),
    );
  }

  for (const href of requiredContactUrls) {
    const contactLink = body.querySelector(`section#contact a[href="${href}"]`);
    expect(contactLink).not.toBeNull();
    if (href.startsWith("https://")) {
      expect(contactLink?.getAttribute("target")).toBe("_blank");
      expect(contactLink?.getAttribute("rel")?.split(/\s+/)).toEqual(
        expect.arrayContaining(["noopener", "noreferrer"]),
      );
    } else {
      expect(contactLink?.getAttribute("target")).toBeNull();
      expect(contactLink?.getAttribute("rel")).toBeNull();
    }
  }

  for (const href of requiredCaseStudyUrls) {
    const caseStudyLink = Array.from(
      caseStudiesSection?.querySelectorAll("a") ?? [],
    ).find((link) => link.getAttribute("href") === href);
    expect(caseStudyLink).not.toBeNull();
    expect(caseStudyLink?.getAttribute("target")).toBe("_blank");
    expect(caseStudyLink?.getAttribute("rel")?.split(/\s+/)).toEqual(
      expect.arrayContaining(["noopener", "noreferrer"]),
    );
  }

  const experienceCards = Array.from(
    body.querySelectorAll("section#experience article"),
  );
  expect(experienceCards).toHaveLength(
    siteContentByLocale[locale].experience.length,
  );
  siteContentByLocale[locale].experience.forEach((experience, index) => {
    const cardText = normalizeReadableText(
      experienceCards[index]?.textContent ?? "",
    );

    expect(cardText).toContain(experience.company);
    expect(cardText).toContain(experience.role);
    expect(cardText).toContain(experience.period);
  });

  expect(bodyText).toContain(contract.heroSnippet);
  for (const heroVisualString of contract.heroVisualStrings) {
    expect(bodyText).toContain(heroVisualString);
  }
  expect(bodyText).toContain(contract.valuesSnippet);

  for (const valueItem of contract.valuesItems) {
    expect(bodyText).toContain(valueItem);
  }

  expect(bodyText).toContain(contract.summaryHeading);
  expect(bodyText).toContain(contract.summarySnippet);
  expect(bodyText).toContain(contract.summaryBrandSnippet);
  expect(bodyText).toContain(contract.cta);
  const educationSection = body.querySelector("section#education");
  expect(educationSection?.querySelector("h2")?.textContent?.trim()).toBe(
    contract.educationHeading,
  );
  expect(educationSection?.textContent).toContain(contract.educationCard);
  expect(educationSection?.textContent).toContain(contract.languagesCard);
  for (const [languageName, languageLevel] of contract.languageItems) {
    expect(educationSection?.textContent).toContain(languageName);
    expect(educationSection?.textContent).toContain(languageLevel);
  }

  const contactSection = body.querySelector("section#contact");
  expect(contactSection?.querySelector("h2")?.textContent?.trim()).toBe(
    contract.contactHeading,
  );
  expect(contactSection?.textContent).toContain(contract.cvLabel);
  expect(contactSection?.textContent).toContain("Email");
  expect(bodyText).toContain(contract.footerText);
  expect(bodyText).toContain(contract.footerYearText);
  expect(bodyText.trim().length).toBeGreaterThan(400);
};

describe("Localized static entrypoints", () => {
  it("uses a valid social preview PNG asset", () => {
    expect(existsSync(socialImagePath)).toBe(true);

    const socialImage = readFileSync(socialImagePath);

    expect(socialImage.length).toBeGreaterThanOrEqual(24);
    expect(
      socialImage.subarray(0, pngSignature.length).equals(pngSignature),
    ).toBe(true);
    expect(socialImage.toString("ascii", 12, 16)).toBe("IHDR");
    expect(socialImage.readUInt32BE(16)).toBe(1200);
    expect(socialImage.readUInt32BE(20)).toBe(630);
  });

  it.each(entrypoints)(
    "uses locale-specific metadata for $path",
    ({ path, locale }) => {
      const html = readHtml(path);
      const site = siteContentByLocale[locale];

      expect(html).toContain(`<html lang="${locale}">`);
      expect(html).toContain(`<title>${site.meta.title}</title>`);
      expect(html).toContain(`content="${site.meta.description}"`);
      expect(html).not.toContain(`/src/main.tsx`);
    },
  );

  it.each(entrypoints)(
    "uses the Lovable font weight set for $path",
    ({ path }) => {
      const html = readHtml(path);
      const parser = new DOMParser();
      const document = parser.parseFromString(html, "text/html");

      const stylesheetLinks = Array.from(
        document.head.querySelectorAll('link[rel="stylesheet"]'),
      );

      expect(
        stylesheetLinks.some(
          (link) => link.getAttribute("href") === fontStylesheetUrl,
        ),
      ).toBe(true);
    },
  );

  it.each(entrypoints)(
    "contains localized pre-hydration SEO fallback content for $path",
    ({ path, locale }) => {
      const html = readHtml(path);

      expect(html).toContain(`<html lang="${locale}">`);
      expect(html).toContain('<main id="main-content"');
      expect(html).toContain('href="#about"');
      expect(html).toContain('href="#experience"');
      expect(html).toContain('href="#projects"');
      expect(html).toContain('href="#contact"');

      assertNoJsContract(html, locale);
    },
  );

  it.each(entrypoints)(
    "hydrates only the header React island for $path",
    ({ path }) => {
      const html = readHtml(path);
      const parser = new DOMParser();
      const document = parser.parseFromString(html, "text/html");
      const islands = Array.from(
        document.body.querySelectorAll("astro-island"),
      );
      const main = document.body.querySelector("main#main-content");
      const footer = document.body.querySelector("footer.site-footer");

      expect(islands).toHaveLength(1);
      expect(islands[0]?.getAttribute("client")).toBe("load");
      expect(islands[0]?.getAttribute("component-url")).toMatch(/SiteHeader\./);
      expect(islands[0]?.querySelector("header")).not.toBeNull();
      expect(islands[0]?.querySelector("main, footer, section")).toBeNull();
      expect(main).not.toBeNull();
      expect(main?.closest("astro-island")).toBeNull();
      expect(footer).not.toBeNull();
      expect(footer?.closest("astro-island")).toBeNull();
      expect(html).not.toContain('component-url="/_astro/App');
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

  it.each(entrypoints)(
    "includes localized social metadata for $path",
    ({ path, locale }) => {
      const html = readHtml(path);
      const parser = new DOMParser();
      const document = parser.parseFromString(html, "text/html");
      const site = siteContentByLocale[locale];
      const seo = seoContracts[path];

      const propertyMeta = (property: string) =>
        document.head
          .querySelector(`meta[property="${property}"]`)
          ?.getAttribute("content");
      const nameMeta = (name: string) =>
        document.head
          .querySelector(`meta[name="${name}"]`)
          ?.getAttribute("content");

      expect(propertyMeta("og:title")).toBe(site.meta.title);
      expect(propertyMeta("og:description")).toBe(site.meta.description);
      expect(propertyMeta("og:url")).toBe(seo.openGraph.url);
      expect(propertyMeta("og:locale")).toBe(seo.openGraph.locale);
      expect(propertyMeta("og:locale:alternate")).toBe(
        seo.openGraph.alternateLocale,
      );
      expect(propertyMeta("og:type")).toBe("website");
      expect(propertyMeta("og:image")).toBe(socialImageUrl);
      expect(propertyMeta("og:image:alt")).toBe(site.meta.socialImageAlt);
      expect(propertyMeta("og:image:width")).toBe("1200");
      expect(propertyMeta("og:image:height")).toBe("630");
      expect(propertyMeta("og:image:type")).toBe("image/png");

      expect(nameMeta("twitter:card")).toBe("summary_large_image");
      expect(nameMeta("twitter:title")).toBe(site.meta.title);
      expect(nameMeta("twitter:description")).toBe(site.meta.description);
      expect(nameMeta("twitter:image")).toBe(socialImageUrl);
      expect(nameMeta("twitter:image:alt")).toBe(site.meta.socialImageAlt);
    },
  );

  it.each(entrypoints)(
    "emits the theme boot script before the body for $path",
    ({ path }) => {
      const html = readHtml(path);
      const bootScriptIndex = html.indexOf("devdigi-theme");
      const bodyIndex = html.indexOf("<body");

      expect(bootScriptIndex).toBeGreaterThanOrEqual(0);
      expect(bodyIndex).toBeGreaterThanOrEqual(0);
      expect(bootScriptIndex).toBeLessThan(bodyIndex);
      expect(html).toContain("classList.add(theme)");
      expect(html).toContain(
        'storedTheme === "light" || storedTheme === "dark"',
      );
      expect(html).toContain("catch (_) {}");
      expect(html).toContain("if (!theme)");
      expect(html.indexOf("localStorage.getItem")).toBeLessThan(
        html.indexOf("catch (_) {}"),
      );
      expect(html.indexOf("matchMedia")).toBeGreaterThan(
        html.indexOf("catch (_) {}"),
      );
      expect(html.indexOf('theme = "dark"')).toBeGreaterThan(
        html.indexOf("matchMedia"),
      );
    },
  );

  it("routes locale paths to localized static HTML in vercel config", () => {
    const vercelConfig = JSON.parse(
      readFileSync(resolve(process.cwd(), "vercel.json"), "utf8"),
    ) as {
      cleanUrls: boolean;
      trailingSlash: boolean;
      rewrites?: { source: string; destination: string }[];
    };

    expect(vercelConfig.cleanUrls).toBe(true);
    expect(vercelConfig.trailingSlash).toBe(false);
    expect(vercelConfig.rewrites).toEqual([
      { source: "/en", destination: "/en/index.html" },
      { source: "/es", destination: "/es/index.html" },
    ]);
  });

  it("validates and normalizes Experience links before render", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
      const source = siteContentByLocale.en;
      const [currentExperience, ...remainingExperience] = source.experience;

      const result = validateSiteContent({
        ...source,
        experience: [
          {
            ...currentExperience,
            links: [
              { label: " Public app ", href: " https://example.com/app " },
              { label: "Broken app", href: "javascript:alert(1)" },
            ],
          },
          ...remainingExperience,
        ],
      });

      expect(result.content.experience[0].links).toEqual([
        {
          label: "Public app",
          href: "https://example.com/app",
          external: true,
        },
      ]);
      expect(result.invalidLinks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            area: "experience",
            owner: "Worldline Global Services — Native Apps Developer",
            label: "Broken app",
            href: "javascript:alert(1)",
          }),
        ]),
      );
      expect(warn).toHaveBeenCalledWith(
        "Dropped 1 invalid configured link(s) from en site content before render.",
      );
    } finally {
      warn.mockRestore();
    }
  });

  it("validates and normalizes Project links before render", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
      const source = siteContentByLocale.en;
      const [currentProject, ...remainingProjects] = source.projects;

      const result = validateSiteContent({
        ...source,
        projects: [
          {
            ...currentProject,
            links: [
              { label: " Frontend ", href: " https://example.com/front " },
              { label: "Broken repo", href: "javascript:alert(1)" },
            ],
          },
          ...remainingProjects,
        ],
      });

      expect(result.content.projects[0].links).toEqual([
        {
          label: "Frontend",
          href: "https://example.com/front",
          external: true,
        },
      ]);
      expect(result.invalidLinks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            area: "project",
            owner: "Inkscroller",
            label: "Broken repo",
            href: "javascript:alert(1)",
          }),
        ]),
      );
      expect(warn).toHaveBeenCalledWith(
        "Dropped 1 invalid configured link(s) from en site content before render.",
      );
    } finally {
      warn.mockRestore();
    }
  });

  it("validates and normalizes Case Study links before render", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
      const source = siteContentByLocale.en;
      const [currentCaseStudy, ...remainingCaseStudies] = source.caseStudies;

      const result = validateSiteContent({
        ...source,
        caseStudies: [
          {
            ...currentCaseStudy,
            links: [
              {
                label: " Public case study ",
                href: " https://example.com/case-study ",
              },
              { label: "Unsafe case study", href: "javascript:alert(1)" },
            ],
          },
          ...remainingCaseStudies,
        ],
      });

      expect(result.content.caseStudies[0].links).toEqual([
        {
          label: "Public case study",
          href: "https://example.com/case-study",
          external: true,
        },
      ]);
      expect(result.invalidLinks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            area: "caseStudy",
            owner: "La Mercè production release",
            label: "Unsafe case study",
            href: "javascript:alert(1)",
          }),
        ]),
      );
      expect(warn).toHaveBeenCalledWith(
        "Dropped 1 invalid configured link(s) from en site content before render.",
      );
    } finally {
      warn.mockRestore();
    }
  });

  it("validates and normalizes Contact links including mailto and CV targets", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
      const source = siteContentByLocale.en;

      const result = validateSiteContent({
        ...source,
        contacts: [
          {
            kind: "email",
            variant: "secondary",
            label: " Email ",
            href: " mailto:test@example.com ",
          },
          {
            kind: "cv",
            variant: "secondary",
            label: " CV ",
            href: " /cv.pdf ",
          },
          {
            kind: "linkedin",
            variant: "primary",
            label: " Site ",
            href: " https://example.com/profile ",
          },
          {
            kind: "github",
            variant: "secondary",
            label: "Plain HTTP",
            href: "http://example.com/profile",
          },
          {
            kind: "github",
            variant: "secondary",
            label: "Protocol relative",
            href: "//example.com",
          },
          {
            kind: "github",
            variant: "secondary",
            label: "Backslash protocol relative",
            href: "/\\example.com",
          },
          {
            kind: "email",
            variant: "secondary",
            label: "Missing email recipient",
            href: "mailto:",
          },
          {
            kind: "github",
            variant: "secondary",
            label: "Broken",
            href: "javascript:alert(1)",
          },
        ],
      });

      expect(result.content.contacts).toEqual([
        {
          kind: "email",
          variant: "secondary",
          label: "Email",
          href: "mailto:test@example.com",
          external: false,
        },
        {
          kind: "cv",
          variant: "secondary",
          label: "CV",
          href: "/cv.pdf",
          external: false,
        },
        {
          kind: "linkedin",
          variant: "primary",
          label: "Site",
          href: "https://example.com/profile",
          external: true,
        },
      ]);
      expect(result.invalidLinks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            area: "contact",
            owner: "contacts",
            label: "Protocol relative",
            href: "//example.com",
          }),
          expect.objectContaining({
            area: "contact",
            owner: "contacts",
            label: "Backslash protocol relative",
            href: "/\\example.com",
          }),
          expect.objectContaining({
            area: "contact",
            owner: "contacts",
            label: "Missing email recipient",
            href: "mailto:",
          }),
          expect.objectContaining({
            area: "contact",
            owner: "contacts",
            label: "Plain HTTP",
            href: "http://example.com/profile",
          }),
          expect.objectContaining({
            area: "contact",
            owner: "contacts",
            label: "Broken",
            href: "javascript:alert(1)",
          }),
        ]),
      );
      expect(warn).toHaveBeenCalledWith(
        "Dropped 5 invalid configured link(s) from en site content before render.",
      );
    } finally {
      warn.mockRestore();
    }
  });
});

describe("InkScroller static product routes", () => {
  it.each(productEntrypoints)(
    "renders the canonical $locale product route with the shared hydrated header",
    ({ path, locale, title, canonical, alternate, hero, preview, beta }) => {
      const html = readHtml(path);
      const document = new DOMParser().parseFromString(html, "text/html");
      const site = siteContentByLocale[locale];
      const headerNavigation = document.querySelector("header nav");
      const sections = Array.from(document.querySelectorAll("main section"));
      const sectionText = sections.map((section) =>
        normalizeReadableText(section.textContent ?? ""),
      );

      expect(document.documentElement.lang).toBe(locale);
      expect(document.title).toBe(title);
      expect(
        document.head
          .querySelector('link[rel="canonical"]')
          ?.getAttribute("href"),
      ).toBe(canonical);
      expect(
        document.head
          .querySelector('meta[property="og:url"]')
          ?.getAttribute("content"),
      ).toBe(canonical);
      expect(
        document.head
          .querySelector(
            `link[rel="alternate"][hreflang="${locale === "en" ? "es" : "en"}"]`,
          )
          ?.getAttribute("href"),
      ).toBe(alternate);
      expect(
        document.querySelector("main#inkscroller-content h1")?.textContent,
      ).toBe(hero);
      expect(document.querySelector("header.fixed")).not.toBeNull();
      expect(headerNavigation?.getAttribute("aria-label")).toBe(
        site.header.ariaLabel,
      );
      const homeHref = locale === "en" ? "/en" : "/es";
      expect(
        document
          .querySelector(`header a[aria-label="${site.header.homeLabel}"]`)
          ?.getAttribute("href"),
      ).toBe(`${homeHref}#top`);
      site.nav
        .filter((item) => item.href.startsWith("#"))
        .forEach((item) => {
          expect(
            headerNavigation
              ?.querySelector(`a[href="${homeHref}${item.href}"]`)
              ?.textContent?.trim(),
          ).toBe(item.label);
        });
      expect(
        document.querySelector(".header-contact-cta")?.getAttribute("href"),
      ).toBe(`${homeHref}#contact`);
      expect(
        headerNavigation?.querySelector(
          `a[href="${locale === "en" ? "/en/projects/inkscroller" : "/es/proyectos/inkscroller"}"]`,
        ),
      ).toBeNull();
      expect(
        document.querySelector(".header-lang-toggle")?.textContent,
      ).toContain(site.languageSwitcher.options[locale]);
      expect(
        document.querySelector(".header-lang-toggle")?.getAttribute("href"),
      ).toBe(
        locale === "en"
          ? "/es/proyectos/inkscroller"
          : "/en/projects/inkscroller",
      );
      expect(document.querySelectorAll("astro-island")).toHaveLength(1);
      const media = inkscrollerContent[locale].media;
      expect(Array.isArray(media)).toBe(true);
      expect(media).toHaveLength(7);
      expect(media.map((entry) => entry.src.dark)).toEqual([
        `/inkscroller/screenshots/dark/${locale}/home.jpg`,
        `/inkscroller/screenshots/dark/${locale}/explore.jpg`,
        `/inkscroller/screenshots/dark/${locale}/library.jpg`,
        `/inkscroller/screenshots/dark/${locale}/story-detail.jpg`,
        "/inkscroller/screenshots/dark/reader.jpg",
        "/inkscroller/screenshots/dark/reader-2.jpg",
        `/inkscroller/screenshots/dark/${locale}/reader-settings.jpg`,
      ]);
      expect(media.map((entry) => entry.src.light)).toEqual([
        `/inkscroller/screenshots/light/${locale}/home.jpg`,
        `/inkscroller/screenshots/light/${locale}/explore.jpg`,
        `/inkscroller/screenshots/light/${locale}/library.jpg`,
        `/inkscroller/screenshots/light/${locale}/story-detail.jpg`,
        "/inkscroller/screenshots/light/reader.jpg",
        "/inkscroller/screenshots/light/reader-2.jpg",
        locale === "en"
          ? "/inkscroller/screenshots/light/en/reader-settings-vertical-en.jpg"
          : "/inkscroller/screenshots/light/es/reader-settings-vertical.jpg",
      ]);
      expect(media.slice(4, 6).map((entry) => entry.title)).toEqual(
        locale === "en"
          ? ["Reader: vertical", "Reader: paginated"]
          : ["Lector: vertical", "Lector: paginado"],
      );
      media.forEach((entry) => {
        expect(entry.kind).toBe("capture");
        expect(typeof entry.title).toBe("string");
        expect(typeof entry.description).toBe("string");
        Object.values(entry.src).forEach((src) => {
          expect(
            existsSync(resolve(process.cwd(), "public", src.slice(1))),
          ).toBe(true);
        });
      });
      expect(normalizeReadableText(document.body.textContent ?? "")).toContain(
        preview,
      );
      expect(normalizeReadableText(document.body.textContent ?? "")).toContain(
        beta,
      );
      expect(sectionText).toHaveLength(4);
      expect(sectionText[3]).toContain(beta);
      expect(
        document.querySelectorAll(
          ".inkscroller-hero-device .mockup-phone .mockup-phone-screen",
        ),
      ).toHaveLength(1);
      const carouselImgs = document.querySelectorAll(
        ".inkscroller-carousel .mockup-phone .mockup-phone-screen img",
      );
      expect(carouselImgs).toHaveLength(7);
      expect(
        Array.from(carouselImgs).map((image) => image.getAttribute("src")),
      ).toContain(
        `/inkscroller/screenshots/dark/${locale}/reader-settings.jpg`,
      );
      expect(
        Array.from(carouselImgs).map((image) =>
          image.getAttribute("data-light-src"),
        ),
      ).toContain(
        locale === "en"
          ? "/inkscroller/screenshots/light/en/reader-settings-vertical-en.jpg"
          : "/inkscroller/screenshots/light/es/reader-settings-vertical.jpg",
      );
      const carousel = inkscrollerContent[locale].carousel;
      expect(
        document
          .querySelector(".inkscroller-carousel-section")
          ?.getAttribute("aria-label"),
      ).toBe(carousel.sectionLabel);
      expect(
        document
          .querySelector("#inkscroller-carousel")
          ?.getAttribute("aria-label"),
      ).toBe(carousel.regionLabel);
      expect(
        document.querySelector(".inkscroller-prev")?.getAttribute("aria-label"),
      ).toBe(carousel.previousLabel);
      expect(
        document.querySelector(".inkscroller-next")?.getAttribute("aria-label"),
      ).toBe(carousel.nextLabel);
      const dots = Array.from(
        document.querySelectorAll<HTMLButtonElement>(".inkscroller-dot"),
      );
      expect(
        document.querySelector(".inkscroller-dots")?.getAttribute("aria-label"),
      ).toBe(carousel.navigationLabel);
      expect(dots.map((dot) => dot.getAttribute("aria-label"))).toEqual(
        media.map((entry, index) =>
          carousel.slideLabel
            .replace("{index}", String(index + 1))
            .replace("{title}", entry.title),
        ),
      );
      const renderedMedia = [media[0], ...media];
      const pictures = Array.from(
        document.querySelectorAll<HTMLPictureElement>(
          ".mockup-phone-screen picture",
        ),
      );
      expect(pictures).toHaveLength(8);
      pictures.forEach((picture, index) => {
        const entry = renderedMedia[index];
        const image = picture.querySelector("img");
        const sources = Array.from(picture.querySelectorAll("source"));
        const lightHeight =
          locale === "es" && entry.src.light.endsWith("/library.jpg")
            ? "2811"
            : "2340";

        expect(sources.map((source) => source.getAttribute("type"))).toEqual([
          "image/avif",
          "image/webp",
        ]);
        sources.forEach((source, sourceIndex) => {
          const format = sourceIndex === 0 ? "avif" : "webp";
          expect(source.getAttribute("sizes")).toBe(
            "(max-width: 311px) 69.3vw, 216px",
          );
          expect(source.getAttribute("srcset")).toBe(
            responsiveSrcset(entry.src.dark, format),
          );
          expect(source.getAttribute("data-light-srcset")).toBe(
            responsiveSrcset(entry.src.light, format),
          );
        });
        expect(image?.getAttribute("src")).toBe(entry.src.dark);
        expect(image?.getAttribute("data-light-src")).toBe(entry.src.light);
        expect(image?.getAttribute("width")).toBe("1080");
        expect(image?.getAttribute("height")).toBe("2340");
        expect(image?.getAttribute("data-light-width")).toBe("1080");
        expect(image?.getAttribute("data-light-height")).toBe(lightHeight);
      });
      const heroImage = pictures[0]?.querySelector("img");
      expect(heroImage?.getAttribute("loading")).toBe("eager");
      expect(heroImage?.getAttribute("fetchpriority")).toBe("high");
      pictures.slice(1).forEach((picture) => {
        const image = picture.querySelector("img");
        expect(image?.getAttribute("loading")).toBe("lazy");
        expect(image?.hasAttribute("fetchpriority")).toBe(false);
      });
      expect(html).not.toContain("setInterval");
      expect(html).not.toContain("data-captures");
      expect(html).not.toContain('id="hero-img-next"');
    },
  );

  it("switches product carousel sources and Spanish library dimensions with the theme", async () => {
    const html = readHtml("dist/es/proyectos/inkscroller/index.html");
    const renderedDocument = new DOMParser().parseFromString(html, "text/html");
    const bootScript = Array.from(
      renderedDocument.head.querySelectorAll("script"),
    )
      .map((script) => script.textContent ?? "")
      .find((script) => script.includes("syncThemeImages"));
    const previousHtmlClass = document.documentElement.className;
    const previousHead = document.head.innerHTML;
    const previousBody = document.body.innerHTML;
    const previousMatchMedia = Object.getOwnPropertyDescriptor(
      window,
      "matchMedia",
    );

    try {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        value: () => ({ matches: true }),
      });
      document.documentElement.className = "";
      document.head.innerHTML = "";
      document.body.innerHTML = "";
      window.eval(bootScript ?? "");
      expect(document.documentElement).toHaveClass("light");

      document.body.innerHTML = renderedDocument.body.innerHTML;
      document.dispatchEvent(new Event("DOMContentLoaded"));

      const carouselImages = Array.from(
        document.querySelectorAll<HTMLImageElement>(
          ".inkscroller-carousel .mockup-phone-screen img",
        ),
      );
      expect(carouselImages).toHaveLength(7);
      expect(carouselImages.map((image) => image.getAttribute("src"))).toEqual(
        inkscrollerContent.es.media.map((entry) => entry.src.light),
      );
      const carouselSources = Array.from(
        document.querySelectorAll<HTMLSourceElement>(
          ".inkscroller-carousel .mockup-phone-screen source",
        ),
      );
      expect(
        carouselSources.map((source) => source.getAttribute("srcset")),
      ).toEqual(
        inkscrollerContent.es.media.flatMap((entry) => [
          responsiveSrcset(entry.src.light, "avif"),
          responsiveSrcset(entry.src.light, "webp"),
        ]),
      );
      expect(carouselImages[2]?.getAttribute("width")).toBe("1080");
      expect(carouselImages[2]?.getAttribute("height")).toBe("2811");

      document.documentElement.className = "dark";
      await Promise.resolve();

      expect(carouselImages.map((image) => image.getAttribute("src"))).toEqual(
        inkscrollerContent.es.media.map((entry) => entry.src.dark),
      );
      expect(
        carouselSources.map((source) => source.getAttribute("srcset")),
      ).toEqual(
        inkscrollerContent.es.media.flatMap((entry) => [
          responsiveSrcset(entry.src.dark, "avif"),
          responsiveSrcset(entry.src.dark, "webp"),
        ]),
      );
      expect(carouselImages[2]?.getAttribute("height")).toBe("2340");
    } finally {
      document.documentElement.className = previousHtmlClass;
      document.head.innerHTML = previousHead;
      document.body.innerHTML = previousBody;
      if (previousMatchMedia) {
        Object.defineProperty(window, "matchMedia", previousMatchMedia);
      } else {
        delete window.matchMedia;
      }
    }
  });

  it("observes only theme class changes when synchronizing images", () => {
    const layout = readFileSync(
      resolve(process.cwd(), "src/layouts/BaseLayout.astro"),
      "utf8",
    );

    expect(layout).toContain('attributeFilter: ["class"]');
    expect(layout).not.toContain("childList:");
    expect(layout).not.toContain("subtree:");
  });
});

describe("InkScroller carousel loop", () => {
  it("uses a transform track with hidden edge clones instead of scroll rebases", () => {
    const page = readFileSync(carouselRenderPath, "utf8");

    expect(page).toContain("const cloneSlide = (slide: Element) => {");
    expect(page).toContain('clone.setAttribute("aria-hidden", "true");');
    expect(page).toContain(
      "track?.prepend(...origSlides.slice(-cloneCount).map(cloneSlide));",
    );
    expect(page).toContain("createCarouselQueue(totalReal)");
    expect(page).toContain("if (!track || !viewport || !firstSlide) return;");
    expect(page).toContain(
      "parseFloat(window.getComputedStyle(firstSlide).width)",
    );
    expect(page).toContain(
      "const preview = (viewport.clientWidth - slideWidth) / 2;",
    );
    expect(page).toContain(
      "translate3d(${preview - index * slideWidth}px, 0, 0)",
    );
    expect(page).toContain('propertyName === "transform"');
    expect(page).toContain("new ResizeObserver(() => {");
    expect(page).toContain('dot.setAttribute("aria-current", "true");');
    expect(page).not.toContain("scrollLeft");
    expect(page).not.toContain("scroll-snap");
  });
});

describe("Beta index routes", () => {
  it.each([
    {
      path: "dist/en/beta/index.html",
      locale: "en",
      title: "Beta Programs | DevDigi",
      programName: "InkScroller",
      cta: "Learn more",
    },
    {
      path: "dist/es/beta/index.html",
      locale: "es",
      title: "Programas Beta | DevDigi",
      programName: "InkScroller",
      cta: "Más información",
    },
  ])(
    "renders the $locale beta index with program listing",
    ({ path, locale, title, programName, cta }) => {
      const html = readHtml(path);
      const document = new DOMParser().parseFromString(html, "text/html");

      expect(document.documentElement.lang).toBe(locale);
      expect(document.title).toBe(title);
      expect(document.querySelector(".beta-program-name")?.textContent).toBe(
        programName,
      );
      expect(
        document.querySelector(".beta-cta-primary")?.textContent?.trim(),
      ).toBe(cta);
      expect(document.querySelector("header")).not.toBeNull();
    },
  );
});

describe("InkScroller beta landing routes", () => {
  it.each([
    {
      path: "dist/en/beta/inkscroller/index.html",
      locale: "en",
      eyebrow: "Closed beta",
      heading: "Join InkScroller Beta",
      languageHref: "/es/beta/inkscroller",
    },
    {
      path: "dist/es/beta/inkscroller/index.html",
      locale: "es",
      eyebrow: "Beta cerrada",
      heading: "Únete a la beta de InkScroller",
      languageHref: "/en/beta/inkscroller",
    },
  ])(
    "renders the $locale InkScroller beta landing",
    ({ path, locale, eyebrow, heading, languageHref }) => {
      const html = readHtml(path);
      const document = new DOMParser().parseFromString(html, "text/html");

      expect(document.documentElement.lang).toBe(locale);
      expect(
        document.querySelector(".inkscroller-hero-eyebrow")?.textContent,
      ).toBe(eyebrow);
      expect(document.querySelector("h1")?.textContent).toBe(heading);
      expect(document.querySelector("header")).not.toBeNull();
      expect(
        document.querySelector(".header-lang-toggle")?.getAttribute("href"),
      ).toBe(languageHref);
      const beta = betaContent[locale as "en" | "es"].inkscroller;
      expect(document.querySelectorAll(".beta-proof-list li")).toHaveLength(
        beta.scope.items.length,
      );
      expect(document.querySelectorAll(".beta-faq details")).toHaveLength(
        beta.faq.questions.length,
      );
      expect(document.querySelectorAll(".beta-cta--primary")).toHaveLength(2);
      expect(document.querySelector("section#contact")).toBeNull();
      expect(document.body.textContent).toContain(beta.hero.microcopy);
      expect(document.title).toBe(beta.seo.title);
      expect(
        document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      ).toBe(`https://www.devdigi.dev${beta.seo.canonicalPath}`);
      (
        Object.entries(beta.seo.alternates) as [
          "en" | "es" | "x-default",
          string,
        ][]
      ).forEach(([hreflang, path]) => {
        expect(
          document
            .querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)
            ?.getAttribute("href"),
        ).toBe(`https://www.devdigi.dev${path}`);
      });
      expect(
        document.querySelector(".beta-hero-device img")?.getAttribute("src"),
      ).toBe(inkscrollerContent[locale as "en" | "es"].media[0].src.dark);
    },
  );

  it("keeps beta route styling in the global stylesheet", () => {
    const styles = readFileSync(globalStylesPath, "utf8");
    const betaPage = readFileSync(
      resolve(process.cwd(), "src/pages/[locale]/beta/inkscroller.astro"),
      "utf8",
    );

    expect(styles).toContain(".beta-landing-shell");
    expect(styles).toContain("scroll-margin-top: 9rem");
    expect(styles).toContain(".beta-hero-layout");
    expect(betaPage).not.toContain("<style>");
  });
});
