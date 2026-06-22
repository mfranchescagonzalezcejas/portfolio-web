import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ContactLinkItem, HeroContent } from "../../content/site";
import Hero from "./Hero";

const hero: HeroContent = {
  shortName: "Mercy",
  name: "Mercedes Franchesca Gonzalez Cejas",
  greeting: "Hi, I'm",
  eyebrow: "Open to mobile roles",
  tagline: "I build polished mobile apps for real users.",
  summary: "Mobile developer focused on production-ready applications.",
  panelLabel: "Signal",
  panelTitle: "Production-ready mobile delivery",
  panelText: "Flutter, Android, iOS, and API integration.",
  profileLinksLabel: "Primary profile links",
  panelAriaLabel: "Professional focus",
  ctaLabel: "Contact me",
  cvLabel: "Download CV",
  quickCtaLabel: "View Projects",
  quickCtaHref: "#projects",
  skills: ["Flutter", "Kotlin"],
  visual: {
    ariaLabel: "Professional focus",
    readingEyebrow: "Now reading",
    readingTitle: "Clean Architecture",
    stackLabel: "Core stack",
    deliveryTitle: "Mobile delivery",
    deliverySubtitle: "Production-ready apps",
    architectureTitle: "Architecture",
    architectureSubtitle: "Maintainable code",
  },
};

describe("Hero", () => {
  it("uses contact kind metadata for social profile links and icons", () => {
    const links: ContactLinkItem[] = [
      {
        kind: "email",
        variant: "secondary",
        label: "GitHub",
        href: "mailto:test@example.com",
      },
      {
        kind: "github",
        variant: "secondary",
        label: "Code host",
        href: "https://github.com/example",
        external: true,
      },
      {
        kind: "linkedin",
        variant: "primary",
        label: "Professional profile",
        href: "https://www.linkedin.com/in/example",
        external: true,
      },
    ];

    render(<Hero hero={hero} links={links} />);

    const heroSection = screen.getByRole("region", {
      name: /hi, i'm mercedes/i,
    });

    expect(
      within(heroSection).queryByRole("link", { name: "GitHub" }),
    ).not.toBeInTheDocument();

    const githubLink = within(heroSection).getByRole("link", {
      name: "Code host",
    });
    expect(githubLink).toHaveAttribute("href", "https://github.com/example");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(
      githubLink.querySelector('svg[data-contact-icon="github"]'),
    ).toBeInTheDocument();

    const linkedinLink = within(heroSection).getByRole("link", {
      name: "Professional profile",
    });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/example",
    );
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      linkedinLink.querySelector('svg[data-contact-icon="linkedin"]'),
    ).toBeInTheDocument();
  });
});
