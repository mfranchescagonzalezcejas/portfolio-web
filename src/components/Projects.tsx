import type { Project, SectionHeading } from "../data/site";
import ProjectCard from "./ProjectCard";

type ProjectsProps = {
  projects: Project[];
  section: SectionHeading & {
    linksLabel: string;
  };
};

export default function Projects({ projects, section }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="section-shell scroll-mt-32"
      aria-labelledby="projects-title"
    >
      <div className="section-inner">
        <div className="max-w-3xl">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="projects-title" className="section-title">
            {section.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              linksLabel={section.linksLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
