import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ProjectCard from "./ProjectCard";

const baseProject = {
  name: "Sample Project",
  description: "A tiny sample project used for coverage.",
  links: [],
};

describe("ProjectCard", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders featured badge only when the featured prop is true and label exists", () => {
    render(
      <ProjectCard project={baseProject} featured featuredLabel="Featured" />,
    );

    expect(screen.getByText("Featured")).toBeInTheDocument();
    cleanup();

    render(
      <ProjectCard
        project={{ ...baseProject, featured: true }}
        featured={false}
        featuredLabel="Featured"
      />,
    );

    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
  });

  it("does not render featured badge when label is missing even if featured is true", () => {
    render(<ProjectCard project={baseProject} featured />);

    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
  });
});
