import type { Project } from "../../content/site";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
  featuredLabel?: string;
  linksLabel?: string;
};

export default function ProjectCard({
  project,
  featured = false,
  featuredLabel,
  linksLabel,
}: ProjectCardProps) {
  return (
    <article
      className={`card-surface p-6 ${
        featured ? "project-featured sm:p-8" : "project-card"
      }`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <h3
          className={`project-card-title font-extrabold ${
            featured ? "text-3xl" : "text-2xl"
          }`}
        >
          {project.name}
        </h3>

        {featured && featuredLabel && (
          <span className="pill">{featuredLabel}</span>
        )}
      </div>

      <p
        className={`mt-4 leading-7 ${
          featured ? "project-card-description text-base" : "hero-copy text-sm"
        }`}
      >
        {project.description}
      </p>

      {project.links.length > 0 && (
        <ul
          className="mt-6 flex flex-wrap gap-3"
          aria-label={`${project.name} · ${linksLabel ?? "Project links"}`}
        >
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                className="cta-outline"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
