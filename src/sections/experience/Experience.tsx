import { ArrowUpRight, Briefcase } from "lucide-react";
import type {
  Experience as ExperienceContent,
  ExperienceSectionHeading,
} from "../../content/site";

type ExperienceProps = {
  experience: ExperienceContent[];
  section: ExperienceSectionHeading;
};

const labelForExperience = (label: string, item: ExperienceContent) =>
  label.replaceAll("{company}", item.company).replaceAll("{role}", item.role);

export default function Experience({ experience, section }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="section-shell scroll-mt-32"
      aria-labelledby="experience-title"
    >
      <div className="section-inner">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="experience-title" className="section-title mx-auto max-w-2xl">
            <span className="text-gradient">{section.title}</span>
          </h2>
        </div>

        <div className="relative">
          <div
            className="absolute top-2 bottom-2 left-4 w-px -translate-x-1/2 bg-gradient-to-b from-[color:var(--primary)]/40 via-[color:var(--overlay-border)] to-transparent sm:left-6"
            aria-hidden="true"
          />

          <div className="space-y-6">
            {experience.map((item) => (
              <div
                key={`${item.company}-${item.role}-${item.period}`}
                className="relative pl-12 sm:pl-16"
              >
                <div
                  className="absolute top-6 left-1.5 grid h-5 w-5 place-items-center rounded-full bg-(--background) ring-2 ring-[color:var(--primary)]/60 sm:left-3.5"
                  aria-hidden="true"
                >
                  <Briefcase className="h-2.5 w-2.5 text-[color:var(--primary)]" />
                </div>

                <article className="card-surface rounded-[1.65rem] p-6 sm:p-8">
                  <div className="flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="font-display truncate text-lg font-semibold">
                        {item.company}
                      </h3>
                      <p className="text-sm text-[color:var(--primary)]">
                        {item.role}
                      </p>
                    </div>

                    <span className="experience-period-badge max-w-full rounded-full border border-[color:var(--overlay-border)] bg-[color:var(--overlay-bg)] px-2.5 py-0.5 font-mono text-xs break-words whitespace-normal text-[color:var(--muted-foreground)] sm:shrink-0 sm:whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>

                  <ul className="hero-copy mt-6 space-y-3 text-sm leading-7">
                    {item.highlights.map((highlight) => (
                      <li className="flex gap-2.5" key={highlight}>
                        <span
                          className="mt-3 h-1 w-1 shrink-0 rounded-full bg-[color:var(--primary)]/70"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <ul
                    className="mt-4 flex flex-wrap gap-1.5"
                    aria-label={labelForExperience(section.stackLabel, item)}
                  >
                    {item.stack.map((stackItem) => (
                      <li
                        className="inline-flex items-center rounded-full border border-[color:var(--primary)]/20 bg-[color:var(--primary)]/[0.08] px-2.5 py-0.5 font-mono text-xs font-medium text-[color:var(--primary)]"
                        key={stackItem}
                      >
                        {stackItem}
                      </li>
                    ))}
                  </ul>

                  {item.links && item.links.length > 0 && (
                    <ul
                      className="mt-4 flex flex-wrap gap-2"
                      aria-label={labelForExperience(section.linksLabel, item)}
                    >
                      {item.links.map((link) => (
                        <li key={link.href}>
                          <a
                            className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--overlay-border)] bg-[color:var(--overlay-bg)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--overlay-bg-hover)] focus-visible:bg-[color:var(--overlay-bg-hover)]"
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            rel={
                              link.external ? "noopener noreferrer" : undefined
                            }
                          >
                            <ArrowUpRight
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
