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
  label.replace("{company}", item.company).replace("{role}", item.role);

export default function Experience({ experience, section }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="section-shell scroll-mt-32"
      aria-labelledby="experience-title"
    >
      <div className="section-inner">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/[0.06] px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.18em] text-teal-300 uppercase">
            <span
              className="h-1 w-1 rounded-full bg-teal-300"
              aria-hidden="true"
            />
            {section.eyebrow}
          </p>
          <h2
            id="experience-title"
            className="section-title text-gradient mx-auto max-w-full sm:whitespace-nowrap"
          >
            {section.title}
          </h2>
        </div>

        <div className="relative mt-10">
          <div
            className="absolute top-2 bottom-2 left-4 w-px bg-gradient-to-b from-teal-300/40 via-white/10 to-transparent sm:left-6"
            aria-hidden="true"
          />

          <div className="space-y-6">
            {experience.map((item) => (
              <div
                key={`${item.company}-${item.role}-${item.period}`}
                className="relative pl-12 sm:pl-16"
              >
                <div
                  className="absolute top-6 left-1.5 grid h-5 w-5 place-items-center rounded-full bg-(--background) ring-2 ring-teal-300/60 sm:left-3.5"
                  aria-hidden="true"
                >
                  <Briefcase className="h-2.5 w-2.5 text-teal-300" />
                </div>

                <article className="card-surface rounded-[1.65rem] p-6 sm:p-8">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="font-display truncate text-lg font-semibold">
                        {item.company}
                      </h3>
                      <p className="text-sm font-semibold text-teal-300">
                        {item.role}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] text-[color:var(--muted-foreground)]">
                      {item.period}
                    </span>
                  </div>

                  <ul className="hero-copy mt-6 space-y-3 text-sm leading-7">
                    {item.highlights.map((highlight) => (
                      <li className="flex gap-2.5" key={highlight}>
                        <span
                          className="mt-3 h-1 w-1 shrink-0 rounded-full bg-teal-300/70"
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
                        className="inline-flex items-center rounded-full border border-teal-300/20 bg-teal-300/[0.08] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-teal-300"
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
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)] transition-colors hover:bg-white/[0.08] focus-visible:bg-white/[0.08]"
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
