import type { Project, SectionHeading } from "../data/site";
import ProjectCard from "./ProjectCard";

type ProjectsProps = {
  projects: Project[];
  section: SectionHeading & {
    featuredLabel: string;
    linksLabel: string;
  };
};

export default function Projects({ projects, section }: ProjectsProps) {
  const featuredProject = projects.find((project) => project.featured);
  const otherProjects = projects.filter(
    (project) => project !== featuredProject,
  );

  return (
    <section
      id="projects"
      className="scroll-mt-32 px-6 py-12 lg:px-8"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold tracking-[0.32em] text-teal-300 uppercase">
            {section.eyebrow}
          </p>
          <h2
            id="projects-title"
            className="mt-4 text-3xl font-extrabold text-white sm:text-4xl"
          >
            {section.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_20rem] lg:grid-cols-[1fr_24rem]">
          {featuredProject && (
            <ProjectCard
              project={featuredProject}
              featured
              featuredLabel={section.featuredLabel}
              linksLabel={section.linksLabel}
            />
          )}

          <div className="grid gap-6">
            {otherProjects.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                linksLabel={section.linksLabel}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
