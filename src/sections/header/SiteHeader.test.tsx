import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { siteContentByLocale } from "../../content/site";
import SiteHeader from "./SiteHeader";

const site = siteContentByLocale.en;
const originalMatchMedia = window.matchMedia;

const renderHeader = () => {
  return render(
    <SiteHeader
      currentLocale={site.locale}
      navItems={site.nav}
      languageSwitcher={site.languageSwitcher}
      header={site.header}
    />,
  );
};

const createLocalStorage = () => {
  const storage = new Map<string, string>();

  return {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    clear: () => storage.clear(),
  };
};

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: createLocalStorage(),
  });
});

afterEach(() => {
  cleanup();
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: originalMatchMedia,
  });
  window.localStorage.clear();
  document.documentElement.classList.remove("light", "dark");
});

describe("SiteHeader theme toggle", () => {
  it("uses system theme on first render without storing it as a preference", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-color-scheme: light)",
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    renderHeader();

    await waitFor(() => {
      expect(document.documentElement).toHaveClass("light");
    });
    expect(window.localStorage.getItem("devdigi-theme")).toBeNull();
  });

  it("toggles theme labels, root classes, and localStorage", async () => {
    const { switchToDark, switchToLight } = site.header.themeToggle;

    window.localStorage.setItem("devdigi-theme", "dark");

    renderHeader();

    const toggleToLight = await screen.findByRole("button", {
      name: switchToLight,
    });

    await waitFor(() => {
      expect(document.documentElement).toHaveClass("dark");
    });
    expect(window.localStorage.getItem("devdigi-theme")).toBe("dark");

    fireEvent.click(toggleToLight);

    expect(document.documentElement).toHaveClass("light");
    expect(document.documentElement).not.toHaveClass("dark");
    expect(window.localStorage.getItem("devdigi-theme")).toBe("light");

    const toggleToDark = screen.getByRole("button", {
      name: switchToDark,
    });
    expect(toggleToDark).toHaveAttribute("title", switchToDark);

    fireEvent.click(toggleToDark);

    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement).not.toHaveClass("light");
    expect(window.localStorage.getItem("devdigi-theme")).toBe("dark");
    expect(screen.getByRole("button", { name: switchToLight })).toHaveAttribute(
      "title",
      switchToLight,
    );
  });
});

describe("SiteHeader primary navigation", () => {
  it("renders the six localized primary destinations", () => {
    renderHeader();

    const navigation = screen.getByRole("navigation", {
      name: site.header.ariaLabel,
    });
    const links = Array.from(navigation.querySelectorAll("a"));

    expect(links.map((link) => link.textContent)).toEqual([
      "About",
      "Experience",
      "Projects",
      "Skills",
      "Education",
      "Contact",
    ]);
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "#about",
      "#experience",
      "#projects",
      "#skills",
      "#education",
      "#contact",
    ]);
    expect(navigation).not.toHaveTextContent("InkScroller");
  });

  it.each([
    ["en", "/es/proyectos/inkscroller"],
    ["en", "/es/beta/inkscroller"],
    ["es", "/en/projects/inkscroller"],
    ["es", "/en/beta/inkscroller"],
  ] as const)(
    "preserves the locale route when switching from %s",
    (locale, href) => {
      const localeSite = siteContentByLocale[locale];
      render(
        <SiteHeader
          currentLocale={locale}
          isHome={false}
          localeHref={href}
          navItems={localeSite.nav}
          languageSwitcher={localeSite.languageSwitcher}
          header={localeSite.header}
        />,
      );

      expect(
        screen.getByTitle(
          localeSite.languageSwitcher.hint?.[locale === "en" ? "es" : "en"] ??
            "",
        ),
      ).toHaveAttribute("href", href);
    },
  );
});
