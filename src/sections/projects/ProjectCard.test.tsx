import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import type { Project } from "../../content/site";
import ProjectCard from "./ProjectCard";

const baseProject: Project = {
  name: "Sample Project",
  description: "A tiny sample project used for coverage.",
  shortDescription: "A concise sample project.",
  stack: ["React", "TypeScript"],
  demonstrates: "Component rendering, metadata and accessible links.",
  links: [],
};

const renderCard = (project = baseProject) =>
  render(
    <ProjectCard
      project={project}
      linksLabel="Project links"
      stackLabel="{project} technology stack"
      proofLabel="Demonstrates"
      repositoryLabel="View repo"
      repositoryAriaLabel="{repository}: {link} for {project}"
      mockupFallback={"Project\nvisuals\nin progress"}
    />,
  );

describe("ProjectCard", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders concise metadata, technology badges, and proof copy", () => {
    renderCard();

    expect(
      screen.getByRole("heading", { name: "Sample Project" }),
    ).toBeInTheDocument();
    expect(screen.getByText("A concise sample project.")).toBeInTheDocument();

    const stack = screen.getByRole("list", {
      name: "Sample Project technology stack",
    });
    expect(within(stack).getByText("React")).toBeInTheDocument();
    expect(within(stack).getByText("TypeScript")).toBeInTheDocument();

    expect(screen.getByText(/Demonstrates:/)).toBeInTheDocument();
    expect(
      screen.getByText(/Component rendering, metadata and accessible links/i),
    ).toBeInTheDocument();
  });

  it("protects external repository links with useful accessible names", () => {
    renderCard({
      ...baseProject,
      links: [
        {
          label: "Repository",
          href: "https://example.com/sample",
          external: true,
        },
      ],
    });

    const repositoryLink = screen.getByRole("link", {
      name: "View repo: Repository for Sample Project",
    });
    expect(repositoryLink).toHaveTextContent("View repo");
    expect(repositoryLink).toHaveAttribute(
      "href",
      "https://example.com/sample",
    );
    expect(repositoryLink).toHaveAttribute("target", "_blank");
    expect(repositoryLink.getAttribute("rel")?.split(/\s+/)).toEqual(
      expect.arrayContaining(["noopener", "noreferrer"]),
    );
  });

  it("uses per-link CTA labels for visible and accessible link copy", () => {
    renderCard({
      ...baseProject,
      links: [
        {
          label: "Frontend",
          ctaLabel: "Frontend repo",
          href: "https://example.com/frontend",
          external: true,
        },
      ],
    });

    const ctaLink = screen.getByRole("link", {
      name: "Frontend repo: Frontend for Sample Project",
    });

    expect(ctaLink).toHaveTextContent("Frontend repo");
    expect(ctaLink).not.toHaveTextContent("View repo");
    expect(ctaLink).toHaveAttribute("href", "https://example.com/frontend");
  });

  it("omits the project links list when no links are configured", () => {
    renderCard();

    expect(
      screen.queryByRole("list", { name: "Sample Project · Project links" }),
    ).not.toBeInTheDocument();
  });

  it("uses localized section labels for mockup fallback and link metadata", () => {
    render(
      <ProjectCard
        project={{
          ...baseProject,
          links: [
            {
              label: "Repositorio",
              href: "https://example.com/sample",
              external: true,
            },
          ],
        }}
        linksLabel="Enlaces del proyecto"
        stackLabel="Tecnologías de {project}"
        proofLabel="Demuestra"
        repositoryLabel="Ver repo"
        repositoryAriaLabel="{repository}: {link} de {project}"
        mockupFallback={"Visuales\ndel proyecto\nen progreso"}
      />,
    );

    expect(
      screen.getByText(/Visuales\s+del proyecto\s+en progreso/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "Tecnologías de Sample Project" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("list", {
        name: "Sample Project · Enlaces del proyecto",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Ver repo: Repositorio de Sample Project",
      }),
    ).toHaveTextContent("Ver repo");
  });
});
