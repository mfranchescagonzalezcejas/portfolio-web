import { GraduationCap } from "lucide-react";
import type {
  Education as EducationData,
  EducationSectionContent,
  Language,
} from "../../content/site";

type EducationProps = {
  education: EducationData[];
  languages: Language[];
  section: EducationSectionContent;
};

export default function Education({
  education,
  languages,
  section,
}: EducationProps) {
  return (
    <section
      id="education"
      className="education-section section-shell scroll-mt-32"
      aria-labelledby="education-title"
    >
      <div className="section-inner">
        <div className="education-header values-header">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="education-title" className="section-title">
            <span className="text-gradient">{section.title}</span>
          </h2>
        </div>

        <div className="education-grid">
          <article className="education-card section-card">
            <h3 className="education-card-title">
              <GraduationCap aria-hidden="true" />
              {section.educationTitle}
            </h3>
            <ul className="education-list">
              {education.map((item) => (
                <li
                  key={`${item.title}-${item.meta}`}
                  className="education-entry"
                  aria-label={`${item.title}, ${item.meta}`}
                >
                  <span className="education-entry-dot" aria-hidden="true" />
                  <div className="min-w-0">
                    <h4>{item.title}</h4>
                    <p>{item.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="education-card section-card">
            <h3 className="education-card-title">
              <span aria-hidden="true">/</span>
              {section.languagesTitle}
            </h3>
            <dl
              className="language-list"
              aria-label={section.languagesAriaLabel}
            >
              {languages.map((language) => (
                <div key={language.name} className="language-row">
                  <dt>{language.name}</dt>
                  <dd>{language.level}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
