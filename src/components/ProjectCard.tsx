import type { Project } from "../data/site";

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
      className={`rounded-3xl border p-6 shadow-xl shadow-slate-950/20 ${
        featured
          ? "border-[#38BDF8] bg-[#082F49] sm:p-8"
          : "border-[#134E4A] bg-[#0B1B2A]"
      }`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <h3
          className={`font-extrabold text-white ${
            featured ? "text-3xl" : "text-xl"
          }`}
        >
          {project.name}
        </h3>

        {project.featured && (
          <span className="rounded-full bg-teal-300/15 px-3 py-1 text-xs font-extrabold tracking-wide text-teal-100 ring-1 ring-teal-300/25">
            {featuredLabel}
          </span>
        )}
      </div>

      <p
        className={`mt-4 leading-7 ${
          featured ? "text-base text-[#DBEAFE]" : "text-sm text-[#B6E7E1]"
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
                className="inline-flex rounded-full border border-[#38BDF8] bg-[#082F49] px-4 py-2 text-sm font-bold text-[#BAE6FD] transition hover:bg-cyan-300/10 hover:text-white"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
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
