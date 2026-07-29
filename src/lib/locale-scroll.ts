export const localeScrollStorageKey = "devdigi-locale-scroll";

type LocaleScrollPosition = {
  pathname: string;
  x: number;
  y: number;
};

const normalizePathname = (pathname: string) =>
  pathname.replace(/\/+$/, "") || "/";

const isValidPosition = (
  position: Partial<LocaleScrollPosition>,
): position is LocaleScrollPosition =>
  typeof position.pathname === "string" &&
  typeof position.x === "number" &&
  typeof position.y === "number" &&
  Number.isFinite(position.x) &&
  Number.isFinite(position.y) &&
  position.x >= 0 &&
  position.y >= 0;

export function saveLocaleScrollPosition(href: string) {
  try {
    const target = new URL(href, window.location.href);

    if (target.origin !== window.location.origin) return;

    const position = {
      pathname: normalizePathname(target.pathname),
      x: window.scrollX,
      y: window.scrollY,
    };

    if (!isValidPosition(position)) return;

    window.sessionStorage.setItem(
      localeScrollStorageKey,
      JSON.stringify(position),
    );
  } catch {
    // Storage and URL parsing are optional enhancements to normal navigation.
  }
}

export function restoreLocaleScrollPosition() {
  let position: Partial<LocaleScrollPosition>;

  try {
    const savedPosition = window.sessionStorage.getItem(localeScrollStorageKey);
    window.sessionStorage.removeItem(localeScrollStorageKey);

    if (!savedPosition) return;

    position = JSON.parse(savedPosition) as Partial<LocaleScrollPosition>;
  } catch {
    return;
  }

  if (
    !isValidPosition(position) ||
    position.pathname !== normalizePathname(window.location.pathname)
  ) {
    return;
  }

  const restore = () => {
    window.requestAnimationFrame(() => window.scrollTo(position.x, position.y));
  };

  if (document.readyState === "complete") restore();
  else window.addEventListener("load", restore, { once: true });
}
