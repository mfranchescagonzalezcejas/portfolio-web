/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--background)",
        surface: "var(--surface)",
        ink: "var(--foreground)",
        muted: "var(--muted-foreground)",
        accent: "var(--primary)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
