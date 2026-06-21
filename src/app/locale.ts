import { defaultLocale, isLocale, type Locale } from "../content/site";

export const resolveLocale = (path: string): Locale => {
  if (!path || path === "/") {
    return defaultLocale;
  }

  const [, localeSegment] = path.split("/");
  if (isLocale(localeSegment)) {
    return localeSegment;
  }

  return defaultLocale;
};
