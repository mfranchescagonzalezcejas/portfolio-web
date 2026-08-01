import type { SkillsSectionContent } from "../../content/types";
import { formatTemplate } from "../../lib/format";

type SkillsProps = {
  section: SkillsSectionContent;
};

export default function Skills({ section }: SkillsProps) {
  return (
    <section
      id="skills"
      className="skills-section section-shell scroll-mt-32"
      aria-labelledby="skills-title"
    >
      <div className="section-inner">
        <div className="skills-header">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="skills-title" className="section-title">
            <span className="text-gradient">{section.title}</span>
          </h2>
        </div>

        <div className="skills-grid" aria-label={section.title}>
          {section.categories.map((category) => (
            <article className="skills-card section-card" key={category.title}>
              <h3 className="skills-card-title">
                <span aria-hidden="true">/</span>
                {category.title}
              </h3>

              <ul
                className="skills-chip-list"
                aria-label={formatTemplate(section.categorySkillsLabel, {
                  category: category.title,
                })}
              >
                {category.skills.map((skill) => (
                  <li key={skill}>
                    <span className="pill pill-accent-teal">{skill}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
