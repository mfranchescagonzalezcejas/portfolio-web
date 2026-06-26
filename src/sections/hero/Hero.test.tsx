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

  it("falls back to non-CV links when no social profile links are present", () => {
    const links: ContactLinkItem[] = [
      {
        kind: "email",
        variant: "secondary",
        label: "Email",
        href: "mailto:test@example.com",
      },
      {
        kind: "cv",
        variant: "secondary",
        label: "Download CV",
        href: "/cv.pdf",
      },
      {
        kind: "email",
        variant: "secondary",
        label: "Alternate email",
        href: "mailto:alternate@example.com",
      },
    ];

    render(<Hero hero={hero} links={links} />);

    const heroSection = screen.getByRole("region", {
      name: /hi, i'm mercedes/i,
    });

    const emailLink = within(heroSection).getByRole("link", { name: "Email" });
    expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
    expect(
      emailLink.querySelector('svg[data-contact-icon="email"]'),
    ).toBeInTheDocument();

    const cvLinks = within(heroSection).getAllByRole("link", {
      name: "Download CV",
    });
    expect(cvLinks).toHaveLength(1);
    expect(cvLinks[0]).toHaveAttribute("href", "/cv.pdf");

    expect(
      within(heroSection).getByRole("link", { name: "Alternate email" }),
    ).toHaveAttribute("href", "mailto:alternate@example.com");
  });

  it("keeps the phone glow out of the clipped visual markup layer", () => {
    const { container } = render(<Hero hero={hero} links={[]} />);
    const visualInner =
      container.querySelector<HTMLElement>(".hero-visual-inner");
    const phone = container.querySelector<HTMLElement>(".hero-phone");

    expect(container.querySelector(".hero-phone-glow")).not.toBeInTheDocument();
    expect(visualInner).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(visualInner).toContainElement(phone);
  });
});
