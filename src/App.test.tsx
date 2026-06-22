import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import App from "./app/App";

const renderAtPath = (path: string) => {
  window.history.pushState({}, "", path);

  const descriptionMeta = document.querySelector("meta[name='description']");
  if (!descriptionMeta) {
    const createdMeta = document.createElement("meta");
    createdMeta.name = "description";
    document.head.append(createdMeta);
  }

  cleanup();
  return render(<App />);
};

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  window.history.pushState({}, "", "/");
});

describe("locale routing behavior", () => {
  it.each([
    {
      path: "/",
      lang: "en",
      tagline: "I build polished mobile apps for real users.",
      headerCta: "Contact me",
      heroPrimaryCta: "View Projects",
      footer: "Built with care in Barcelona",
      description:
        "DevDigi is my personal developer brand. Mobile Developer focused",
      titleMeta: "DevDigi | Mercedes Franchesca Gonzalez Cejas",
      languageSwitcherLabel: "Change language",
      currentLocaleName: "EN",
      nextLocaleHref: "/es",
      nextLocaleHint: "Switch to Spanish",
      skillsNavLabel: "Skills",
      educationNavLabel: "Education",
      themeToggleLabel: "Switch to light mode",
    },
    {
      path: "/en",
      lang: "en",
      tagline: "I build polished mobile apps for real users.",
      headerCta: "Contact me",
      heroPrimaryCta: "View Projects",
      footer: "Built with care in Barcelona",
      description:
        "DevDigi is my personal developer brand. Mobile Developer focused",
      titleMeta: "DevDigi | Mercedes Franchesca Gonzalez Cejas",
      languageSwitcherLabel: "Change language",
      currentLocaleName: "EN",
      nextLocaleHref: "/es",
      nextLocaleHint: "Switch to Spanish",
      skillsNavLabel: "Skills",
      educationNavLabel: "Education",
      themeToggleLabel: "Switch to light mode",
    },
    {
      path: "/es",
      lang: "es",
      tagline: "Construyo apps móviles pulidas para usuarios reales.",
      headerCta: "Contáctame",
      heroPrimaryCta: "Ver proyectos",
      footer: "Desarrollado con cariño en Barcelona",
      description:
        "DevDigi es la marca personal de Mercedes; Ingeniería móvil con foco en Flutter",
      titleMeta: "DevDigi | Mercedes Franchesca Gonzalez Cejas",
      languageSwitcherLabel: "Cambiar idioma",
      currentLocaleName: "ES",
      nextLocaleHref: "/en",
      nextLocaleHint: "Cambiar a inglés",
      skillsNavLabel: "Competencias",
      educationNavLabel: "Educación",
      themeToggleLabel: "Cambiar a modo claro",
    },
  ])(
    "renders $lang locale for $path",
    async ({
      path,
      lang,
      tagline,
      headerCta,
      heroPrimaryCta,
      footer,
      description,
      titleMeta,
      languageSwitcherLabel,
      currentLocaleName,
      nextLocaleHref,
      nextLocaleHint,
      skillsNavLabel,
      educationNavLabel,
      themeToggleLabel,
    }) => {
      renderAtPath(path);

      await waitFor(() => {
        expect(document.documentElement).toHaveAttribute("lang", lang);
      });

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        tagline,
      );
      const header = screen.getByRole("banner");
      const headerCtaLink = within(header).getByRole("link", {
        name: headerCta,
      });
      expect(headerCtaLink).toHaveAttribute("href", "#contact");

      const heroSection = document.getElementById("top");
      expect(heroSection).not.toBeNull();
      const heroPrimaryCtaLink = within(heroSection as HTMLElement).getByRole(
        "link",
        {
          name: heroPrimaryCta,
        },
      );
      expect(heroPrimaryCtaLink).toHaveAttribute("href", "#projects");

      expect(
        screen.getByText((content) => content.includes(footer)),
      ).toBeInTheDocument();
      expect(document.title).toBe(titleMeta);

      expect(
        within(header).getByRole("group", { name: languageSwitcherLabel }),
      ).toBeInTheDocument();
      const languageLink = within(header).getByRole("link", {
        name: `${currentLocaleName}. ${nextLocaleHint}`,
      });
      expect(languageLink).toHaveTextContent(currentLocaleName);
      expect(languageLink).toHaveAttribute("href", nextLocaleHref);
      expect(languageLink).toHaveAttribute("title", nextLocaleHint);

      expect(
        within(header).getByRole("link", { name: skillsNavLabel }),
      ).toHaveAttribute("href", "#skills");
      expect(
        within(header).getByRole("link", { name: educationNavLabel }),
      ).toHaveAttribute("href", "#education");
      const themeToggle = within(header).getByRole("button", {
        name: themeToggleLabel,
      });
      expect(themeToggle).toHaveAttribute("title", themeToggleLabel);

      const descriptionMeta = document.querySelector(
        "meta[name='description']",
      );
      expect(descriptionMeta).not.toBeNull();
      expect(descriptionMeta).toHaveAttribute(
        "content",
        expect.stringContaining(description),
      );
    },
  );

  it("renders the current year in the footer", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2030-06-19T12:00:00.000Z"));

    renderAtPath("/");

    expect(
      screen.getByText((content) => content.includes("© 2030")),
    ).toBeInTheDocument();
  });
});

