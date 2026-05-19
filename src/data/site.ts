export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type Project = {
  name: string;
  description: string;
  featured?: boolean;
  links: LinkItem[];
};

export type SiteContent = {
  hero: {
    name: string;
    tagline: string;
    summary: string;
  };
  summary: {
    eyebrow: string;
    title: string;
    body: string;
  };
  projects: Project[];
  contacts: LinkItem[];
};

export type InvalidLink = {
  area: "contact" | "project";
  owner: string;
  label: string;
  href: string;
};

const allowedProtocols = new Set(["https:", "http:", "mailto:"]);

const rawSiteContent = {
  hero: {
    name: "Merce",
    tagline: "Frontend engineer building thoughtful web experiences.",
    summary:
      "I turn product ideas into accessible, fast, maintainable interfaces with strong foundations and a practical delivery mindset.",
  },
  summary: {
    eyebrow: "About",
    title:
      "I care about clean architecture, resilient UI, and teams that can move without losing quality.",
    body: "My work combines frontend engineering, product thinking, and a strong bias for readable systems. This MVP keeps the portfolio focused: who I am, what I build, and how to reach me.",
  },
  contacts: [
    {
      label: "Email",
      href: "mailto:hello@example.com",
    },
    {
      label: "GitLab",
      href: "https://gitlab.com/merce",
      external: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/merce",
      external: true,
    },
  ],
  projects: [
    {
      name: "InkScroller",
      description:
        "A focused reading and writing experience for long-form text, built as a product-minded side project with a dedicated backend roadmap.",
      featured: true,
      links: [
        {
          label: "Project repository",
          href: "https://github.com/merce/inkscroller",
          external: true,
        },
      ],
    },
    {
      name: "Portfolio Web",
      description:
        "This static Astro landing page, designed as a small, accessible, deployable portfolio MVP.",
      links: [
        {
          label: "Source placeholder",
          href: "https://example.com/portfolio-web",
          external: true,
        },
      ],
    },
  ],
} satisfies SiteContent;

const isValidLinkHref = (href: string) => {
  try {
    const parsed = new URL(href);

    return allowedProtocols.has(parsed.protocol);
  } catch {
    return false;
  }
};

const isValidLink = (link: LinkItem) =>
  link.label.trim().length > 0 && isValidLinkHref(link.href);

const externalFromHref = (href: string) => {
  try {
    const parsed = new URL(href);

    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
};

const normalizeLink = (link: LinkItem): LinkItem => ({
  ...link,
  label: link.label.trim(),
  href: link.href.trim(),
  external: link.external ?? externalFromHref(link.href),
});

const validateLinks = (
  links: LinkItem[],
  context: Omit<InvalidLink, "label" | "href">,
): { links: LinkItem[]; invalidLinks: InvalidLink[] } => {
  const invalidLinks: InvalidLink[] = [];
  const validLinks = links.flatMap((link) => {
    const normalized = normalizeLink(link);

    if (isValidLink(normalized)) {
      return [normalized];
    }

    invalidLinks.push({
      ...context,
      label: link.label,
      href: link.href,
    });

    return [];
  });

  return { links: validLinks, invalidLinks };
};

const validateSiteContent = (content: SiteContent) => {
  const contacts = validateLinks(content.contacts, {
    area: "contact",
    owner: "contacts",
  });

  const projectResults = content.projects.map((project) => ({
    ...project,
    ...validateLinks(project.links, {
      area: "project",
      owner: project.name,
    }),
  }));

  const projects = projectResults.map(
    ({ invalidLinks: _invalidLinks, ...project }) => project,
  );
  const invalidLinks = [
    ...contacts.invalidLinks,
    ...projectResults.flatMap((project) => project.invalidLinks),
  ];

  if (invalidLinks.length > 0) {
    console.warn(
      `Dropped ${invalidLinks.length} invalid configured link(s) from site content before render.`,
    );
  }

  return {
    content: {
      ...content,
      contacts: contacts.links,
      projects,
    },
    invalidLinks,
  };
};

export const { content: siteContent, invalidLinks } =
  validateSiteContent(rawSiteContent);
