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
        name: /Tools and engineering stack/i,
      }),
    ).toBeInTheDocument();

    expect(skillsSection).toHaveClass("scroll-mt-32");
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
