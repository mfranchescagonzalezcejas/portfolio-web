import type { Project, SectionHeading } from "../data/site";
import ProjectCard from "./ProjectCard";

type FeaturedProjectProps = {
  project: Project;
  section: SectionHeading & {
    featuredLabel: string;
    linksLabel: string;
  };
};

export default function FeaturedProject({
  project,
  section,
}: FeaturedProjectProps) {
  return (
    <section
      id="featured"
      className="section-shell scroll-mt-32"
      aria-labelledby="featured-title"
    >
      <div className="section-inner">
        <div className="max-w-3xl">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="featured-title" className="section-title">
            {section.title}
          </h2>
        </div>

        <div className="mt-8">
          <ProjectCard
            project={project}
            featured
            featuredLabel={section.featuredLabel}
            linksLabel={section.linksLabel}
          />
        </div>
      </div>
    </section>
  );
}
