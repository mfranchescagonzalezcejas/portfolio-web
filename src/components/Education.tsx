import type { Education as EducationData, SectionHeading } from "../data/site";

type EducationProps = {
  education: EducationData[];
  section: SectionHeading;
};

const cardStyles = [
  "border-[#0E7490] bg-[#062A30]",
  "border-[#38BDF8] bg-[#082F49]",
  "border-[#164E63] bg-[#0B1B2A]",
];

export default function Education({ education, section }: EducationProps) {
  return (
    <section
      id="education"
      className="scroll-mt-32 px-6 py-12 lg:px-8"
      aria-labelledby="education-title"
    >
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1fr_24rem] lg:grid-cols-[1fr_32rem]">
        <div className="rounded-3xl border border-[#134E4A] bg-[#0B1B2A] p-8">
          <p className="text-xs font-extrabold tracking-[0.32em] text-teal-300 uppercase">
            {section.eyebrow}
          </p>
          <h2
            id="education-title"
            className="mt-4 text-3xl font-extrabold text-white"
          >
            {section.title}
          </h2>
        </div>

        <div className="grid gap-4">
          {education.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-3xl border p-6 ${cardStyles[index % cardStyles.length]}`}
            >
              <h3 className="text-lg font-extrabold text-[#ECFEFF]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm font-semibold text-[#BAE6FD]">
                {item.meta}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
