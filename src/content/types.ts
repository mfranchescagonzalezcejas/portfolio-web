export type Locale = "en" | "es";

export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
  ctaLabel?: string;
};

export type ContactLinkKind = "linkedin" | "github" | "cv" | "email";
export type ContactLinkVariant = "primary" | "secondary";

export type ContactLinkItem = LinkItem & {
  kind: ContactLinkKind;
  variant: ContactLinkVariant;
};

export type Project = {
  name: string;
  description: string;
  shortDescription: string;
  stack: string[];
  demonstrates: string;
  featured?: boolean;
  links: LinkItem[];
  mockups?: ProjectMockup[];
};

export type ProjectMockup = {
  src: Record<"dark" | "light", `/inkscroller/${string}`>;
  width: 1080;
  height: 2340;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  stack: string[];
  links?: LinkItem[];
};

export type Education = {
  title: string;
  meta: string;
};

export type Language = {
  name: string;
  level: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SectionHeading = {
  eyebrow: string;
  title: string;
};

export type EducationSectionContent = SectionHeading & {
  educationTitle: string;
  languagesTitle: string;
  languagesAriaLabel: string;
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type SkillsSectionContent = SectionHeading & {
  categorySkillsLabel: string;
  categories: SkillCategory[];
};

export type ExperienceSectionHeading = SectionHeading & {
  stackLabel: string;
  linksLabel: string;
};

export type ValueIconName =
  "smartphone" | "layers" | "git-branch" | "check-circle";

export type ValueCard = {
  title: string;
  body: string;
  icon: ValueIconName;
};

export type ValuesContent = SectionHeading & {
  description: string;
  cards: ValueCard[];
};

export type HeroVisualContent = {
  ariaLabel: string;
  readingEyebrow: string;
  readingTitle: string;
  stackLabel: string;
  deliveryTitle: string;
  deliverySubtitle: string;
  architectureTitle: string;
  architectureSubtitle: string;
};

export type CaseStudySectionHeading = SectionHeading & {
  description: string;
  contextLabel: string;
  roleLabel: string;
  stackLabel: string;
  demonstratesLabel: string;
};

export type HeroContent = {
  shortName: string;
  name: string;
  greeting: string;
  eyebrow: string;
  tagline: string;
  taglineAccent?: string;
  summary: string;
  panelLabel: string;
  panelTitle: string;
  panelText: string;
  profileLinksLabel: string;
  panelAriaLabel: string;
  ctaLabel: string;
  cvLabel: string;
  quickCtaLabel: string;
  quickCtaHref: string;
  skills: string[];
  visual: HeroVisualContent;
};

export type SummaryContent = {
  eyebrow: string;
  titleLines: [string, string];
  profile: {
    initials: string;
    name: string;
    location: string;
  };
  paragraphs: { text: string; emphasis?: boolean }[][];
  badgesLabel: string;
  badges: string[];
  skills: string[];
};

export type ContactSection = {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  body: string;
  ariaLabel: string;
};

export type CaseStudy = {
  title: string;
  context: string;
  role: string;
  stack: string[];
  demonstrates: string;
  links?: LinkItem[];
};

export type SiteContent = {
  locale: Locale;
  meta: {
    title: string;
    description: string;
    socialImageAlt: string;
  };
  skipLink: string;
  nav: NavItem[];
  languageSwitcher: {
    label: string;
    options: Record<Locale, string>;
    hint?: {
      en: string;
      es: string;
    };
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
  hero: HeroContent;
  values: ValuesContent;
  summary: SummaryContent;
  experienceSection: ExperienceSectionHeading;
  featuredSection: SectionHeading & {
    kicker: string;
    linksLabel: string;
    stackLabel: string;
    linkAriaLabel: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  allProjectsSection: {
    eyebrow: string;
    title: string;
    description: string;
    linksLabel: string;
    stackLabel: string;
    proofLabel: string;
    repositoryLabel: string;
    repositoryAriaLabel: string;
    learningProjectsTitle: string;
    learningProjectsDescription: string;
  };
  caseStudiesSection: CaseStudySectionHeading;
  educationSection: EducationSectionContent;
  contactSection: ContactSection;
  footerText: string;
  experience: Experience[];
  projects: Project[];
  caseStudies: CaseStudy[];
  education: Education[];
  languages: Language[];
  skillsSection: SkillsSectionContent;
  contacts: ContactLinkItem[];
};

export type InvalidLink = {
  locale: Locale;
  area: "contact" | "project" | "experience" | "caseStudy";
  owner: string;
  label: string;
  href: string;
};
