import type { LinkItem, ContactSection } from "../data/site";

type ContactLinksProps = {
  links: LinkItem[];
  section: ContactSection;
};

const linkStyles = [
  "bg-[#14B8A6] text-[#042F2E] hover:bg-teal-300",
  "border border-[#38BDF8] bg-[#082F49] text-[#BAE6FD] hover:bg-sky-900",
  "border border-[#2DD4BF] bg-[#0F172A] text-[#CCFBF1] hover:bg-slate-800",
];

export default function ContactLinks({ links, section }: ContactLinksProps) {
  return (
    <section
      id="contact"
      className="px-6 pt-16 pb-12 lg:px-8"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-[#134E4A] bg-[#0B1B2A] p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-extrabold tracking-[0.32em] text-teal-300 uppercase">
            {section.eyebrow}
          </p>
          <h2
            id="contact-title"
            className="mt-4 text-3xl font-extrabold text-white"
          >
            {section.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#B6E7E1]">
            {section.body}
          </p>
        </div>

        <nav id="contact-links" aria-label={section.ariaLabel}>
          <ul className="flex flex-wrap gap-3">
            {links.map((link, index) => (
              <li key={link.href}>
                <a
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-extrabold transition ${linkStyles[index % linkStyles.length]}`}
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
