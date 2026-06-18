import { afterEach, describe, expect, it } from "vitest";
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
  window.history.pushState({}, "", "/");
});

describe("locale routing behavior", () => {
  it.each([
    {
      path: "/",
      lang: "en",
      tagline: "I build polished mobile apps for real users.",
      cta: "Contact me",
      footer: "Built with care in Barcelona",
      description:
        "DevDigi is my personal developer brand. Mobile Developer focused",
      titleMeta: "DevDigi | Mercedes Franchesca Gonzalez Cejas",
    },
    {
      path: "/en",
      lang: "en",
      tagline: "I build polished mobile apps for real users.",
      cta: "Contact me",
      footer: "Built with care in Barcelona",
      description:
        "DevDigi is my personal developer brand. Mobile Developer focused",
      titleMeta: "DevDigi | Mercedes Franchesca Gonzalez Cejas",
    },
    {
      path: "/es",
      lang: "es",
      tagline:
        "Diseño y desarrollo apps móviles de calidad para usuarios reales.",
      cta: "Contáctame",
      footer: "Desarrollado con cariño en Barcelona",
      description:
        "DevDigi es la marca personal de Mercedes; Ingeniería móvil con foco en Flutter",
      titleMeta: "DevDigi | Mercedes Franchesca Gonzalez Cejas",
    },
  ])(
    "renders $lang locale for $path",
    async ({ path, lang, tagline, cta, footer, description, titleMeta }) => {
      renderAtPath(path);

      await waitFor(() => {
        expect(document.documentElement).toHaveAttribute("lang", lang);
      });

      expect(screen.getByText(tagline)).toBeInTheDocument();
      const ctaLink = screen.getByRole("link", { name: cta });
      expect(ctaLink).toHaveAttribute("href", "#contact");
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
});

describe("navigation anchors", () => {
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
  });

  it("uses a valid heading id for the Contact section", () => {
    renderAtPath("/");

    const contactSection = document.getElementById("contact");
    expect(contactSection).toHaveAttribute("aria-labelledby", "contact-title");
    expect(document.getElementById("contact-title")).not.toBeNull();
  });
});
