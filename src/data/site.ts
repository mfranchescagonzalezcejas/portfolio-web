export type Locale = "en" | "es";

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

export type NavItem = {
  label: string;
  href: string;
};

export type SiteContent = {
  locale: Locale;
  meta: {
    title: string;
    description: string;
  };
  skipLink: string;
  nav: NavItem[];
  languageSwitcher: {
    label: string;
    options: Record<Locale, string>;
  };
  header: {
    ariaLabel: string;
    homeLabel: string;
  };
  hero: {
    shortName: string;
    name: string;
    eyebrow: string;
    tagline: string;
    summary: string;
    panelLabel: string;
    panelTitle: string;
    panelText: string;
    profileLinksLabel: string;
    panelAriaLabel: string;
    skills: string[];
  };
  summary: {
    eyebrow: string;
    title: string;
    body: string;
    workingStyleLabel: string;
    cleanArchitectureTitle: string;
    cleanArchitectureBody: string;
    qualityMindsetTitle: string;
    qualityMindsetBody: string;
    skills: string[];
  };
  experienceSection: {
    eyebrow: string;
    title: string;
  };
  projectsSection: {
    eyebrow: string;
    title: string;
    featuredLabel: string;
    linksLabel: string;
  };
  educationSection: {
    eyebrow: string;
    title: string;
  };
  contactSection: {
    eyebrow: string;
    title: string;
    body: string;
    ariaLabel: string;
  };
  experience: Experience[];
  projects: Project[];
  education: Education[];
  contacts: LinkItem[];
};

export type InvalidLink = {
  locale: Locale;
  area: "contact" | "project";
  owner: string;
  label: string;
  href: string;
};

const allowedProtocols = new Set(["https:", "http:"]);

const sharedContacts: LinkItem[] = [
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
];

