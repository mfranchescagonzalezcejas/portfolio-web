import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import App from "./App";

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
