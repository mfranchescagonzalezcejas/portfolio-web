import type { Locale, NavItem } from "../../content/site";
import { saveLocaleScrollPosition } from "../../lib/locale-scroll";
import { useEffect, useState, type MouseEvent } from "react";
import {
  ArrowUpRight,
  Languages,
  Moon,
  Sun,
} from "lucide-react";

type ThemeMode = "light" | "dark";

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
  initialTheme?: ThemeMode;
};

export default function SiteHeader({
  currentLocale,
  isHome = true,
  localePath,
  localeHref,
  navItems,
  languageSwitcher,
  header,
  initialTheme,
}: SiteHeaderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme ?? "dark");

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
              <Languages className="header-icon-sm" />
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
            {themeMode === "dark" ? <Sun className="header-icon" /> : <Moon className="header-icon" />}
          </button>

          <a className="header-contact-cta" href={toHomeHref("#contact")}>
            {header.ctaLabel}
            <ArrowUpRight className="header-icon-sm" />
          </a>
        </div>
      </div>
    </header>
  );
}
