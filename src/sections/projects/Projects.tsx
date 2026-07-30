import type { Project, SectionHeading } from "../../content/site";
import ProjectCard from "./ProjectCard";

type ProjectsProps = {
  projects: Project[];
  section: SectionHeading & {
    description: string;
    linksLabel: string;
    stackLabel: string;
    proofLabel: string;
    repositoryLabel: string;
    repositoryAriaLabel: string;
    learningProjectsTitle: string;
    learningProjectsDescription: string;
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
        <div className="values-header">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="projects-title" className="section-title">
            <span className="text-gradient">{section.title}</span>
          </h2>
          <p className="values-description">{section.description}</p>
        </div>

        <section
          className="projects-learning-group"
          aria-labelledby="learning-projects-title"
        >
          <div className="projects-learning-header">
            <h3
              id="learning-projects-title"
              className="projects-learning-title"
            >
              {section.learningProjectsTitle}
            </h3>
            <p>{section.learningProjectsDescription}</p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                linksLabel={section.linksLabel}
                stackLabel={section.stackLabel}
                proofLabel={section.proofLabel}
                repositoryLabel={section.repositoryLabel}
                repositoryAriaLabel={section.repositoryAriaLabel}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
