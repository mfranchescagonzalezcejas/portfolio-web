import type { SectionHeading } from "../../content/site";

type SkillsProps = {
  skills: string[];
  section: SectionHeading;
};

export default function Skills({ skills, section }: SkillsProps) {
  return (
    <section
      id="skills"
      className="section-shell scroll-mt-32"
      aria-labelledby="skills-title"
    >
      <div className="section-inner">
        <p className="eyebrow">{section.eyebrow}</p>
        <h2 id="skills-title" className="section-title">
          {section.title}
        </h2>

        <div className="mt-6 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className={`pill ${
                index % 2 === 0 ? "pill-accent-teal" : "pill-accent-cyan"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
