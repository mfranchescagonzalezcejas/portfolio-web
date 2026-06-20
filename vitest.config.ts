import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    allowOnly: false,
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
