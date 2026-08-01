import type {
  Locale,
  LinkItem,
  SiteContent,
  InvalidLink,
} from "../content/types";

const allowedProtocols = new Set(["https:", "mailto:"]);

const isValidLinkHref = (href: string) => {
  const trimmedHref = href.trim();

  if (
    trimmedHref.startsWith("/") &&
    trimmedHref[1] !== "/" &&
    trimmedHref[1] !== "\\"
  ) {
    return trimmedHref.length > 1;
  }

  try {
    const parsed = new URL(trimmedHref);
    return (
      allowedProtocols.has(parsed.protocol) &&
      (parsed.protocol !== "mailto:" || parsed.pathname.length > 0)
    );
  } catch {
    return false;
  }
};

const isValidLink = (link: LinkItem) =>
  link.label.trim().length > 0 && isValidLinkHref(link.href);

const externalFromHref = (href: string) => {
  try {
    const parsed = new URL(href);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const normalizeLink = <T extends LinkItem>(link: T): T => ({
  ...link,
  label: link.label.trim(),
  href: link.href.trim(),
  external: link.external ?? externalFromHref(link.href.trim()),
});

const validateLinks = <T extends LinkItem>(
  locale: Locale,
  links: T[],
  context: Omit<InvalidLink, "locale" | "label" | "href">,
): { links: T[]; invalidLinks: InvalidLink[] } => {
  const isLinkItem = (link: T | null): link is T => link !== null;

  const invalidLinks: InvalidLink[] = [];
  const validLinks = links
    .map((link) => {
      const normalized = normalizeLink(link);
      if (isValidLink(normalized)) {
        return normalized;
      }

      invalidLinks.push({
        locale,
        ...context,
        label: link.label,
        href: link.href,
      });

      return null;
    })
    .filter(isLinkItem);

  return { links: validLinks, invalidLinks };
};

export const validateSiteContent = (content: SiteContent) => {
  const contacts = validateLinks(content.locale, content.contacts, {
    area: "contact",
    owner: "contacts",
  });

  const projectResults = content.projects.map((project) => {
    const result = validateLinks(content.locale, project.links, {
      area: "project",
      owner: project.name,
    });

    return {
      project: {
        ...project,
        links: result.links,
      },
      invalidLinks: result.invalidLinks,
    };
  });

  const experienceResults = content.experience.map((experience) => {
    const result = validateLinks(content.locale, experience.links ?? [], {
      area: "experience",
      owner: `${experience.company} — ${experience.role}`,
    });

    return {
      experience: {
        ...experience,
        ...(experience.links ? { links: result.links } : {}),
      },
      invalidLinks: result.invalidLinks,
    };
  });

  const caseStudyResults = content.caseStudies.map((caseStudy) => {
    const result = validateLinks(content.locale, caseStudy.links ?? [], {
      area: "caseStudy",
      owner: caseStudy.title,
    });

    return {
      caseStudy: {
        ...caseStudy,
        ...(caseStudy.links ? { links: result.links } : {}),
      },
      invalidLinks: result.invalidLinks,
    };
  });

  const projects = projectResults.map((result) => result.project);

  const experience = experienceResults.map((result) => result.experience);

  const caseStudies = caseStudyResults.map((result) => result.caseStudy);

  const invalidLinks = [
    ...contacts.invalidLinks,
    ...projectResults.flatMap((project) => project.invalidLinks),
    ...experienceResults.flatMap((experience) => experience.invalidLinks),
    ...caseStudyResults.flatMap((caseStudy) => caseStudy.invalidLinks),
  ];

  if (invalidLinks.length > 0) {
    console.warn(
      `Dropped ${invalidLinks.length} invalid configured link(s) from ${content.locale} site content before render.`,
    );
  }

  return {
    content: {
      ...content,
      contacts: contacts.links,
      experience,
      projects,
      caseStudies,
    },
    invalidLinks,
  };
};
