import { readFileSync, readdirSync } from "node:fs";
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

const expectedLocaleRewrites = [
  { source: "/en", destination: "/en/index.html" },
  { source: "/es", destination: "/es/index.html" },
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

  it("uses slashless locale URLs without routing unknown locale paths to home", () => {
    const vercelConfig = JSON.parse(
      readFileSync(resolve(process.cwd(), "vercel.json"), "utf8"),
    ) as {
      trailingSlash?: boolean;
      redirects?: { source: string; destination: string; permanent: boolean }[];
      rewrites?: { source: string; destination: string }[];
    };

    const astroConfig = readFileSync(
      resolve(process.cwd(), "astro.config.mjs"),
      "utf8",
    );

    expect(vercelConfig.trailingSlash).toBe(false);
    expect(astroConfig).toContain('trailingSlash: "never"');
    expect(vercelConfig.redirects).toEqual([
      { source: "/", destination: "/en", permanent: true },
    ]);
    expect(vercelConfig.rewrites).toEqual(expectedLocaleRewrites);
    expect(vercelConfig.rewrites?.map(({ source }) => source)).not.toContain(
      "/en/:path*",
    );
    expect(vercelConfig.rewrites?.map(({ source }) => source)).not.toContain(
      "/es/:path*",
    );

    const rewriteDestination = (source: string) =>
      vercelConfig.rewrites?.find((rewrite) => rewrite.source === source)
        ?.destination;

    expect(rewriteDestination("/en")).toBe("/en/index.html");
    expect(rewriteDestination("/es")).toBe("/es/index.html");
    expect(rewriteDestination("/en/missing")).toBeUndefined();
    expect(rewriteDestination("/es/inexistente")).toBeUndefined();
  });

  it("indexes localized www routes but not the root URL", () => {
    const sitemap = readFileSync(resolve(distDir, "sitemap-0.xml"), "utf8");
    const sitemapLocations = Array.from(
      sitemap.matchAll(/<loc>([^<]+)<\/loc>/g),
      ([, location]) => location,
    );

    expect(sitemap).toContain("https://www.devdigi.dev/en");
    expect(sitemap).toContain("https://www.devdigi.dev/es");
    expect(sitemap).toContain(
      "https://www.devdigi.dev/en/projects/inkscroller",
    );
    expect(sitemap).toContain(
      "https://www.devdigi.dev/es/proyectos/inkscroller",
    );
    expect(sitemapLocations).not.toContain("https://www.devdigi.dev/en/");
    expect(sitemapLocations).not.toContain("https://www.devdigi.dev/es/");
    expect(sitemapLocations.every((location) => !location.endsWith("/"))).toBe(
      true,
    );
    expect(sitemap).not.toContain("https://www.devdigi.dev/</loc>");
  });
});
