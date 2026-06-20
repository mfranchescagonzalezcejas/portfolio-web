import type { Locale, NavItem } from "../data/site";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

function LanguagesIcon() {
  return (
    <svg
      aria-hidden="true"
      className="header-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="header-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="header-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="header-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function getThemeMode(): ThemeMode {
  const storedTheme =
    typeof window !== "undefined" ? window.localStorage.getItem("devdigi-theme") : null;

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  if (window.matchMedia?.("(prefers-color-scheme: light)").matches) {
    return "light";
  }

  return "dark";
}

type SiteHeaderProps = {
  currentLocale: Locale;
  navItems: NavItem[];
  languageSwitcher: {
    label: string;
    options: Record<Locale, string>;
  };
  header: {
    ariaLabel: string;
    homeLabel: string;
    ctaLabel: string;
  };
};

export default function SiteHeader({
  currentLocale,
  navItems,
  languageSwitcher,
  header,
}: SiteHeaderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const currentTheme = getThemeMode();
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(currentTheme);
    setThemeMode(currentTheme);
    try {
      window.localStorage.setItem("devdigi-theme", currentTheme);
    } catch {
      // Local storage can fail in restricted environments; UI still works with default class.
    }
  }, []);

  const primaryNav = navItems.filter((item) =>
    ["#about", "#experience", "#projects", "#skills", "#contact"].includes(
      item.href,
    ),
  );
  const isEnglishLocale = currentLocale === "en";
  const nextLocale = isEnglishLocale ? "es" : "en";
  const nextLocaleHref = nextLocale === "en" ? "/en" : `/${nextLocale}`;

  const currentLocaleLabel = currentLocale.toUpperCase();
  const localeAriaHint = isEnglishLocale
    ? "Switch to Spanish"
    : "Switch to English";

  const themeAriaLabel =
    themeMode === "dark" ? "Switch to light mode" : "Switch to dark mode";

  const onThemeToggle = () => {
    setThemeMode((previousTheme) => {
      const nextTheme = previousTheme === "dark" ? "light" : "dark";
      const root = document.documentElement;

      root.classList.remove("light", "dark");
      root.classList.add(nextTheme);

      try {
        window.localStorage.setItem("devdigi-theme", nextTheme);
      } catch {
        // Local storage is optional; keep behavior purely visual if unavailable.
      }

      return nextTheme;
    });
  };

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className="site-nav mx-auto flex max-w-6xl items-center justify-between rounded-full glass px-4 py-2.5 sm:px-6"
        aria-label={header.ariaLabel}
      >
        <a
          className="flex items-center gap-2 text-sm font-semibold"
          href="#main-content"
          aria-label={header.homeLabel}
        >
          <span className="brand-mark" aria-hidden="true">
            D
          </span>
          <span className="brand-text">
            Dev<span className="brand-mark-text">Digi</span>
          </span>
        </a>

        <div className="header-controls">
          <ul className="site-nav-links">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="lang-switch" role="group" aria-label={languageSwitcher.label}>
            <a
              href={nextLocaleHref}
              className="lang-switch-pill"
              aria-label={`${localeAriaHint}. Current locale: ${languageSwitcher.options[currentLocale]}`}
              title={languageSwitcher.options[nextLocale]}
            >
              <LanguagesIcon />
              <span className="lang-switch-label">{currentLocaleLabel}</span>
            </a>
          </div>

          <button
            onClick={onThemeToggle}
            type="button"
            className="theme-pill"
            aria-label={themeAriaLabel}
            title={themeAriaLabel}
          >
            {themeMode === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <a className="contact-nav-pill" href="#contact">
            {header.ctaLabel}
            <ArrowUpRightIcon />
          </a>
        </div>
      </nav>
    </header>
  );
}
