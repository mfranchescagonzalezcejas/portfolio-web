export type Locale = "en" | "es";

export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
  ctaLabel?: string;
};

export type Project = {
  name: string;
  description: string;
  shortDescription: string;
  stack: string[];
  demonstrates: string;
  featured?: boolean;
  links: LinkItem[];
  mockupLabels?: string[];
  mockupStatus?: string;
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

export type NavItem = {
  label: string;
  href: string;
};

export type SectionHeading = {
  eyebrow: string;
  title: string;
};

export type ExperienceSectionHeading = SectionHeading & {
  stackLabel: string;
  linksLabel: string;
};

export type ValueIconName =
  | "smartphone"
  | "layers"
  | "git-branch"
  | "check-circle";

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
  challengeLabel: string;
  approachLabel: string;
  outcomeLabel: string;
};

export type HeroContent = {
  shortName: string;
  name: string;
  greeting: string;
  eyebrow: string;
  tagline: string;
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
  title: string;
  body: string;
  ariaLabel: string;
};

export type CaseStudy = {
  title: string;
  scope: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  stack: string[];
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
    caseStudyCtaLabel: string;
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
    mockupFallback: string;
  };
  caseStudiesSection: CaseStudySectionHeading;
  educationSection: SectionHeading;
  contactSection: ContactSection;
  footerText: string;
  experience: Experience[];
  projects: Project[];
  caseStudies: CaseStudy[];
  education: Education[];
  skillsSection: SectionHeading;
  contacts: LinkItem[];
};

