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

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
};

export type Education = {
  title: string;
  meta: string;
};

export type SiteContent = {
  hero: {
    shortName: string;
    name: string;
    tagline: string;
    summary: string;
  };
  summary: {
    eyebrow: string;
    title: string;
    body: string;
    skills: string[];
  };
  experience: Experience[];
  projects: Project[];
  education: Education[];
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
    shortName: "Mercy",
    name: "Mercedes Franchesca Gonzalez Cejas",
    tagline: "Software Engineer specialized in Flutter and mobile development.",
    summary:
      "I build production-ready mobile experiences with clean architecture, reliable delivery practices, and a strong product mindset.",
  },
  summary: {
    eyebrow: "About",
    title:
      "I care about mobile products that stay maintainable while teams keep moving.",
    body: "I’m a Software Engineer specialized in Flutter and mobile development, with hands-on experience shipping production apps and contributing across UI, business logic, REST API integration, testing, and QA validation. My background combines mobile delivery, clean architecture, and practical product thinking while I keep growing across Android/Kotlin, iOS/Swift, and full-stack foundations through projects like InkScroller.",
    skills: [
      "Flutter",
      "Dart",
      "Kotlin",
      "Swift",
      "REST APIs",
      "QA validation",
      "CI/CD",
    ],
  },
  contacts: [
    {
      label: "GitLab",
      href: "https://gitlab.com/mfranchescagonzalezcejas/",
      external: true,
    },
    {
      label: "GitHub",
      href: "https://github.com/mfranchescagonzalezcejas",
      external: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mercedes-franchesca-gonzalez-cejas-7555a7177",
      external: true,
    },
  ],
  experience: [
    {
      company: "Worldline",
      role: "Native Apps Developer",
      period: "2023–2026 · Barcelona",
      description:
        "Production mobile work across Flutter, Android, iOS, QA validation, and release-focused delivery.",
      highlights: [
        "Main developer on La Mercè 2024, a Flutter app released to production.",
        "Built the air quality feature for Barcelona a la Butxaca and contributed to maintenance/evolution.",
        "Supported QA validation for Nescafé Dolce Gusto with Jira, test plans, and device flows.",
      ],
    },
    {
      company: "Avanade",
      role: "Front-End Developer Intern",
      period: "2021–2022 · Barcelona",
      description:
        "Early professional experience building client-facing solutions with PowerApps and Microsoft ecosystem tools.",
      highlights: [
        "Frontend internship context kept secondary to preserve the mobile-first portfolio narrative.",
      ],
    },
  ],
  projects: [
    {
      name: "InkScroller",
      description:
        "A full-stack mobile manga reader built with Flutter, FastAPI, PostgreSQL, Firebase Auth, Cloud Run, Riverpod, and GitHub Actions.",
      featured: true,
      links: [
        {
          label: "Frontend",
          href: "https://github.com/mfranchescagonzalezcejas/inkscroller_frontend",
          external: true,
        },
        {
          label: "Backend",
          href: "https://github.com/mfranchescagonzalezcejas/Inkscroller_backend",
          external: true,
        },
      ],
    },
    {
      name: "La Mercè 2024",
      description:
        "A Flutter app released to production for a Barcelona cultural event, developed as part of real mobile product delivery.",
      links: [],
    },
    {
      name: "Barcelona a la Butxaca",
      description:
        "A public mobile app where I contributed to the air quality feature and ongoing maintenance and product evolution.",
      links: [],
    },
    {
      name: "Portfolio Web",
      description:
        "This static Astro landing page, designed as a small, accessible, deployable portfolio MVP with Vercel deployment.",
      links: [],
    },
  ],
  education: [
    {
      title: "Telecommunications Engineering",
      meta: "Universitat Pompeu Fabra · Barcelona",
    },
    {
      title: "AI Development Master",
      meta: "BIG School · in progress",
    },
    {
      title: "English B2",
      meta: "EOI Vall d’Hebron · Spanish and Catalan native",
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
  external: link.external ?? externalFromHref(link.href.trim()),
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
