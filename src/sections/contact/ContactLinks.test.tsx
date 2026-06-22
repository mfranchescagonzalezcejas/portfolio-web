import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ContactLinks from "./ContactLinks";
import type { ContactLinkItem, ContactSection } from "../../content/site";

const section: ContactSection = {
  eyebrow: "Contact",
  titlePrefix: "Let’s build",
  titleHighlight: "together",
  body: "Choose the best channel.",
  ariaLabel: "Contact links",
};

describe("ContactLinks", () => {
  it("derives the full accessible heading from explicit title parts", () => {
    render(
      <ContactLinks
        links={[]}
        section={{
          ...section,
          titlePrefix: "Construyamos grandes",
          titleHighlight: "productos móviles.",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Construyamos grandes productos móviles.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("productos móviles.")).toHaveClass("text-gradient");
  });

  it("uses explicit contact metadata for presentation instead of label text", () => {
    const links: ContactLinkItem[] = [
      {
        kind: "linkedin",
        variant: "primary",
        label: "Professional network",
        href: "https://www.linkedin.com/in/example",
        external: true,
      },
      {
        kind: "email",
        variant: "secondary",
        label: "Correo",
        href: "mailto:test@example.com",
        external: false,
      },
      {
        kind: "github",
        variant: "secondary",
        label: "Code host",
        href: "https://github.com/example",
        external: true,
      },
      {
        kind: "cv",
        variant: "secondary",
        label: "Resume",
        href: "/cv.pdf",
      },
    ];

    render(<ContactLinks links={links} section={section} />);

    const primaryLink = screen.getByRole("link", {
      name: "Professional network",
    });
    expect(primaryLink).toHaveClass("contact-cta-link-primary", "cta-button");
    expect(
      primaryLink.querySelector('svg[data-contact-icon="linkedin"]'),
    ).toBeInTheDocument();

    const emailLink = screen.getByRole("link", { name: "Correo" });
    expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
    expect(emailLink).toHaveClass("contact-cta-link-secondary", "cta-outline");
    expect(within(emailLink).getByText("Correo")).toBeInTheDocument();
    expect(
      emailLink.querySelector('svg[data-contact-icon="email"]'),
    ).toBeInTheDocument();

    const githubLink = screen.getByRole("link", { name: "Code host" });
    expect(
      githubLink.querySelector('svg[data-contact-icon="github"]'),
    ).toBeInTheDocument();

    const cvLink = screen.getByRole("link", { name: "Resume" });
    expect(
      cvLink.querySelector('svg[data-contact-icon="cv"]'),
    ).toBeInTheDocument();
  });
});
