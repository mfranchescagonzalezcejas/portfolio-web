import type { ContactLinkItem, ContactSection } from "../../content/site";
import { getContactIcon } from "./contactIcons";

type ContactLinksProps = {
  links: ContactLinkItem[];
  section: ContactSection;
};

function getContactLinkClass(link: ContactLinkItem) {
  const variant =
    link.variant === "primary"
      ? "contact-cta-link-primary cta-button"
      : "contact-cta-link-secondary cta-outline";

  return `contact-cta-link ${variant}`;
}

function getContactHeading(section: ContactSection) {
  return `${section.titlePrefix} ${section.titleHighlight}`;
}

export default function ContactLinks({ links, section }: ContactLinksProps) {
  const heading = getContactHeading(section);

  return (
    <section
      id="contact"
      className="contact-section section-shell scroll-mt-32"
      aria-labelledby="contact-title"
    >
      <div className="section-inner">
        <div className="contact-cta-card card-surface">
          <p className="contact-pill eyebrow">{section.eyebrow}</p>
          <h2
            id="contact-title"
            className="contact-title section-title"
            aria-label={heading}
          >
            {section.titlePrefix}{" "}
            <span className="text-gradient" aria-hidden="true">
              {section.titleHighlight}
            </span>
          </h2>
          <p className="hero-copy contact-copy">{section.body}</p>

          <nav id="contact-links" aria-label={section.ariaLabel}>
            <ul className="contact-link-list">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    className={getContactLinkClass(link)}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {(() => {
                      const Icon = getContactIcon(link.kind);
                      return (
                        <Icon
                          className="contact-cta-icon"
                          aria-hidden="true"
                          data-contact-icon={link.kind}
                        />
                      );
                    })()}
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
