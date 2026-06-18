import type { SectionHeading } from "../data/site";

type SkillsProps = {
  skills: string[];
  section: SectionHeading;
};

const skillStyles = [
  "border-[#0F766E] bg-[#0F766E]/45 text-[#CCFBF1]",
  "border-[#075985] bg-[#075985]/45 text-[#BAE6FD]",
  "border-[#115E59] bg-[#115E59]/45 text-[#CCFBF1]",
  "border-[#0F766E] bg-[#0F766E]/45 text-[#CCFBF1]",
  "border-[#0E7490] bg-[#0E7490]/45 text-[#CFFAFE]",
  "border-[#1E3A8A] bg-[#1E3A8A]/55 text-[#DBEAFE]",
  "border-[#164E63] bg-[#082F49]/55 text-[#BAE6FD]",
];

export default function Skills({ skills, section }: SkillsProps) {
  return (
    <section
      id="skills"
      className="px-6 py-12 lg:px-8"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-extrabold tracking-[0.32em] text-teal-300 uppercase">
          {section.eyebrow}
        </p>
        <h2
          id="skills-title"
          className="mt-4 text-3xl font-extrabold text-white sm:text-4xl"
        >
          {section.title}
        </h2>

        <div className="mt-6 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className={`rounded-full border px-3 py-1 text-xs font-bold ${skillStyles[index % skillStyles.length]}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
