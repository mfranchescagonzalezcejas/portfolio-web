import type {
  Experience as ExperienceContent,
  SectionHeading,
} from "../data/site";

type ExperienceProps = {
  experience: ExperienceContent[];
  section: SectionHeading;
};

export default function Experience({ experience, section }: ExperienceProps) {
  const [primaryExperience, ...secondaryExperience] = experience;

  return (
    <section
      id="experience"
      className="section-shell scroll-mt-32"
      aria-labelledby="experience-title"
    >
      <div className="section-inner">
        <div className="max-w-3xl">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="experience-title" className="section-title">
            {section.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_20rem] lg:grid-cols-[1fr_24rem]">
          {primaryExperience && (
            <article className="card-surface">
              <p className="text-sm font-bold text-teal-100">
                {primaryExperience.period}
              </p>
              <h3 className="mt-3 text-2xl font-extrabold text-white">
                {primaryExperience.company} · {primaryExperience.role}
              </h3>
              <p className="hero-copy mt-4 text-base leading-7">
                {primaryExperience.description}
              </p>

              <ul className="hero-copy mt-6 space-y-3 text-base leading-7">
                {primaryExperience.highlights.map((highlight) => (
                  <li className="flex gap-3" key={highlight}>
                    <span
                      className="mt-3 h-1.5 w-1.5 rounded-full bg-teal-300"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          )}

          <div className="grid gap-6">
            {secondaryExperience.map((item) => (
              <article
                key={item.company + item.period}
                className="section-card"
              >
                <p className="text-sm font-bold text-cyan-200">{item.period}</p>
                <h3 className="mt-3 text-xl font-extrabold text-white">
                  {item.company} · {item.role}
                </h3>
                <p className="hero-copy mt-4 text-sm leading-6">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
