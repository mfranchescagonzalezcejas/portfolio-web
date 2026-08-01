import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  site: "https://www.devdigi.dev",
  integrations: [
    react(),
    sitemap({
      filter: (page) => page !== "https://www.devdigi.dev/",
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          es: "es",
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