const rawSiteContent = {
  en: {
    locale: "en",
    meta: {
      title: "Mercedes Franchesca Gonzalez Cejas | Personal Portfolio",
      description:
        "Software Engineer specialized in Flutter and mobile development.",
    },
    skipLink: "Skip to content",
    nav: [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
      { label: "Education", href: "#education" },
    ],
    languageSwitcher: {
      label: "Change language",
      options: { en: "EN", es: "ES" },
    },
    header: {
      ariaLabel: "Primary navigation",
      homeLabel: "Mercy home",
    },
    hero: {
      shortName: "Mercy",
      name: "Mercedes Franchesca Gonzalez Cejas",
      eyebrow: "Software Engineer · Flutter & Mobile",
      tagline:
        "Software Engineer specialized in Flutter and mobile development.",
      summary:
        "I build production-ready mobile experiences with clean architecture, reliable delivery practices, and a strong product mindset.",
      panelLabel: "Signal",
      panelTitle: "Mobile delivery + product quality",
      panelText:
        "Flutter-first profile with production experience, QA awareness, native Android/iOS foundations, and full-stack project ownership.",
      profileLinksLabel: "Primary profile links",
      panelAriaLabel: "Professional focus",
      skills: ["Flutter", "Kotlin", "Swift", "REST APIs", "QA validation"],
    },
    summary: {
      eyebrow: "About",
      title:
        "I care about mobile products that stay maintainable while teams keep moving.",
      body: "I’m a Software Engineer specialized in Flutter and mobile development, with hands-on experience shipping production apps and contributing across UI, business logic, REST API integration, testing, and QA validation. My background combines mobile delivery, clean architecture, and practical product thinking while I keep growing across Android/Kotlin, iOS/Swift, and full-stack foundations through projects like InkScroller.",
      workingStyleLabel: "Working style",
      cleanArchitectureTitle: "Clean architecture",
      cleanArchitectureBody:
        "Readable systems, layered thinking, repository patterns, and maintainable delivery.",
      qualityMindsetTitle: "Quality mindset",
      qualityMindsetBody:
        "Testing, functional validation, Jira workflows, and release confidence from QA experience.",
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
    experienceSection: {
      eyebrow: "Experience",
      title: "Production context, not just side projects.",
    },
    projectsSection: {
      eyebrow: "Projects",
      title: "Selected proof of work.",
      featuredLabel: "Featured",
      linksLabel: "Project links",
    },
    educationSection: {
      eyebrow: "Education",
      title: "Engineering foundation with ongoing AI development training.",
    },
    contactSection: {
      eyebrow: "Contact",
      title: "Let’s connect",
      body: "No public email for now — LinkedIn, GitLab, and GitHub are the contact paths.",
      ariaLabel: "Contact and social links",
    },
    contacts: sharedContacts,
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
  },
  es: {
    locale: "es",
    meta: {
      title: "Mercedes Franchesca Gonzalez Cejas | Portfolio personal",
      description:
        "Ingeniera de software especializada en Flutter y desarrollo móvil.",
    },
    skipLink: "Saltar al contenido",
    nav: [
      { label: "Sobre mí", href: "#about" },
      { label: "Experiencia", href: "#experience" },
      { label: "Proyectos", href: "#projects" },
      { label: "Educación", href: "#education" },
    ],
    languageSwitcher: {
      label: "Cambiar idioma",
      options: { en: "EN", es: "ES" },
    },
    header: {
      ariaLabel: "Navegación principal",
      homeLabel: "Inicio de Mercy",
    },
    hero: {
      shortName: "Mercy",
      name: "Mercedes Franchesca Gonzalez Cejas",
      eyebrow: "Ingeniera de software · Flutter & Mobile",
      tagline:
        "Ingeniera de software especializada en Flutter y desarrollo móvil.",
      summary:
        "Construyo experiencias móviles listas para producción con arquitectura limpia, prácticas de entrega confiables y mentalidad de producto.",
      panelLabel: "Señal",
      panelTitle: "Entrega mobile + calidad de producto",
      panelText:
        "Perfil centrado en Flutter, con experiencia en producción, mirada de QA, bases nativas Android/iOS y ownership full-stack en proyectos.",
      profileLinksLabel: "Enlaces principales del perfil",
      panelAriaLabel: "Foco profesional",
      skills: ["Flutter", "Kotlin", "Swift", "REST APIs", "Validación QA"],
    },
    summary: {
      eyebrow: "Sobre mí",
      title:
        "Me importan los productos móviles que siguen siendo mantenibles mientras los equipos avanzan.",
      body: "Soy Ingeniera de Software especializada en Flutter y desarrollo móvil, con experiencia práctica publicando apps en producción y aportando en UI, lógica de negocio, integración con REST APIs, testing y validación QA. Mi perfil combina entrega mobile, arquitectura limpia y pensamiento de producto mientras sigo creciendo en Android/Kotlin, iOS/Swift y bases full-stack a través de proyectos como InkScroller.",
      workingStyleLabel: "Forma de trabajar",
      cleanArchitectureTitle: "Arquitectura limpia",
      cleanArchitectureBody:
        "Sistemas legibles, pensamiento por capas, patrones de repositorio y entrega mantenible.",
      qualityMindsetTitle: "Mentalidad de calidad",
      qualityMindsetBody:
        "Testing, validación funcional, flujos con Jira y confianza de release desde experiencia en QA.",
      skills: [
        "Flutter",
        "Dart",
        "Kotlin",
        "Swift",
        "REST APIs",
        "Validación QA",
        "CI/CD",
      ],
    },
    experienceSection: {
      eyebrow: "Experiencia",
      title: "Contexto de producción, no solo proyectos personales.",
    },
    projectsSection: {
      eyebrow: "Proyectos",
      title: "Pruebas seleccionadas de trabajo real.",
      featuredLabel: "Destacado",
      linksLabel: "Enlaces del proyecto",
    },
    educationSection: {
      eyebrow: "Educación",
      title: "Base de ingeniería con formación actual en desarrollo de IA.",
    },
    contactSection: {
      eyebrow: "Contacto",
      title: "Conectemos",
      body: "Sin email público por ahora — LinkedIn, GitLab y GitHub son las vías de contacto.",
      ariaLabel: "Enlaces de contacto y redes",
    },
    contacts: sharedContacts,
    experience: [
      {
        company: "Worldline",
        role: "Native Apps Developer",
        period: "2023–2026 · Barcelona",
        description:
          "Trabajo mobile en producción con Flutter, Android, iOS, validación QA y entrega orientada a releases.",
        highlights: [
          "Desarrolladora principal en La Mercè 2024, una app Flutter publicada en producción.",
          "Construí la funcionalidad de calidad del aire para Barcelona a la Butxaca y contribuí a mantenimiento/evolución.",
          "Apoyé la validación QA para Nescafé Dolce Gusto con Jira, planes de prueba y flujos en dispositivos.",
        ],
      },
      {
        company: "Avanade",
        role: "Front-End Developer Intern",
        period: "2021–2022 · Barcelona",
        description:
          "Primera experiencia profesional construyendo soluciones para cliente con PowerApps y herramientas del ecosistema Microsoft.",
        highlights: [
          "Contexto inicial de frontend mantenido en segundo plano para preservar la narrativa mobile-first.",
        ],
      },
    ],
    projects: [
      {
        name: "InkScroller",
        description:
          "Lector mobile de manga full-stack construido con Flutter, FastAPI, PostgreSQL, Firebase Auth, Cloud Run, Riverpod y GitHub Actions.",
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
          "App Flutter publicada en producción para un evento cultural de Barcelona, desarrollada como parte de entrega mobile real.",
        links: [],
      },
      {
        name: "Barcelona a la Butxaca",
        description:
          "App mobile pública donde contribuí a la funcionalidad de calidad del aire y al mantenimiento/evolución del producto.",
        links: [],
      },
      {
        name: "Portfolio Web",
        description:
          "Landing estática en Astro, diseñada como portfolio MVP pequeño, accesible y desplegable con Vercel.",
        links: [],
      },
    ],
    education: [
      {
        title: "Ingeniería de Telecomunicaciones",
        meta: "Universitat Pompeu Fabra · Barcelona",
      },
      {
        title: "Máster en Desarrollo de IA",
        meta: "BIG School · en curso",
      },
      {
        title: "Inglés B2",
        meta: "EOI Vall d’Hebron · español y catalán nativos",
      },
    ],
  },
} satisfies Record<Locale, SiteContent>;

export const locales = ["en", "es"] as const;
export const defaultLocale: Locale = "en";

export const isLocale = (locale: string | undefined): locale is Locale =>
  locales.includes(locale as Locale);

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
  locale: Locale,
  links: LinkItem[],
  context: Omit<InvalidLink, "locale" | "label" | "href">,
): { links: LinkItem[]; invalidLinks: InvalidLink[] } => {
  const invalidLinks: InvalidLink[] = [];
  const validLinks = links.flatMap((link) => {
    const normalized = normalizeLink(link);

    if (isValidLink(normalized)) {
      return [normalized];
    }

    invalidLinks.push({
      locale,
      ...context,
      label: link.label,
      href: link.href,
    });

    return [];
  });

  return { links: validLinks, invalidLinks };
};

const validateSiteContent = (content: SiteContent) => {
  const contacts = validateLinks(content.locale, content.contacts, {
    area: "contact",
    owner: "contacts",
  });

  const projectResults = content.projects.map((project) => ({
    ...project,
    ...validateLinks(content.locale, project.links, {
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
      `Dropped ${invalidLinks.length} invalid configured link(s) from ${content.locale} site content before render.`,
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

const validatedContentEntries = locales.map(
  (locale) =>
    [locale, validateSiteContent(rawSiteContent[locale]).content] as const,
);

export const siteContentByLocale = Object.fromEntries(
  validatedContentEntries,
) as Record<Locale, SiteContent>;

export const invalidLinks = locales.flatMap(
  (locale) => validateSiteContent(rawSiteContent[locale]).invalidLinks,
);

export const siteContent = siteContentByLocale[defaultLocale];
