import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  localeScrollStorageKey,
  restoreLocaleScrollPosition,
  saveLocaleScrollPosition,
} from "./locale-scroll";

const setScrollPosition = (x: number, y: number) => {
  Object.defineProperties(window, {
    scrollX: { configurable: true, value: x },
    scrollY: { configurable: true, value: y },
  });
};

beforeEach(() => {
  window.history.replaceState({}, "", "/en");
  window.sessionStorage.clear();
  setScrollPosition(0, 0);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("locale scroll position", () => {
  it.each([
    ["/es", "/es"],
    ["/es/proyectos/inkscroller", "/es/proyectos/inkscroller"],
  ])("saves the current position for %s", (href, pathname) => {
    setScrollPosition(12, 640);

    saveLocaleScrollPosition(href);

    expect(
      JSON.parse(window.sessionStorage.getItem(localeScrollStorageKey) ?? ""),
    ).toEqual({ pathname, x: 12, y: 640 });
  });

  it("restores a matching saved position once after page load", () => {
    window.history.replaceState({}, "", "/es/proyectos/inkscroller/");
    window.sessionStorage.setItem(
      localeScrollStorageKey,
      JSON.stringify({ pathname: "/es/proyectos/inkscroller", x: 12, y: 640 }),
    );
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    vi.stubGlobal(
      "requestAnimationFrame",
      (callback: Parameters<typeof requestAnimationFrame>[0]) => {
        callback(0);
        return 0;
      },
    );

    restoreLocaleScrollPosition();
    window.dispatchEvent(new Event("load"));

    expect(scrollTo).toHaveBeenCalledWith(12, 640);
    expect(window.sessionStorage.getItem(localeScrollStorageKey)).toBeNull();
  });

  it("ignores malformed, stale, and external navigation state", () => {
    saveLocaleScrollPosition("https://example.com/es");
    expect(window.sessionStorage.getItem(localeScrollStorageKey)).toBeNull();

    window.sessionStorage.setItem(
      localeScrollStorageKey,
      JSON.stringify({ pathname: "/es", x: 12, y: 640 }),
    );
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    restoreLocaleScrollPosition();
    window.dispatchEvent(new Event("load"));

    expect(scrollTo).not.toHaveBeenCalled();
    expect(window.sessionStorage.getItem(localeScrollStorageKey)).toBeNull();
  });
});
