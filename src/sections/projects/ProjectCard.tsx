import { GitBranch, Sparkles } from "lucide-react";
import type { Project } from "../../content/types";
import { formatProjectLabel } from "./projectLabel";

type ProjectCardProps = {
  project: Project;
  linksLabel: string;
  stackLabel: string;
  proofLabel: string;
  repositoryLabel: string;
  repositoryAriaLabel: string;
};

export default function ProjectCard({
  project,
  linksLabel,
  stackLabel,
  proofLabel,
  repositoryLabel,
  repositoryAriaLabel,
}: ProjectCardProps) {
  return (
    <article className="project-card card-surface">
      <div className="project-card-content">
        <h3 className="project-card-title font-display">{project.name}</h3>

        <p className="project-card-description">{project.shortDescription}</p>

        <ul
          className="project-stack-list project-card-stack"
          aria-label={formatProjectLabel(stackLabel, { project: project.name })}
        >
          {project.stack.map((stackItem) => (
            <li key={stackItem} className="project-tech-badge">
              {stackItem}
            </li>
          ))}
        </ul>

        <div className="project-proof-box">
          <Sparkles aria-hidden="true" />
          <p>
            <span>{proofLabel}: </span>
            {project.demonstrates}
          </p>
        </div>

        {project.links.length > 0 && (
          <ul
            className="project-card-links"
            aria-label={`${project.name} · ${linksLabel}`}
          >
            {project.links.map((link) => {
              const linkCtaLabel = link.ctaLabel ?? repositoryLabel;

              return (
                <li key={link.href}>
                  <a
                    className="cta-outline"
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    aria-label={formatProjectLabel(repositoryAriaLabel, {
                      repository: linkCtaLabel,
                      link: link.label,
                      project: project.name,
                    })}
                  >
                    <GitBranch
                      aria-hidden="true"
                      className="project-link-icon"
                    />
                    {linkCtaLabel}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </article>
  );
}
