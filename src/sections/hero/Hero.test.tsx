import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ContactLinkItem, HeroContent } from "../../content/types";
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
  it("keeps project and CV actions separate from social profile links", () => {
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

    const ctaRow = heroSection.querySelector<HTMLElement>(".hero-cta-row");

    expect(ctaRow).toBeInTheDocument();
    expect(within(ctaRow!).getAllByRole("link")).toHaveLength(4);
    expect(
      within(ctaRow!).getByRole("link", { name: "View Projects" }),
    ).toHaveClass("hero-cta-primary");
    expect(
      within(ctaRow!).getByRole("link", { name: "Download CV" }),
    ).toHaveClass("hero-cta-secondary");

    const githubLink = within(ctaRow!).getByRole("link", { name: "Code host" });
    expect(githubLink).toHaveAttribute("href", "https://github.com/example");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveClass("contact-cta-link");

    const linkedinLink = within(ctaRow!).getByRole("link", {
      name: "Professional profile",
    });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/example",
    );
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not turn non-profile contacts into hero actions", () => {
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

    expect(
      within(heroSection).queryByRole("navigation", {
        name: hero.profileLinksLabel,
      }),
    ).not.toBeInTheDocument();

    expect(
      within(heroSection).queryByRole("link", { name: "Email" }),
    ).not.toBeInTheDocument();
    expect(
      within(heroSection).queryByRole("link", { name: "Alternate email" }),
    ).not.toBeInTheDocument();
  });

  it("keeps the phone glow out of the clipped visual markup layer", () => {
    const { container } = render(<Hero hero={hero} links={[]} />);
    const heroContent = container.querySelector<HTMLElement>(".hero-content");
    const visualInner =
      container.querySelector<HTMLElement>(".hero-visual-inner");
    const phone = container.querySelector<HTMLElement>(".hero-phone");

    expect(container.querySelector(".hero-phone-glow")).not.toBeInTheDocument();
    expect(heroContent).toBeInTheDocument();
    expect(visualInner).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(heroContent).toContainElement(visualInner);
    expect(visualInner).toContainElement(phone);
  });
});