describe("About summary behavior", () => {
  it.each([
    {
      path: "/",
      heading: /Software engineer,\s*mobile by craft\./i,
      location: "Barcelona, Spain",
      brandSnippet: /where I showcase my mobile work/i,
      badgesLabel: "Mobile stack and delivery strengths",
    },
    {
      path: "/es",
      heading: /Ingeniera de software,\s*mobile por oficio\./i,
      location: "Barcelona, España",
      brandSnippet: /donde muestro mi trabajo mobile/i,
      badgesLabel: "Stack mobile y fortalezas de entrega",
    },
  ])(
    "renders the About heading, profile card, and delivery badges for $path",
    ({ path, heading, location, brandSnippet, badgesLabel }) => {
      renderAtPath(path);

      const aboutSection = document.getElementById("about");
      expect(aboutSection).toBeInTheDocument();

      expect(
        within(aboutSection as HTMLElement).getByRole("heading", {
          level: 2,
          name: heading,
        }),
      ).toBeInTheDocument();

      expect(
        within(aboutSection as HTMLElement).getByText("MG"),
      ).toBeInTheDocument();
      expect(
        within(aboutSection as HTMLElement).getByText(
          "Mercedes F. Gonzalez Cejas",
        ),
      ).toBeInTheDocument();
      expect(
        within(aboutSection as HTMLElement).getByText(location),
      ).toBeInTheDocument();
      expect(
        within(aboutSection as HTMLElement).getByText(brandSnippet),
      ).toBeInTheDocument();

      const badges = within(aboutSection as HTMLElement).getByRole("group", {
        name: badgesLabel,
      });
      for (const badge of [
        "Flutter",
        "Kotlin",
        "Swift",
        "Clean Architecture",
        "REST APIs",
        "CI/CD",
      ]) {
        expect(within(badges).getByText(badge)).toBeInTheDocument();
      }
    },
  );
});

