import type { Locale, NavItem } from "../../content/site";
import { saveLocaleScrollPosition } from "../../lib/locale-scroll";
import { useEffect, useState, type MouseEvent } from "react";

type ThemeMode = "light" | "dark";

function LanguagesIcon({ className = "header-icon" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
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

function SunIcon({ className = "header-icon" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
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

function MoonIcon({ className = "header-icon" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
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

function ArrowUpRightIcon({
  className = "header-icon",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
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
  let storedTheme: string | null = null;

  try {
    storedTheme =
      typeof window !== "undefined"
        ? window.localStorage.getItem("devdigi-theme")
        : null;
  } catch {
    storedTheme = null;
  }

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: light)")?.matches
  ) {
    return "light";
  }

  return "dark";
}

type SiteHeaderProps = {
  currentLocale: Locale;
  isHome?: boolean;
  localePath?: string;
  localeHref?: string;
  navItems: NavItem[];
  languageSwitcher: {
    label: string;
    options: Record<Locale, string>;
    hint?: Record<Locale, string>;
  };
  header: {
    ariaLabel: string;
    homeLabel: string;
    ctaLabel: string;
    themeToggle: {
      switchToLight: string;
      switchToDark: string;
    };
  };
};

export default function SiteHeader({
  currentLocale,
  isHome = true,
  localePath,
  localeHref,
  navItems,
  languageSwitcher,
  header,
}: SiteHeaderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      return root.classList.contains("light") ? "light" : "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const currentTheme = getThemeMode();
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(currentTheme);
    document.dispatchEvent(new Event("devdigi-theme-change"));
    setThemeMode(currentTheme);
  }, []);

  const isEnglishLocale = currentLocale === "en";
  const homeHref = currentLocale === "en" ? "/en" : "/es";
  const toHomeHref = (href: string) =>
    isHome || !href.startsWith("#") ? href : `${homeHref}${href}`;
  const nextLocale = isEnglishLocale ? "es" : "en";
  const nextLocaleHref =
    localeHref ??
    (localePath
      ? localePath.replace(/^\/(en|es)(?=\/|$)/, `/${nextLocale}`)
      : nextLocale === "en"
        ? "/en"
        : `/${nextLocale}`);

  const currentLocaleLabel = languageSwitcher.options[currentLocale];
  const localeAriaHint =
    languageSwitcher.hint?.[nextLocale] ??
    (isEnglishLocale ? "Switch to Spanish" : "Switch to English");

  const themeAriaLabel =
    themeMode === "dark"
      ? header.themeToggle.switchToLight
      : header.themeToggle.switchToDark;

  const onThemeToggle = () => {
    const nextTheme = themeMode === "dark" ? "light" : "dark";
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);
    document.dispatchEvent(new Event("devdigi-theme-change"));

    try {
      window.localStorage.setItem("devdigi-theme", nextTheme);
    } catch {
      // Local storage is optional; keep behavior purely visual if unavailable.
    }

    setThemeMode(nextTheme);
  };

  const onLocaleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (event.currentTarget.target && event.currentTarget.target !== "_self")
    ) {
      return;
    }

    saveLocaleScrollPosition(nextLocaleHref);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="header-shell glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
        <a
          className="header-brand-link flex items-center gap-2"
          href={toHomeHref("#top")}
          aria-label={header.homeLabel}
        >
          <span className="header-brand-mark" aria-hidden="true">
            D
          </span>
          <span className="header-brand-text">
            Dev<span className="header-brand-accent">Digi</span>
          </span>
        </a>

        <nav
          aria-label={header.ariaLabel}
          className="header-primary-nav flex items-center gap-1"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              className="header-nav-link"
              href={toHomeHref(item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-action-row flex items-center gap-2">
          <div role="group" aria-label={languageSwitcher.label}>
            <a
              href={nextLocaleHref}
              onClick={onLocaleClick}
              className="header-lang-toggle"
              aria-label={`${currentLocaleLabel}. ${localeAriaHint}`}
              title={localeAriaHint}
            >
              <LanguagesIcon className="header-icon-sm" />
              {currentLocaleLabel}
            </a>
          </div>

          <button
            onClick={onThemeToggle}
            type="button"
            className="header-theme-toggle"
            aria-label={themeAriaLabel}
            title={themeAriaLabel}
          >
            {themeMode === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <a className="header-contact-cta" href={toHomeHref("#contact")}>
            {header.ctaLabel}
            <ArrowUpRightIcon className="header-icon-sm" />
          </a>
        </div>
      </div>
    </header>
  );
}
