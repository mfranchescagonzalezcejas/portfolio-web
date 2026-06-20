import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = dirname(fileURLToPath(import.meta.url));

const localizedHtmlInputs = {
  en: resolve(rootDir, "en/index.html"),
  es: resolve(rootDir, "es/index.html"),
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        ...localizedHtmlInputs,
      },
    },
  },
});