export type InvalidLink = {
  locale: Locale;
  area: "contact" | "project" | "experience";
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

const rawSiteContent: Record<Locale, SiteContent> = {
  en: {
    locale: "en",
    meta: {
      title: "DevDigi | Mercedes Franchesca Gonzalez Cejas",
      description:
        "DevDigi is my personal developer brand. Mobile Developer focused on Flutter, Android, and iOS delivery.",
    },
    skipLink: "Skip to content",
    nav: [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Contact", href: "#contact" },
    ],
    languageSwitcher: {
      label: "Change language",
      options: { en: "EN", es: "ES" },
      hint: {
        en: "Switch to English",
        es: "Switch to Spanish",
      },
    },
    header: {
      ariaLabel: "Primary",
      homeLabel: "DevDigi — back to top",
      ctaLabel: "Contact me",
      themeToggle: {
        switchToLight: "Switch to light mode",
        switchToDark: "Switch to dark mode",
      },
    },
    hero: {
      shortName: "Mercy",
      name: "Mercedes Franchesca Gonzalez Cejas",
      greeting: "Hi, I'm",
      eyebrow: "Open to mobile roles · Barcelona / Remote",
      tagline: "I build polished mobile apps for real users.",
      summary:
        "Mobile Developer focused on Flutter, Android and iOS. I build maintainable, production-ready applications with clean architecture, REST API integration, CI/CD awareness and a strong product quality mindset.",
      panelLabel: "Signal",
      panelTitle: "Production-ready mobile delivery",
      panelText:
        "DevDigi combines Flutter, Android, iOS, API integration, and QA-minded engineering so teams can move quickly without losing maintainability.",
      profileLinksLabel: "Primary profile links",
      ctaLabel: "Contact me",
      quickCtaLabel: "View Projects",
      quickCtaHref: "#projects",
      panelAriaLabel: "Professional focus",
      cvLabel: "Download CV",
      visual: {
        ariaLabel: "Product demo mockup",
        readingEyebrow: "Reading now",
        readingTitle: "Chapter 47",
        stackLabel: "Flutter · Riverpod",
        deliveryTitle: "Production-ready",
        deliverySubtitle: "mobile delivery",
        architectureTitle: "Clean Architecture",
        architectureSubtitle: "Repository Pattern",
      },
      skills: [
        "Flutter",
        "Dart",
        "Kotlin",
        "Swift",
        "Firebase",
        "REST APIs",
        "CI/CD",
        "QA",
      ],
    },
    values: {
      eyebrow: "What I do",
      title: "What I bring as a mobile developer",
      description:
        "Practical engineering that turns into shipped, maintainable mobile products.",
      cards: [
        {
          title: "Production mobile apps",
          body: "Experience contributing to live apps on Google Play and the App Store, from feature work to release validation.",
          icon: "smartphone",
        },
        {
          title: "Clean architecture",
          body: "Layered codebases, repository pattern and dependency injection across Flutter, Kotlin and Swift projects.",
          icon: "layers",
        },
        {
          title: "Release & CI/CD workflows",
          body: "Comfortable with Jenkins pipelines, GitLab release tags and GitHub Actions to ship safely and repeatably.",
          icon: "git-branch",
        },
        {
          title: "QA & product validation",
          body: "Strong debugging mindset, attention to edge cases and collaboration with QA and product to ensure quality.",
          icon: "check-circle",
        },
      ],
    },
    summary: {
      eyebrow: "About",
      titleLines: ["Software engineer,", "mobile by craft."],
      profile: {
        initials: "MG",
        name: "Mercedes F. Gonzalez Cejas",
        location: "Barcelona, Spain",
      },
      paragraphs: [
        [
          {
            text: "Software Engineer specialized in mobile development",
            emphasis: true,
          },
          {
            text: ", with experience maintaining and delivering production mobile applications used by real users.",
          },
        ],
        [
          { text: "I work mainly with " },
          { text: "Flutter", emphasis: true },
          { text: ", " },
          { text: "Android / Kotlin", emphasis: true },
          { text: " and " },
          { text: "iOS / Swift", emphasis: true },
          {
            text: ", and I care deeply about clean architecture, maintainability, API integration, debugging and product quality.",
          },
        ],
        [
          { text: "DevDigi", emphasis: true },
          {
            text: " is my personal developer brand, where I showcase my mobile work, projects and technical growth — not an agency, just my craft as a mobile engineer.",
          },
        ],
      ],
      badgesLabel: "Mobile stack and delivery strengths",
      badges: [
        "Flutter",
        "Kotlin",
        "Swift",
        "Clean Architecture",
        "REST APIs",
        "CI/CD",
      ],
      skills: [
        "Flutter",
        "Dart",
        "Kotlin",
        "Swift",
        "REST APIs",
        "Jenkins",
        "GitLab",
        "Jira",
        "CI/CD",
      ],
    },
    experienceSection: {
      eyebrow: "Experience",
      title: "Experience building real mobile apps",
      stackLabel: "Technology stack for {role} at {company}",
      linksLabel: "Public links for {role} at {company}",
    },
    featuredSection: {
      eyebrow: "• Featured project",
      title: "Inkscroller",
      kicker: "Full-stack manga reader app",
      linksLabel: "Project links",
      stackLabel: "{project} technology stack",
      linkAriaLabel: "{label} for {project}",
      primaryCtaLabel: "Frontend repo",
      secondaryCtaLabel: "Backend repo",
      caseStudyCtaLabel: "Case study",
    },
    allProjectsSection: {
      eyebrow: "• Projects",
      title: "Selected work",
      description:
        "A mix of full-stack mobile, native Android and iOS, and web — each one focused on craft.",
      linksLabel: "Project links",
      stackLabel: "{project} technology stack",
      proofLabel: "Demonstrates",
      repositoryLabel: "View repo",
      repositoryAriaLabel: "{repository}: {link} for {project}",
      mockupFallback: "App\nscreenshots\ncoming soon",
    },
    caseStudiesSection: {
      eyebrow: "Case studies",
      title: "Selected case studies",
      challengeLabel: "Challenge:",
      approachLabel: "Approach:",
      outcomeLabel: "Outcome:",
    },
    educationSection: {
      eyebrow: "Education",
      title: "Engineering foundation with current AI studies.",
    },
    skillsSection: {
      eyebrow: "Skills",
      title: "Tools and engineering stack",
    },
    contactSection: {
      eyebrow: "Contact",
      title: "Let’s build great mobile products.",
      body: "Open to Mobile Developer, Flutter Developer, and Android Developer opportunities in Barcelona, hybrid, or remote.",
      ariaLabel: "Contact and social links",
    },
    footerText: "Built with care in Barcelona",
    caseStudies: [
      {
        title: "La Mercè event app delivery",
        scope: "Public product for Barcelona cultural event",
        summary:
          "Led the engineering handoff for a highly visible mobile application used by event visitors with strict operational windows.",
        challenge:
          "Coordinate multi-platform releases across Flutter and Android with stable updates on short cycles.",
        approach:
          "Mapped responsibilities into clear release steps, validated data consistency across CI environments, and maintained clean boundaries across modules.",
        outcome:
          "Improved rollout confidence by reducing release regressions during the operational period.",
        stack: ["Flutter", "Android", "Clean Architecture", "CI/CD"],
      },
    ],
    contacts: sharedContacts,
    experience: [
      {
        company: "Worldline Global Services",
        role: "Native Apps Developer",
        period: "Barcelona · Apr 2024 – Jan 2026",
        highlights: [
          "Contributed to production mobile applications across Flutter, Android and iOS.",
          "Worked on La Mercè, a public Flutter app released to production for a major Barcelona cultural event.",
          "Implemented the air quality feature for Barcelona a la Butxaca, a live public app.",
          "Supported Jenkins-based CI/CD workflows, GitLab release tags, Google Play and App Store release validation.",
          "Supported manual QA for Nescafé Dolce Gusto, using Jira, structured test plans and test cases to validate reconnection and brew flows with NEO1 and NEO2 machines.",
          "Participated in QA validation, debugging, Jira-based workflows and Agile/Scrum delivery cycles.",
        ],
        stack: [
          "Flutter",
          "Dart",
          "Android",
          "Kotlin",
          "iOS",
          "Swift",
          "Jenkins",
          "GitLab",
          "Jira",
          "Google Play",
          "App Store",
          "QA",
          "Test Plans",
        ],
        links: [
          {
            label: "La Mercè · Google Play",
            href: "https://play.google.com/store/apps/details?id=cat.bcn.festamerce&pcampaignid=web_share",
            external: true,
          },
          {
            label: "Barcelona a la Butxaca · Google Play",
            href: "https://play.google.com/store/apps/details?id=cat.bcn.butxaca&pcampaignid=web_share",
            external: true,
          },
          {
            label: "Nescafé Dolce Gusto · Google Play",
            href: "https://play.google.com/store/apps/details?id=com.nestle.nescafe.dolcegusto&pcampaignid=web_share",
            external: true,
          },
        ],
      },
      {
        company: "Worldline Global Services",
        role: "Native Apps Developer Intern",
        period: "Barcelona · Apr 2023 – Apr 2024",
        highlights: [
          "Completed mobile technical training across Android, iOS, Flutter, testing, and validation workflows.",
          "Built an Android practice app for income, spending, and savings with Kotlin, Jetpack Compose, Koin, and encrypted local preferences.",
          "Created UIKit and SwiftUI character browser apps to compare native iOS patterns with the Jikan API.",
          "Built a Flutter bridge app to connect mobile concepts across platforms.",
          "Practiced testing, validation, incident resolution, and Jira-based tracking in delivery workflows.",
        ],
        stack: [
          "Android",
          "Kotlin",
          "Jetpack Compose",
          "EncryptedSharedPreferences",
          "Koin",
          "iOS",
          "UIKit",
          "SwiftUI",
          "Flutter",
          "Dart",
          "Testing",
          "Validation",
          "Jira",
        ],
      },
      {
        company: "Avanade",
        role: "Front-End Developer Intern",
        period: "Barcelona · Oct 2021 – Apr 2022",
        highlights: [
          "Built and customized internal solutions using PowerApps and tools from the Microsoft ecosystem.",
          "Collaborated with cross-functional teams to deliver front-end features for business workflows.",
        ],
        stack: ["PowerApps", "Microsoft 365", "Power Platform"],
      },
    ],
    projects: [
      {
        name: "Inkscroller",
        description:
          "Full-stack manga reader composed of a Flutter frontend and a FastAPI backend for catalogue discovery, reader flows, and authenticated preferences.",
        shortDescription:
          "Full-stack manga reader with Flutter frontend and FastAPI backend.",
        stack: [
          "Flutter",
          "Dart",
          "FastAPI",
          "Python",
          "PostgreSQL",
          "Firebase Auth",
          "Railway",
          "Riverpod",
          "Jikan API",
          "MangaDex",
        ],
        demonstrates:
          "End-to-end mobile product structure across a Flutter app, REST API, external manga data sources, and authenticated preferences.",
        featured: true,
        mockupLabels: ["Library", "Manga detail", "Reader"],
        mockupStatus: "Screenshot\ncoming soon",
        links: [
          {
            label: "Frontend",
            ctaLabel: "Frontend repo",
            href: "https://github.com/mfranchescagonzalezcejas/inkscroller_frontend",
            external: true,
          },
          {
            label: "Backend",
            ctaLabel: "Backend repo",
            href: "https://github.com/mfranchescagonzalezcejas/Inkscroller_backend",
            external: true,
          },
        ],
      },
      {
        name: "Inkscroller Frontend",
        description:
          "Flutter frontend for Inkscroller, a manga reading experience focused on discoverability, personalized reading preferences, and an adaptive reader workflow.",
        shortDescription:
          "Flutter frontend for a manga reading experience with personalized reading preferences.",
        stack: [
          "Flutter",
          "Dart",
          "Riverpod",
          "get_it",
          "Dio",
          "GoRouter",
          "Firebase Auth",
          "Firebase Analytics",
        ],
        demonstrates:
          "Public-ready Flutter codebase, Clean Architecture, Screaming Architecture and Firebase-backed app setup.",
        links: [
          {
            label: "Repository",
            href: "https://github.com/mfranchescagonzalezcejas/inkscroller_frontend",
            external: true,
          },
        ],
      },
      {
        name: "Inkscroller Backend",
        description:
          "FastAPI REST API backend for Inkscroller that aggregates MangaDex and Jikan data and provides authenticated reading preferences with Firebase Auth.",
        shortDescription:
          "FastAPI backend for Inkscroller with MangaDex/Jikan integration, Firebase Auth, and persistence.",
        stack: [
          "FastAPI",
          "Python",
          "httpx",
          "Pydantic",
          "Firebase Auth",
          "PostgreSQL",
          "Railway",
        ],
        demonstrates:
          "API design, authenticated endpoints, external API aggregation, caching, and Railway deployment.",
        links: [
          {
            label: "Repository",
            href: "https://github.com/mfranchescagonzalezcejas/Inkscroller_backend",
            external: true,
          },
        ],
      },
      {
        name: "AppSwiftUI",
        description:
          "SwiftUI character browser that consumes the Jikan API and displays manga/anime character data in a native declarative interface.",
        shortDescription:
          "SwiftUI character browser using the Jikan API, native navigation, and reactive state.",
        stack: [
          "Swift",
          "SwiftUI",
          "URLSession",
          "Jikan API",
          "ObservableObject",
        ],
        demonstrates:
          "Native iOS fundamentals with SwiftUI, list-to-detail navigation, API mapping, and state handling.",
        links: [
          {
            label: "Repository",
            href: "https://github.com/mfranchescagonzalezcejas/AppSwiftUI",
            external: true,
          },
        ],
      },
      {
        name: "AppUIKit",
        description:
          "UIKit character browser that consumes the Jikan API and displays manga/anime character data in a native iOS interface.",
        shortDescription:
          "UIKit character browser using URLSession, custom cells, and list-to-detail navigation.",
        stack: ["Swift", "UIKit", "URLSession", "Jikan API"],
        demonstrates:
          "Native iOS fundamentals with UIKit, MVC-style structure, networking, and asynchronous image handling.",
        links: [
          {
            label: "Repository",
            href: "https://github.com/mfranchescagonzalezcejas/AppUIKit",
            external: true,
          },
        ],
      },
      {
        name: "AppAndroid",
        description:
          "Android practice app for managing income, spending, and savings with Kotlin, Jetpack Compose, Koin, and encrypted local preferences.",
        shortDescription:
          "Android practice app for income, spending, and savings with Jetpack Compose and local persistence.",
        stack: [
          "Kotlin",
          "Jetpack Compose",
          "Material 3",
          "Navigation Compose",
          "Koin",
          "EncryptedSharedPreferences",
        ],
        demonstrates:
          "Modern Android fundamentals, Compose navigation, ViewModels, dependency injection, and layered UI/domain/data structure.",
        links: [
          {
            label: "Repository",
            href: "https://github.com/mfranchescagonzalezcejas/AppAndroid",
            external: true,
          },
        ],
      },
    ],
    education: [
      {
        title: "Telecommunications Engineering",
        meta: "Universitat Pompeu Fabra · Barcelona",
      },
      {
        title: "AI Development Master",
        meta: "BIG School · In progress",
      },
      {
        title: "English: B2",
        meta: "EOI Vall d’Hebron · Spanish and Catalan native",
      },
    ],
  },
  es: {
    locale: "es",
    meta: {
      title: "DevDigi | Mercedes Franchesca Gonzalez Cejas",
      description:
        "DevDigi es la marca personal de Mercedes; Ingeniería móvil con foco en Flutter, Android e iOS.",
    },
    skipLink: "Saltar al contenido",
    nav: [
      { label: "Sobre mí", href: "#about" },
      { label: "Experiencia", href: "#experience" },
      { label: "Proyectos", href: "#projects" },
      { label: "Competencias", href: "#skills" },
      { label: "Contacto", href: "#contact" },
    ],
    languageSwitcher: {
      label: "Cambiar idioma",
      options: { en: "EN", es: "ES" },
      hint: {
        en: "Cambiar a inglés",
        es: "Cambiar a español",
      },
    },
    header: {
      ariaLabel: "Principal",
      homeLabel: "DevDigi — volver arriba",
      ctaLabel: "Contáctame",
      themeToggle: {
        switchToLight: "Cambiar a modo claro",
        switchToDark: "Cambiar a modo oscuro",
      },
    },
    hero: {
      shortName: "Mercy",
      name: "Mercedes Franchesca Gonzalez Cejas",
      greeting: "Hola, soy",
      eyebrow: "Disponible para roles mobile · Barcelona / Remoto",
      tagline: "Construyo apps móviles pulidas para usuarios reales.",
      summary:
        "Mobile Developer enfocada en Flutter, Android e iOS. Construyo aplicaciones mantenibles y listas para producción con arquitectura limpia, integración REST API, criterio de CI/CD y una mentalidad fuerte de calidad de producto.",
      panelLabel: "Señal",
      panelTitle: "Entrega móvil en producción",
      panelText:
        "En DevDigi combino Flutter, Android, iOS, integración de APIs y QA para que los productos puedan escalar sin perder mantenibilidad.",
      profileLinksLabel: "Enlaces principales del perfil",
      ctaLabel: "Contáctame",
      quickCtaLabel: "Ver proyectos",
      quickCtaHref: "#projects",
      panelAriaLabel: "Foco profesional",
      cvLabel: "Descargar CV",
      visual: {
        ariaLabel: "Mockup de demo del producto",
        readingEyebrow: "Reading now",
        readingTitle: "Chapter 47",
        stackLabel: "Flutter · Riverpod",
        deliveryTitle: "Listo para producción",
        deliverySubtitle: "entrega mobile",
        architectureTitle: "Arquitectura limpia",
        architectureSubtitle: "Patrón Repository",
      },
      skills: [
        "Flutter",
        "Dart",
        "Kotlin",
        "Swift",
        "Firebase",
        "APIs REST",
        "CI/CD",
        "QA",
      ],
    },
    values: {
      eyebrow: "Qué hago",
      title: "Lo que aporto como desarrolladora móvil",
      description:
        "Ingeniería práctica que se traduce en productos móviles entregados y mantenibles.",
      cards: [
        {
          title: "Apps móviles en producción",
          body: "Experiencia contribuyendo a apps activas en Google Play y la App Store, desde features hasta validación de releases.",
          icon: "smartphone",
        },
        {
          title: "Arquitectura limpia",
          body: "Bases de código por capas, patrón repository e inyección de dependencias en proyectos de Flutter, Kotlin y Swift.",
          icon: "layers",
        },
        {
          title: "Releases y CI/CD",
          body: "Cómoda con pipelines de Jenkins, tags de release en GitLab y GitHub Actions para entregar de forma segura y repetible.",
          icon: "git-branch",
        },
        {
          title: "QA y validación de producto",
          body: "Mentalidad fuerte de debugging, atención a casos límite y colaboración con QA y producto para asegurar calidad.",
          icon: "check-circle",
        },
      ],
    },
    summary: {
      eyebrow: "Sobre mí",
      titleLines: ["Ingeniera de software,", "mobile por oficio."],
      profile: {
        initials: "MG",
        name: "Mercedes F. Gonzalez Cejas",
        location: "Barcelona, España",
      },
      paragraphs: [
        [
          {
            text: "Ingeniera de Software especializada en desarrollo móvil",
            emphasis: true,
          },
          {
            text: ", con experiencia manteniendo y entregando aplicaciones móviles en producción usadas por personas reales.",
          },
        ],
        [
          { text: "Trabajo principalmente con " },
          { text: "Flutter", emphasis: true },
          { text: ", " },
          { text: "Android / Kotlin", emphasis: true },
          { text: " e " },
          { text: "iOS / Swift", emphasis: true },
          {
            text: ", y me importa profundamente la arquitectura limpia, la mantenibilidad, la integración con APIs, el debugging y la calidad de producto.",
          },
        ],
        [
          { text: "DevDigi", emphasis: true },
          {
            text: " es mi marca personal como desarrolladora, donde muestro mi trabajo mobile, proyectos y crecimiento técnico — no una agencia, solo mi oficio como ingeniera móvil.",
          },
        ],
      ],
      badgesLabel: "Stack mobile y fortalezas de entrega",
      badges: [
        "Flutter",
        "Kotlin",
        "Swift",
        "Clean Architecture",
        "REST APIs",
        "CI/CD",
      ],
      skills: [
        "Flutter",
        "Dart",
        "Kotlin",
        "Swift",
        "REST APIs",
        "Jenkins",
        "GitLab",
        "Jira",
        "CI/CD",
      ],
    },
    experienceSection: {
      eyebrow: "Experiencia",
      title: "Experiencia construyendo apps móviles reales",
      stackLabel: "Tecnologías de {role} en {company}",
      linksLabel: "Enlaces públicos de {role} en {company}",
    },
    featuredSection: {
      eyebrow: "• Proyecto destacado",
      title: "Inkscroller",
      kicker: "App lectora de manga full-stack",
      linksLabel: "Enlaces del proyecto",
      stackLabel: "Tecnologías de {project}",
      linkAriaLabel: "{label} de {project}",
      primaryCtaLabel: "Repo frontend",
      secondaryCtaLabel: "Repo backend",
      caseStudyCtaLabel: "Caso de estudio",
    },
    allProjectsSection: {
      eyebrow: "• Proyectos",
      title: "Trabajos seleccionados",
      description:
        "Una mezcla de mobile full-stack, Android e iOS nativos y web — cada uno enfocado en el oficio.",
      linksLabel: "Enlaces del proyecto",
      stackLabel: "Tecnologías de {project}",
      proofLabel: "Demuestra",
      repositoryLabel: "Ver repo",
      repositoryAriaLabel: "{repository}: {link} de {project}",
      mockupFallback: "Capturas\nde la app\npróximamente",
    },
    caseStudiesSection: {
      eyebrow: "Casos",
      title: "Casos seleccionados",
      challengeLabel: "Reto:",
      approachLabel: "Enfoque:",
      outcomeLabel: "Resultado:",
    },
    educationSection: {
      eyebrow: "Educación",
      title: "Base de ingeniería y formación continuada en IA.",
    },
    skillsSection: {
      eyebrow: "Competencias",
      title: "Herramientas y stack de ingeniería",
    },
    contactSection: {
      eyebrow: "Contacto",
      title: "Construyamos productos móviles excelentes.",
      body: "Abierta a roles como Mobile Developer, Flutter Developer y Android Developer en Barcelona, híbrido o remoto.",
      ariaLabel: "Enlaces de contacto",
    },
    footerText: "Desarrollado con cariño en Barcelona",
    caseStudies: [
      {
        title: "Entrega del evento La Mercè",
        scope: "Producto público para evento cultural de Barcelona",
        summary:
          "Coordiné la entrega de una app móvil con gran visibilidad y ventanas de despliegue estrictas.",
        challenge:
          "Gestionar releases multi-plataforma bajo presión de tiempo y estabilidad.",
        approach:
          "Organicé la coordinación de entregas por capas, mejorando trazabilidad entre Flutter/Android y validaciones de integración.",
        outcome:
          "Se redujeron incidencias en despliegues durante el periodo operativo del evento.",
        stack: ["Flutter", "Android", "Arquitectura limpia", "CI/CD"],
      },
    ],
    contacts: sharedContacts,
    experience: [
      {
        company: "Worldline Global Services",
        role: "Desarrolladora de apps nativas",
        period: "Barcelona · Abr 2024 – Ene 2026",
        highlights: [
          "Contribuí a aplicaciones móviles en producción con Flutter, Android e iOS.",
          "Trabajé en La Mercè, app pública en Flutter lanzada a producción para un gran evento cultural de Barcelona.",
          "Implementé la funcionalidad de calidad del aire para Barcelona a la Butxaca, app pública en activo.",
          "Apoyé flujos de CI/CD basados en Jenkins, tags de release en GitLab y validación de releases en Google Play y App Store.",
          "Apoyé QA manual para Nescafé Dolce Gusto, usando Jira, planes de prueba estructurados y casos de prueba para validar flujos de reconexión y preparación con máquinas NEO1 y NEO2.",
          "Participé en validación QA, debugging, flujos basados en Jira y ciclos de entrega Agile/Scrum.",
        ],
        stack: [
          "Flutter",
          "Dart",
          "Android",
          "Kotlin",
          "iOS",
          "Swift",
          "Jenkins",
          "GitLab",
          "Jira",
          "Google Play",
          "App Store",
          "QA",
          "Planes de prueba",
        ],
        links: [
          {
            label: "La Mercè · Google Play",
            href: "https://play.google.com/store/apps/details?id=cat.bcn.festamerce&pcampaignid=web_share",
            external: true,
          },
          {
            label: "Barcelona a la Butxaca · Google Play",
            href: "https://play.google.com/store/apps/details?id=cat.bcn.butxaca&pcampaignid=web_share",
            external: true,
          },
          {
            label: "Nescafé Dolce Gusto · Google Play",
            href: "https://play.google.com/store/apps/details?id=com.nestle.nescafe.dolcegusto&pcampaignid=web_share",
            external: true,
          },
        ],
      },
      {
        company: "Worldline Global Services",
        role: "Becaria Native Apps Developer",
        period: "Barcelona · Abr 2023 – Abr 2024",
        highlights: [
          "Completé formación técnica mobile en Android, iOS, Flutter, testing y flujos de validación.",
          "Construí una app Android de práctica para ingresos, gastos y ahorros con Kotlin, Jetpack Compose, Koin y preferencias locales cifradas.",
          "Creé apps iOS de personajes con UIKit y SwiftUI para comparar patrones nativos usando la API de Jikan.",
          "Construí una app puente en Flutter para conectar conceptos mobile entre plataformas.",
          "Practiqué testing, validación, resolución de incidencias y seguimiento con Jira en flujos de entrega.",
        ],
        stack: [
          "Android",
          "Kotlin",
          "Jetpack Compose",
          "EncryptedSharedPreferences",
          "Koin",
          "iOS",
          "UIKit",
          "SwiftUI",
          "Flutter",
          "Dart",
          "Testing",
          "Validación",
          "Jira",
        ],
      },
      {
        company: "Avanade",
        role: "Becaria Front-End Developer",
        period: "Barcelona · Oct 2021 – Abr 2022",
        highlights: [
          "Construí y personalicé soluciones internas usando PowerApps y herramientas del ecosistema Microsoft.",
          "Colaboré con equipos multidisciplinares para entregar funcionalidades front-end en flujos de negocio.",
        ],
        stack: ["PowerApps", "Microsoft 365", "Power Platform"],
      },
    ],
    projects: [
      {
        name: "Inkscroller",
        description:
          "Lector de manga full-stack compuesto por frontend Flutter y backend FastAPI para descubrimiento de catálogo, flujos de lectura y preferencias autenticadas.",
        shortDescription:
          "Lector de manga full-stack con frontend Flutter y backend FastAPI.",
        stack: [
          "Flutter",
          "Dart",
          "FastAPI",
          "Python",
          "PostgreSQL",
          "Firebase Auth",
          "Railway",
          "Riverpod",
          "Jikan API",
          "MangaDex",
        ],
        demonstrates:
          "Estructura de producto móvil end-to-end con app Flutter, REST API, fuentes externas de manga y preferencias autenticadas.",
        featured: true,
        mockupLabels: ["Biblioteca", "Detalle manga", "Lector"],
        mockupStatus: "Captura\npróximamente",
        links: [
          {
            label: "Frontend",
            ctaLabel: "Repo frontend",
            href: "https://github.com/mfranchescagonzalezcejas/inkscroller_frontend",
            external: true,
          },
          {
            label: "Backend",
            ctaLabel: "Repo backend",
            href: "https://github.com/mfranchescagonzalezcejas/Inkscroller_backend",
            external: true,
          },
        ],
      },
      {
        name: "Inkscroller Frontend",
        description:
          "Frontend Flutter de Inkscroller, una experiencia de lectura de manga centrada en descubrimiento, preferencias personalizadas y flujo de lectura adaptativo.",
        shortDescription:
          "Frontend Flutter para una experiencia de lectura de manga con preferencias personalizadas.",
        stack: [
          "Flutter",
          "Dart",
          "Riverpod",
          "get_it",
          "Dio",
          "GoRouter",
          "Firebase Auth",
          "Firebase Analytics",
        ],
        demonstrates:
          "Base Flutter preparada para visibilidad pública, Clean Architecture, Screaming Architecture y configuración con Firebase.",
        links: [
          {
            label: "Repositorio",
            href: "https://github.com/mfranchescagonzalezcejas/inkscroller_frontend",
            external: true,
          },
        ],
      },
      {
        name: "Inkscroller Backend",
        description:
          "Backend REST API en FastAPI para Inkscroller que agrega datos de MangaDex y Jikan y ofrece preferencias de lectura autenticadas con Firebase Auth.",
        shortDescription:
          "Backend FastAPI para Inkscroller con integración MangaDex/Jikan, Firebase Auth y persistencia.",
        stack: [
          "FastAPI",
          "Python",
          "httpx",
          "Pydantic",
          "Firebase Auth",
          "PostgreSQL",
          "Railway",
        ],
        demonstrates:
          "Diseño de API, endpoints autenticados, agregación de APIs externas, caché y despliegue en Railway.",
        links: [
          {
            label: "Repositorio",
            href: "https://github.com/mfranchescagonzalezcejas/Inkscroller_backend",
            external: true,
          },
        ],
      },
      {
        name: "AppSwiftUI",
        description:
          "Explorador de personajes en SwiftUI que consume la API de Jikan y muestra datos de personajes de manga/anime en una interfaz nativa declarativa.",
        shortDescription:
          "Explorador de personajes en SwiftUI con API de Jikan, navegación nativa y estado reactivo.",
        stack: [
          "Swift",
          "SwiftUI",
          "URLSession",
          "Jikan API",
          "ObservableObject",
        ],
        demonstrates:
          "Fundamentos de iOS nativo con SwiftUI, navegación lista-detalle, mapeo de API y gestión de estado.",
        links: [
          {
            label: "Repositorio",
            href: "https://github.com/mfranchescagonzalezcejas/AppSwiftUI",
            external: true,
          },
        ],
      },
      {
        name: "AppUIKit",
        description:
          "Explorador de personajes en UIKit que consume la API de Jikan y muestra datos de personajes de manga/anime en una interfaz iOS nativa.",
        shortDescription:
          "Explorador de personajes en UIKit con URLSession, celdas personalizadas y navegación lista-detalle.",
        stack: ["Swift", "UIKit", "URLSession", "Jikan API"],
        demonstrates:
          "Fundamentos de iOS nativo con UIKit, estructura MVC, networking y carga asíncrona de imágenes.",
        links: [
          {
            label: "Repositorio",
            href: "https://github.com/mfranchescagonzalezcejas/AppUIKit",
            external: true,
          },
        ],
      },
      {
        name: "AppAndroid",
        description:
          "App Android de práctica para gestionar ingresos, gastos y ahorros con Kotlin, Jetpack Compose, Koin y preferencias locales cifradas.",
        shortDescription:
          "App Android de práctica para ingresos, gastos y ahorros con Jetpack Compose y persistencia local.",
        stack: [
          "Kotlin",
          "Jetpack Compose",
          "Material 3",
          "Navigation Compose",
          "Koin",
          "EncryptedSharedPreferences",
        ],
        demonstrates:
          "Fundamentos modernos de Android, navegación Compose, ViewModels, inyección de dependencias y estructura por capas UI/domain/data.",
        links: [
          {
            label: "Repositorio",
            href: "https://github.com/mfranchescagonzalezcejas/AppAndroid",
            external: true,
          },
        ],
      },
    ],
    education: [
      {
        title: "Ingeniería de Telecomunicaciones",
        meta: "Universitat Pompeu Fabra · Barcelona",
      },
      {
        title: "Máster en Desarrollo de IA",
        meta: "BIG School · En curso",
      },
      {
        title: "Inglés: B2",
        meta: "EOI Vall d’Hebron · Español y catalán nativos",
      },
    ],
  },
};

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
  const isLinkItem = (link: LinkItem | null): link is LinkItem => link !== null;

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

  const projects = projectResults.map((result) => result.project);

  const experience = experienceResults.map((result) => result.experience);

  const invalidLinks = [
    ...contacts.invalidLinks,
    ...projectResults.flatMap((project) => project.invalidLinks),
    ...experienceResults.flatMap((experience) => experience.invalidLinks),
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
    },
    invalidLinks,
  };
};

export const locales = ["en", "es"] as const;
export const defaultLocale: Locale = "en";

export const isLocale = (locale: string | undefined): locale is Locale =>
  locales.includes(locale as Locale);

const validatedContentEntries = locales.map(
  (locale) =>
    [locale, validateSiteContent(rawSiteContent[locale]).content] as const,
);

export const siteContentByLocale = Object.fromEntries(
  validatedContentEntries,
) as Record<Locale, SiteContent>;

export const siteContent = siteContentByLocale[defaultLocale];

export const invalidLinks = locales.flatMap(
  (locale) => validateSiteContent(rawSiteContent[locale]).invalidLinks,
);
