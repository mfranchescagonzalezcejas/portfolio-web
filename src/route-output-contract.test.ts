import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const distDir = resolve(process.cwd(), "dist");

const expectedPages = [
  "index.html",
  "en/index.html",
  "es/index.html",
  "en/beta/index.html",
  "es/beta/index.html",
  "en/beta/inkscroller/index.html",
  "es/beta/inkscroller/index.html",
  "en/projects/inkscroller/index.html",
  "es/proyectos/inkscroller/index.html",
];

const collectHtmlPaths = (dir: string, prefix = ""): string[] => {
  const entries = readdirSync(dir, { withFileTypes: true });
  const paths: string[] = [];

  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      paths.push(...collectHtmlPaths(resolve(dir, entry.name), relative));
    } else if (entry.name.endsWith(".html")) {
      paths.push(relative);
    }
  }

  return paths;
};

describe("Route output contract", () => {
  it("emits all 9 expected HTML pages", () => {
    const htmlPaths = collectHtmlPaths(distDir);

    for (const expected of expectedPages) {
      expect(htmlPaths, `Missing expected page: ${expected}`).toContain(
        expected,
      );
    }
  });

  it("emits no extra locale routes beyond the expected set", () => {
    const htmlPaths = collectHtmlPaths(distDir);

    expect(htmlPaths.sort()).toEqual([...expectedPages].sort());
  });
});
