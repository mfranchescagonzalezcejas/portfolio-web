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
            {section.title}
          </h2>
        </div>

        <div className="education-grid">
          <article className="education-card section-card">
            <h3 className="education-card-title">{section.educationTitle}</h3>
            <div className="education-list">
              {education.map((item) => (
                <section
                  key={`${item.title}-${item.meta}`}
                  className="education-entry"
                  aria-label={`${item.title}, ${item.meta}`}
                >
                  <h4>{item.title}</h4>
                  <p>{item.meta}</p>
                </section>
              ))}
            </div>
          </article>

          <article className="education-card section-card">
            <h3 className="education-card-title">{section.languagesTitle}</h3>
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