describe("Experience behavior", () => {
  it.each([
    {
      path: "/",
      stackLabel:
        "Technology stack for Native Apps Developer at Worldline Global Services",
      linksLabel:
        "Public links for Native Apps Developer at Worldline Global Services",
      internRole: "Native Apps Developer Intern",
      internPeriod: "Barcelona · Apr 2023 – Apr 2024",
      internStackLabel:
        "Technology stack for Native Apps Developer Intern at Worldline Global Services",
      internStackItem: "Jetpack Compose",
    },
    {
      path: "/es",
      stackLabel:
        "Tecnologías de Desarrolladora de apps nativas en Worldline Global Services",
      linksLabel:
        "Enlaces públicos de Desarrolladora de apps nativas en Worldline Global Services",
      internRole: "Becaria Native Apps Developer",
      internPeriod: "Barcelona · Abr 2023 – Abr 2024",
      internStackLabel:
        "Tecnologías de Becaria Native Apps Developer en Worldline Global Services",
      internStackItem: "Jetpack Compose",
    },
  ])(
    "renders localized labels and timeline content for $path",
    ({
      path,
      stackLabel,
      linksLabel,
      internRole,
      internPeriod,
      internStackLabel,
      internStackItem,
    }) => {
      renderAtPath(path);

      const experienceSection = document.getElementById("experience");
      expect(experienceSection).toBeInTheDocument();

      expect(
        within(experienceSection as HTMLElement).getByRole("list", {
          name: stackLabel,
        }),
      ).toBeInTheDocument();
      expect(
        within(experienceSection as HTMLElement).getByRole("list", {
          name: linksLabel,
        }),
      ).toBeInTheDocument();
      expect(
        within(experienceSection as HTMLElement).getByText(internRole),
      ).toBeInTheDocument();
      expect(
        within(experienceSection as HTMLElement).getByText(internPeriod),
      ).toBeInTheDocument();
      const internStack = within(experienceSection as HTMLElement).getByRole(
        "list",
        { name: internStackLabel },
      );
      expect(
        within(internStack).getByText(internStackItem),
      ).toBeInTheDocument();
    },
  );
});

