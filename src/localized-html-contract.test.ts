import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { siteContentByLocale } from "./data/site";

type LocaleEntrypoint = {
  path: string;
  locale: keyof typeof siteContentByLocale;
};

const entrypoints: LocaleEntrypoint[] = [
  { path: "index.html", locale: "en" },
  { path: "en/index.html", locale: "en" },
  { path: "es/index.html", locale: "es" },
];

const readHtml = (relativePath: string): string =>
  readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("Localized static entrypoints", () => {
  it.each(entrypoints)(
    "uses locale-specific metadata for $path",
    ({ path, locale }) => {
      const html = readHtml(path);
      const site = siteContentByLocale[locale];

      expect(html).toContain(`<html lang="${locale}">`);
      expect(html).toContain(`<title>${site.meta.title}</title>`);
      expect(html).toContain(`content="${site.meta.description}"`);
      expect(html).toContain(
        `<script type="module" src="/src/main.tsx"></script>`,
      );
    },
  );

  it("routes locale paths to localized static HTML in vercel config", () => {
    const vercelConfig = JSON.parse(
      readFileSync(resolve(process.cwd(), "vercel.json"), "utf8"),
    ) as { rewrites: { source: string; destination: string }[] };

    expect(vercelConfig.rewrites).toEqual(
      expect.arrayContaining([
        { source: "/en", destination: "/en/index.html" },
        { source: "/en/:path*", destination: "/en/index.html" },
        { source: "/es", destination: "/es/index.html" },
        { source: "/es/:path*", destination: "/es/index.html" },
      ]),
    );
  });
});
