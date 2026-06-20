import type { Education as EducationData, SectionHeading } from "../data/site";

type EducationProps = {
  education: EducationData[];
  section: SectionHeading;
};

export default function Education({ education, section }: EducationProps) {
  return (
    <section
      id="education"
      className="section-shell scroll-mt-32"
      aria-labelledby="education-title"
    >
        <div className="section-inner grid gap-6 md:grid-cols-[1fr_24rem] lg:grid-cols-[1fr_32rem]">
          <div className="card-surface">
          <p className="eyebrow">
            {section.eyebrow}
          </p>
            <h2 id="education-title" className="section-title">
              {section.title}
            </h2>
          </div>

        <div className="grid gap-4">
            {education.map((item) => (
              <article
                key={item.title}
                className="section-card"
              >
                <h3 className="text-lg font-extrabold text-[#ECFEFF]">
                  {item.title}
                </h3>
                <p className="hero-copy mt-2 text-sm font-semibold">
                  {item.meta}
                </p>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
