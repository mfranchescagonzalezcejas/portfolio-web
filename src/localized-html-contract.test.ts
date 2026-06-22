import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";

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
};

const productionSiteUrl = "https://devdigi.dev";

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
  skillsHeading: string;
  skillCategories: string[];
  skillItems: string[];
  omittedSkills: string[];
  footerText: string;
  footerYearText: string;
  navLabel: string;
  skillsNavLabel: string;
  educationHeading: string;
  educationCard: string;
  languagesCard: string;
  languageItems: [string, string][];
  contactHeading: string;
  cvLabel: string;
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
      "• Featured project",
      "Inkscroller",
      "Selected work",
      "• Skills",
      "Technical toolbox",
      "• Education and languages",
      "Education and languages",
      "Let’s build great mobile products.",
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
    portfolioItems: [
      "Inkscroller Frontend",
      "Inkscroller Backend",
      "AppSwiftUI",
      "AppUIKit",
      "AppAndroid",
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
    footerYearText: "© 2026 · Built with care in Barcelona",
    navLabel: "Primary navigation",
    skillsNavLabel: "Skills",
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
      "• Proyecto destacado",
      "Inkscroller",
      "Trabajos seleccionados",
      "• Competencias",
      "Caja de herramientas técnicas",
      "• Formación e idiomas",
      "Formación e idiomas",
      "Construyamos grandes productos móviles.",
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
    portfolioItems: [
      "Inkscroller Frontend",
      "Inkscroller Backend",
      "AppSwiftUI",
      "AppUIKit",
      "AppAndroid",
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
    footerYearText: "© 2026 · Desarrollado con cariño en Barcelona",
    navLabel: "Navegación principal",
    skillsNavLabel: "Competencias",
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

  for (const experience of siteContentByLocale[locale].experience) {
    expect(bodyText).toContain(`${experience.company} — ${experience.role}`);
    expect(bodyText).toContain(experience.period);
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
        "Dropped 3 invalid configured link(s) from en site content before render.",
      );
    } finally {
      warn.mockRestore();
    }
  });
});
