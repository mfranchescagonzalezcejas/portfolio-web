import type { Locale, SiteContent } from "./types";
import { enSiteContent } from "./data/en";
import { esSiteContent } from "./data/es";
import { validateSiteContent } from "../lib/link-validation";

export { validateSiteContent };

export type {
  Locale,
  LinkItem,
  ContactLinkKind,
  ContactLinkVariant,
  ContactLinkItem,
  Project,
  ProjectMockup,
  Experience,
  Education,
  Language,
  NavItem,
  SectionHeading,
  EducationSectionContent,
  SkillCategory,
  SkillsSectionContent,
  ExperienceSectionHeading,
  ValueIconName,
  ValueCard,
  ValuesContent,
  HeroVisualContent,
  CaseStudySectionHeading,
  HeroContent,
  SummaryContent,
  ContactSection,
  CaseStudy,
  SiteContent,
  InvalidLink,
} from "./types";

const rawSiteContent: Record<Locale, SiteContent> = {
  en: enSiteContent,
  es: esSiteContent,
};

export const locales = ["en", "es"] as const;
export const defaultLocale: Locale = "en";

export const isLocale = (locale: string | undefined): locale is Locale =>
  locales.includes(locale as Locale);

const validatedContentEntries = locales.map((locale) => {
  const result = validateSiteContent(rawSiteContent[locale]);

  return [locale, result] as const;
});

export const siteContentByLocale = Object.fromEntries(
  validatedContentEntries.map(([locale, result]) => [locale, result.content]),
) as Record<Locale, SiteContent>;

export const siteContent = siteContentByLocale[defaultLocale];

export const invalidLinks = validatedContentEntries.flatMap(
  ([, result]) => result.invalidLinks,
);
