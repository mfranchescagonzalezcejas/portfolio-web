import type { LinkItem, ContactSection } from "../data/site";

type ContactLinksProps = {
  links: LinkItem[];
  section: ContactSection;
};

export default function ContactLinks({ links, section }: ContactLinksProps) {
  return (
    <section
      id="contact"
      className="section-shell"
      aria-labelledby="contact-title"
    >
      <div className="section-inner card-surface flex flex-col gap-8 rounded-[1.8rem] lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="contact-title" className="section-title">
            {section.title}
          </h2>
          <p className="hero-copy mt-3 max-w-2xl text-base leading-7">
            {section.body}
          </p>
        </div>

        <nav id="contact-links" aria-label={section.ariaLabel}>
          <ul className="flex flex-wrap gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  className="cta-button"
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