describe("navigation anchors", () => {
  it("uses a non-navigation group for the language switcher", () => {
    renderAtPath("/");

    expect(
      screen.getByRole("group", { name: "Change language" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("navigation", { name: "Primary" })).toHaveLength(
      1,
    );
  });

  it("includes a valid Skills anchor and target section", () => {
    renderAtPath("/");

    const skillsLink = screen.getByRole("link", { name: "Skills" });
    expect(skillsLink).toHaveAttribute("href", "#skills");

    const skillsSection = document.getElementById("skills");
    expect(skillsSection).toBeInTheDocument();
    expect(
      within(skillsSection as HTMLElement).getByRole("heading", {
        name: /Technical toolbox/i,
      }),
    ).toBeInTheDocument();

    expect(skillsSection).toHaveClass("scroll-mt-32");
  });

  it.each([
    {
      path: "/",
      heading: "Technical toolbox",
      category: "Mobile",
      groupLabel: "Skills in Mobile",
      architecture: "Architecture",
      architectureSkill: "Repository Pattern",
      delivery: "Delivery & Quality",
      deliverySkill: "GitHub Actions",
      omittedSkill: "Remote collaboration",
    },
    {
      path: "/es",
      heading: "Caja de herramientas técnicas",
      category: "Mobile",
      groupLabel: "Competencias en Mobile",
      architecture: "Arquitectura",
      architectureSkill: "Patrón Repository",
      delivery: "Entrega y calidad",
      deliverySkill: "Validación QA",
      omittedSkill: "Colaboración remota",
    },
  ])(
    "renders localized Skills category cards for $path",
    ({
      path,
      heading,
      category,
      groupLabel,
      architecture,
      architectureSkill,
      delivery,
      deliverySkill,
      omittedSkill,
    }) => {
      renderAtPath(path);

      const skillsSection = document.getElementById("skills");
      expect(skillsSection).toBeInTheDocument();
      expect(
        within(skillsSection as HTMLElement).getByRole("heading", {
          level: 2,
          name: heading,
        }),
      ).toBeInTheDocument();

      const cards = within(skillsSection as HTMLElement).getAllByRole(
        "article",
      );
      expect(cards).toHaveLength(5);
      expect(
        within(skillsSection as HTMLElement).getByRole("heading", {
          level: 3,
          name: category,
        }),
      ).toBeInTheDocument();
      expect(
        within(skillsSection as HTMLElement).getByRole("list", {
          name: groupLabel,
        }),
      ).toHaveTextContent("Flutter");
      expect(
        within(skillsSection as HTMLElement).getByRole("heading", {
          level: 3,
          name: architecture,
        }),
      ).toBeInTheDocument();
      expect(skillsSection as HTMLElement).toHaveTextContent(architectureSkill);
      expect(
        within(skillsSection as HTMLElement).getByRole("heading", {
          level: 3,
          name: delivery,
        }),
      ).toBeInTheDocument();
      expect(skillsSection as HTMLElement).toHaveTextContent(deliverySkill);
      expect(skillsSection as HTMLElement).not.toHaveTextContent(omittedSkill);
    },
  );

  it("keeps the Projects anchor on the projects grid after the featured showcase", () => {
    renderAtPath("/");

    const featuredSection = document.getElementById("featured");
    const projectsSection = document.getElementById("projects");

    expect(featuredSection).toBeInTheDocument();
    expect(projectsSection).toBeInTheDocument();
    expect(
      featuredSection?.compareDocumentPosition(projectsSection as Node),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);

    const header = screen.getByRole("banner");
    expect(
      within(header).getByRole("link", { name: "Projects" }),
    ).toHaveAttribute("href", "#projects");
    expect(
      within(projectsSection as HTMLElement).getByRole("heading", {
        name: /Selected work/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(projectsSection as HTMLElement).queryByRole("heading", {
        name: "Inkscroller Frontend",
      }),
    ).toBeInTheDocument();
  });

  it("renders the richer featured project showcase with real repository links", () => {
    renderAtPath("/");

    const featuredSection = document.getElementById("featured");
    expect(featuredSection).toBeInTheDocument();
    expect(
      within(featuredSection as HTMLElement).getByText(
        "Full-stack manga reader app",
      ),
    ).toBeInTheDocument();
    expect(
      within(featuredSection as HTMLElement).getByRole("list", {
        name: "Inkscroller technology stack",
      }),
    ).toHaveTextContent("Firebase Auth");

    for (const { accessibleName, href } of [
      {
        accessibleName: "Frontend repo for Inkscroller",
        href: "https://github.com/mfranchescagonzalezcejas/inkscroller_frontend",
      },
      {
        accessibleName: "Backend repo for Inkscroller",
        href: "https://github.com/mfranchescagonzalezcejas/Inkscroller_backend",
      },
    ]) {
      const repositoryLink = within(featuredSection as HTMLElement).getByRole(
        "link",
        { name: accessibleName },
      );
      expect(repositoryLink).toHaveAttribute("href", href);
      expect(repositoryLink).toHaveAttribute("target", "_blank");
      expect(repositoryLink.getAttribute("rel")?.split(/\s+/)).toEqual(
        expect.arrayContaining(["noopener", "noreferrer"]),
      );
    }

    expect(
      within(featuredSection as HTMLElement).queryByRole("link", {
        name: "Case study for Inkscroller",
      }),
    ).not.toBeInTheDocument();

    expect(
      within(featuredSection as HTMLElement).queryByRole("link", {
        name: /https:\/\/github.com\//i,
      }),
    ).not.toBeInTheDocument();
  });

  it("renders truthful project titles with real repository links", () => {
    renderAtPath("/");

    const projectsSection = document.getElementById("projects");
    expect(projectsSection).toBeInTheDocument();

    for (const { name, href } of [
      {
        name: "Inkscroller Frontend",
        href: "https://github.com/mfranchescagonzalezcejas/inkscroller_frontend",
      },
      {
        name: "Inkscroller Backend",
        href: "https://github.com/mfranchescagonzalezcejas/Inkscroller_backend",
      },
      {
        name: "DevDigi Portfolio Web",
        href: "https://github.com/mfranchescagonzalezcejas/portfolio-web",
      },
      {
        name: "AppSwiftUI",
        href: "https://github.com/mfranchescagonzalezcejas/AppSwiftUI",
      },
      {
        name: "AppUIKit",
        href: "https://github.com/mfranchescagonzalezcejas/AppUIKit",
      },
      {
        name: "AppAndroid",
        href: "https://github.com/mfranchescagonzalezcejas/AppAndroid",
      },
    ]) {
      expect(
        within(projectsSection as HTMLElement).getByRole("heading", { name }),
      ).toBeInTheDocument();

      const repositoryLink = within(projectsSection as HTMLElement).getByRole(
        "link",
        { name: `View repo: Repository for ${name}` },
      );
      expect(repositoryLink).toHaveAttribute("href", href);
      expect(repositoryLink).toHaveAttribute("target", "_blank");
      expect(repositoryLink.getAttribute("rel")?.split(/\s+/)).toEqual(
        expect.arrayContaining(["noopener", "noreferrer"]),
      );
    }

    expect(projectsSection as HTMLElement).not.toHaveTextContent(
      "Expense Tracker",
    );
    expect(projectsSection as HTMLElement).not.toHaveTextContent("storyboards");
  });

  it("renders compact English professional case studies with verified public links", () => {
    renderAtPath("/");

    const caseStudiesSection = document.getElementById("case-studies");
    expect(caseStudiesSection).toBeInTheDocument();
    expect(
      within(caseStudiesSection as HTMLElement).getByRole("heading", {
        name: "Selected case studies",
        level: 2,
      }),
    ).toBeInTheDocument();

    for (const title of [
      "La Mercè production release",
      "Barcelona a la Butxaca air quality",
      "Nescafé Dolce Gusto QA validation",
    ]) {
      expect(
        within(caseStudiesSection as HTMLElement).getByRole("heading", {
          name: title,
        }),
      ).toBeInTheDocument();
    }

    expect(
      within(caseStudiesSection as HTMLElement).queryByRole("heading", {
        name: "Inkscroller architecture",
      }),
    ).not.toBeInTheDocument();
    expect(
      within(caseStudiesSection as HTMLElement).getAllByRole("article"),
    ).toHaveLength(3);

    expect(caseStudiesSection as HTMLElement).toHaveTextContent(
      "Professional work shown with public app references only",
    );
    expect(caseStudiesSection as HTMLElement).toHaveTextContent("Context");
    expect(caseStudiesSection as HTMLElement).toHaveTextContent("My role");
    expect(caseStudiesSection as HTMLElement).toHaveTextContent("Stack");
    expect(caseStudiesSection as HTMLElement).toHaveTextContent("Demonstrates");
    expect(caseStudiesSection as HTMLElement).toHaveTextContent(
      "release validation",
    );
    expect(caseStudiesSection as HTMLElement).toHaveTextContent(
      "air quality feature",
    );
    expect(caseStudiesSection as HTMLElement).toHaveTextContent(
      "reconnection and brew flow validation",
    );

    for (const { name, href } of [
      {
        name: "La Mercè on Google Play",
        href: "https://play.google.com/store/apps/details?id=cat.bcn.festamerce&pcampaignid=web_share",
      },
      {
        name: "Barcelona a la Butxaca on Google Play",
        href: "https://play.google.com/store/apps/details?id=cat.bcn.butxaca&pcampaignid=web_share",
      },
      {
        name: "Nescafé Dolce Gusto on Google Play",
        href: "https://play.google.com/store/apps/details?id=com.nestle.nescafe.dolcegusto&pcampaignid=web_share",
      },
    ]) {
      const publicLink = within(caseStudiesSection as HTMLElement)
        .getAllByRole("link", { name })
        .find((link) => link.getAttribute("href") === href);

      expect(publicLink).toBeDefined();
      expect(publicLink).toHaveAttribute("target", "_blank");
      expect(publicLink?.getAttribute("rel")?.split(/\s+/)).toEqual(
        expect.arrayContaining(["noopener", "noreferrer"]),
      );
    }
  });

  it("hydrates Spanish Projects and Featured labels without mixed English a11y copy", () => {
    renderAtPath("/es");

    const featuredSection = document.getElementById("featured");
    const projectsSection = document.getElementById("projects");
    expect(featuredSection).toBeInTheDocument();
    expect(projectsSection).toBeInTheDocument();

    expect(
      within(featuredSection as HTMLElement).getByRole("list", {
        name: "Tecnologías de Inkscroller",
      }),
    ).toHaveTextContent("Firebase Auth");
    expect(
      within(featuredSection as HTMLElement).getByRole("link", {
        name: "Repo frontend de Inkscroller",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/mfranchescagonzalezcejas/inkscroller_frontend",
    );
    expect(
      within(featuredSection as HTMLElement).getByRole("link", {
        name: "Repo backend de Inkscroller",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/mfranchescagonzalezcejas/Inkscroller_backend",
    );
    expect(
      within(featuredSection as HTMLElement).queryByRole("link", {
        name: "Caso de estudio de Inkscroller",
      }),
    ).not.toBeInTheDocument();
    expect(featuredSection as HTMLElement).toHaveTextContent(
      "Captura próximamente",
    );

    expect(
      within(projectsSection as HTMLElement).getByRole("list", {
        name: "Tecnologías de AppAndroid",
      }),
    ).toHaveTextContent("Jetpack Compose");
    expect(
      within(projectsSection as HTMLElement).getByRole("link", {
        name: "Ver repo: Repositorio de AppAndroid",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/mfranchescagonzalezcejas/AppAndroid",
    );
    expect(
      within(projectsSection as HTMLElement).getByRole("heading", {
        name: "Web Portfolio DevDigi",
      }),
    ).toBeInTheDocument();
    expect(
      within(projectsSection as HTMLElement).getByRole("link", {
        name: "Ver repo: Repositorio de Web Portfolio DevDigi",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/mfranchescagonzalezcejas/portfolio-web",
    );
    expect(projectsSection as HTMLElement).toHaveTextContent(
      "Capturas de la app próximamente",
    );

    expect(
      within(featuredSection as HTMLElement).queryByRole("list", {
        name: /technology stack/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      within(projectsSection as HTMLElement).queryByRole("link", {
        name: / for /i,
      }),
    ).not.toBeInTheDocument();
    expect(featuredSection as HTMLElement).not.toHaveTextContent(
      "Screenshot coming soon",
    );
    expect(projectsSection as HTMLElement).not.toHaveTextContent(
      "App screenshots coming soon",
    );
  });

  it("renders compact Spanish professional case studies without mixed English public link labels", () => {
    renderAtPath("/es");

    const caseStudiesSection = document.getElementById("case-studies");
    expect(caseStudiesSection).toBeInTheDocument();
    expect(
      within(caseStudiesSection as HTMLElement).getByRole("heading", {
        name: "Casos de estudio seleccionados",
        level: 2,
      }),
    ).toBeInTheDocument();

    for (const title of [
      "Release en producción de La Mercè",
      "Barcelona a la Butxaca calidad del aire",
      "Nescafé Dolce Gusto validación QA",
    ]) {
      expect(
        within(caseStudiesSection as HTMLElement).getByRole("heading", {
          name: title,
        }),
      ).toBeInTheDocument();
    }

    expect(
      within(caseStudiesSection as HTMLElement).queryByRole("heading", {
        name: "Arquitectura de Inkscroller",
      }),
    ).not.toBeInTheDocument();
    expect(
      within(caseStudiesSection as HTMLElement).getAllByRole("article"),
    ).toHaveLength(3);

    expect(caseStudiesSection as HTMLElement).toHaveTextContent(
      "Trabajo profesional mostrado solo con referencias públicas",
    );
    expect(caseStudiesSection as HTMLElement).toHaveTextContent("Contexto");
    expect(caseStudiesSection as HTMLElement).toHaveTextContent("Mi rol");
    expect(caseStudiesSection as HTMLElement).toHaveTextContent("Stack");
    expect(caseStudiesSection as HTMLElement).toHaveTextContent("Demuestra");
    expect(caseStudiesSection as HTMLElement).toHaveTextContent(
      "validación de release",
    );
    expect(caseStudiesSection as HTMLElement).toHaveTextContent(
      "calidad del aire",
    );
    expect(caseStudiesSection as HTMLElement).toHaveTextContent(
      "validación de flujos de reconexión y preparación",
    );

    expect(
      within(caseStudiesSection as HTMLElement).getByRole("link", {
        name: "La Mercè en Google Play",
      }),
    ).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=cat.bcn.festamerce&pcampaignid=web_share",
    );
    expect(
      within(caseStudiesSection as HTMLElement).getByRole("link", {
        name: "Barcelona a la Butxaca en Google Play",
      }),
    ).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=cat.bcn.butxaca&pcampaignid=web_share",
    );
    expect(
      within(caseStudiesSection as HTMLElement).getByRole("link", {
        name: "Nescafé Dolce Gusto en Google Play",
      }),
    ).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.nestle.nescafe.dolcegusto&pcampaignid=web_share",
    );
    expect(
      within(caseStudiesSection as HTMLElement).queryByRole("link", {
        name: "View on Google Play",
      }),
    ).not.toBeInTheDocument();
  });

  it("keeps the hydrated Values section available as a deep-link target", () => {
    renderAtPath("/");

    const valuesSection = document.getElementById("values");
    expect(valuesSection).toBeInTheDocument();
    expect(
      within(valuesSection as HTMLElement).getByRole("heading", {
        name: /What I bring as a mobile developer/i,
      }),
    ).toBeInTheDocument();
  });

  it("localizes Spanish skills navigation and theme toggle labels", () => {
    renderAtPath("/es");

    const header = screen.getByRole("banner");
    expect(
      within(header).getByRole("link", { name: "Competencias" }),
    ).toHaveAttribute("href", "#skills");
    expect(
      within(header).queryByRole("link", { name: "Skills" }),
    ).not.toBeInTheDocument();

    const themeToggle = within(header).getByRole("button", {
      name: "Cambiar a modo claro",
    });
    expect(themeToggle).toHaveAttribute("title", "Cambiar a modo claro");
    expect(themeToggle).not.toHaveAttribute(
      "aria-label",
      "Switch to light mode",
    );
    expect(themeToggle).not.toHaveAttribute("title", "Switch to light mode");
  });

  it("uses a valid heading id for the Contact section", () => {
    renderAtPath("/");

    const contactSection = document.getElementById("contact");
    expect(contactSection).toHaveAttribute("aria-labelledby", "contact-title");
    expect(document.getElementById("contact-title")).not.toBeNull();
  });

  it.each([
    {
      path: "/",
      educationHeading: "Education and languages",
      educationCard: "Education",
      educationItem: "Telecommunications Engineering",
      masterItem: "Master's in AI Development",
      languageCard: "Languages",
      languageLabel: "Language proficiency",
      nativeLanguage: "Spanish",
      nativeLevel: "Native",
      contactHeading: "Let’s build great mobile products.",
      contactBody:
        /Available for Mobile Developer, Flutter Developer, and Android Developer/i,
      cvLabel: "Download CV",
      footerText: "Built with care in Barcelona",
    },
    {
      path: "/es",
      educationHeading: "Formación e idiomas",
      educationCard: "Formación",
      educationItem: "Ingeniería de Telecomunicaciones",
      masterItem: "Máster en Desarrollo de IA",
      languageCard: "Idiomas",
      languageLabel: "Nivel de idiomas",
      nativeLanguage: "Español",
      nativeLevel: "Nativo",
      contactHeading: "Construyamos grandes productos móviles.",
      contactBody:
        /Disponible para oportunidades de Mobile Developer, Flutter Developer y Android Developer/i,
      cvLabel: "Descargar CV",
      footerText: "Desarrollado con cariño en Barcelona",
    },
  ])(
    "renders localized Education/Languages, Contact CTA, and Footer for $path",
    ({
      path,
      educationHeading,
      educationCard,
      educationItem,
      masterItem,
      languageCard,
      languageLabel,
      nativeLanguage,
      nativeLevel,
      contactHeading,
      contactBody,
      cvLabel,
      footerText,
    }) => {
      renderAtPath(path);

      const educationSection = document.getElementById("education");
      expect(educationSection).toBeInTheDocument();
      expect(
        within(educationSection as HTMLElement).getByRole("heading", {
          level: 2,
          name: educationHeading,
        }),
      ).toBeInTheDocument();
      expect(
        within(educationSection as HTMLElement).getByRole("heading", {
          level: 3,
          name: educationCard,
        }),
      ).toBeInTheDocument();
      expect(educationSection as HTMLElement).toHaveTextContent(educationItem);
      expect(educationSection as HTMLElement).toHaveTextContent(masterItem);
      expect(
        within(educationSection as HTMLElement).getByRole("heading", {
          level: 3,
          name: languageCard,
        }),
      ).toBeInTheDocument();
      const languageList = within(
        educationSection as HTMLElement,
      ).getByLabelText(languageLabel);
      expect(languageList).toHaveTextContent(nativeLanguage);
      expect(languageList).toHaveTextContent(nativeLevel);

      const contactSection = document.getElementById("contact");
      expect(contactSection).toBeInTheDocument();
      expect(
        within(contactSection as HTMLElement).getByRole("heading", {
          level: 2,
          name: contactHeading,
        }),
      ).toBeInTheDocument();
      expect(contactSection as HTMLElement).toHaveTextContent(contactBody);
      expect(
        within(contactSection as HTMLElement).getByRole("link", {
          name: cvLabel,
        }),
      ).toHaveAttribute("href", "/cv.pdf");

      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveTextContent("DevDigi by Mercedes Gonzalez");
      expect(footer).toHaveTextContent(footerText);
    },
  );

  it("renders safe Contact CTA links for external, CV, and email targets", () => {
    renderAtPath("/");

    const contactSection = document.getElementById("contact");
    expect(contactSection).toBeInTheDocument();

    const linkedInLink = within(contactSection as HTMLElement).getByRole(
      "link",
      { name: "LinkedIn" },
    );
    expect(linkedInLink).toHaveAttribute("target", "_blank");
    expect(linkedInLink.getAttribute("rel")?.split(/\s+/)).toEqual(
      expect.arrayContaining(["noopener", "noreferrer"]),
    );

    const githubLink = within(contactSection as HTMLElement).getByRole("link", {
      name: "GitHub",
    });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/mfranchescagonzalezcejas",
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink.getAttribute("rel")?.split(/\s+/)).toEqual(
      expect.arrayContaining(["noopener", "noreferrer"]),
    );

    const cvLink = within(contactSection as HTMLElement).getByRole("link", {
      name: "Download CV",
    });
    expect(cvLink).toHaveAttribute("href", "/cv.pdf");
    expect(cvLink).not.toHaveAttribute("target");
    expect(cvLink).not.toHaveAttribute("rel");

    const emailLink = within(contactSection as HTMLElement).getByRole("link", {
      name: "Email",
    });
    expect(emailLink).toHaveAttribute("href", "mailto:mercedesgon03@gmail.com");
    expect(emailLink).not.toHaveAttribute("target");
    expect(emailLink).not.toHaveAttribute("rel");
  });

  it("protects external links opened in new tabs", () => {
    renderAtPath("/");

    const externalLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("target") === "_blank");

    expect(externalLinks.length).toBeGreaterThan(0);
    externalLinks.forEach((link) => {
      expect(link.getAttribute("rel")?.split(/\s+/)).toEqual(
        expect.arrayContaining(["noopener", "noreferrer"]),
      );
    });
  });
});
