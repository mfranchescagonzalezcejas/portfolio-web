import type { SiteContent } from "../types";
import { createSharedContacts } from "./shared";

export const enSiteContent: SiteContent = {
  locale: "en",
  meta: {
    title: "DevDigi | Mercedes Franchesca Gonzalez Cejas",
    description:
      "Flutter / Mobile Developer in Barcelona focused on product-team delivery, QA, and release validation.",
    socialImageAlt:
      "DevDigi portfolio preview for Mercedes Franchesca Gonzalez Cejas, Mobile Developer.",
  },
  skipLink: "Skip to content",
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
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
    eyebrow: "Flutter / Mobile Developer · Barcelona · Hybrid / Remote",
    tagline: "I help product teams ship reliable mobile apps.",
    taglineAccent: "mobile apps",
    summary:
      "Flutter / Mobile Developer for product teams. I build maintainable mobile applications with clean architecture, REST API integration, QA validation, and release ownership across production delivery workflows.",
    panelLabel: "Signal",
    panelTitle: "Product-team mobile delivery",
    panelText:
      "Best fit: Flutter and mobile roles where production delivery, QA/release validation, and maintainable architecture matter as much as feature work.",
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
      deliveryTitle: "In development",
      deliverySubtitle: "architecture-first build",
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
    eyebrow: "Featured project",
    title: "Inkscroller",
    kicker: "Full-stack manga reader app · in development",
    linksLabel: "Project links",
    stackLabel: "{project} technology stack",
    linkAriaLabel: "{label} for {project}",
    primaryCtaLabel: "Frontend repo",
    secondaryCtaLabel: "Backend repo",
  },
  allProjectsSection: {
    eyebrow: "Projects",
    title: "Selected work",
    description:
      "A mix of full-stack mobile, native Android and iOS, and web — each one focused on craft.",
    linksLabel: "Project links",
    stackLabel: "{project} technology stack",
    proofLabel: "Demonstrates",
    repositoryLabel: "View repo",
    repositoryAriaLabel: "{repository}: {link} for {project}",
    learningProjectsTitle: "Learning projects",
    learningProjectsDescription:
      "Worldline internship learning projects across native iOS and Android development.",
  },
  caseStudiesSection: {
    eyebrow: "Case studies",
    title: "Selected case studies",
    description:
      "Professional work shown with public app references only. No confidential implementation details are included.",
    contextLabel: "Context",
    roleLabel: "My role",
    stackLabel: "Stack",
    demonstratesLabel: "Demonstrates",
  },
  educationSection: {
    eyebrow: "Education",
    title: "Education and languages",
    educationTitle: "Education",
    languagesTitle: "Languages",
    languagesAriaLabel: "Language proficiency",
  },
  skillsSection: {
    eyebrow: "Skills",
    title: "Technical toolbox",
    categorySkillsLabel: "Skills in {category}",
    categories: [
      {
        title: "Mobile",
        skills: [
          "Flutter",
          "Dart",
          "Android",
          "Kotlin",
          "Jetpack Compose",
          "iOS",
          "Swift",
          "SwiftUI",
          "UIKit",
        ],
      },
      {
        title: "Architecture",
        skills: [
          "Clean Architecture",
          "Layered Architecture",
          "Repository Pattern",
          "Dependency Injection",
          "Screaming Architecture",
        ],
      },
      {
        title: "Backend & APIs",
        skills: [
          "REST APIs",
          "FastAPI",
          "Python",
          "PostgreSQL",
          "Firebase Auth",
          "Railway",
        ],
      },
      {
        title: "Delivery & Quality",
        skills: [
          "GitHub Actions",
          "Jenkins",
          "GitLab",
          "CI/CD",
          "Google Play",
          "App Store",
          "Jira",
          "QA validation",
          "Manual QA",
          "Test plans",
          "Test cases",
          "Debugging",
          "Release validation",
        ],
      },
      {
        title: "Ways of working",
        skills: [
          "Agile/Scrum",
          "Code review",
          "Team coordination",
          "Cross-functional collaboration",
        ],
      },
    ],
  },
  contactSection: {
    eyebrow: "Contact",
    titlePrefix: "Let\u2019s build great",
    titleHighlight: "mobile products.",
    body: "Available for Flutter / Mobile Developer roles in product teams, especially where production delivery, QA/release validation, and Barcelona hybrid or remote collaboration matter.",
    ariaLabel: "Contact and social links",
  },
  footerText: "Built with care in Barcelona",
  caseStudies: [
    {
      title: "La Mercè production release",
      context:
        "Public Flutter app released to production for a major Barcelona cultural event.",
      role: "Mobile developer contributing within delivery workflows and release validation support.",
      stack: ["Flutter", "Jenkins", "GitLab", "Jira", "Google Play"],
      demonstrates:
        "Production delivery discipline, release validation, and collaboration on a public app with real users.",
      links: [
        {
          label: "La Mercè on Google Play",
          href: "https://play.google.com/store/apps/details?id=cat.bcn.festamerce&pcampaignid=web_share",
          external: true,
        },
      ],
    },
    {
      title: "Barcelona a la Butxaca air quality",
      context:
        "Air quality feature work inside a live public app for Barcelona citizens.",
      role: "Mobile developer working on the air quality feature through API integration and product delivery practices.",
      stack: ["Flutter", "REST APIs", "Jira", "Google Play"],
      demonstrates:
        "API integration, feature delivery, and maintenance work on a real citizen-facing production app.",
      links: [
        {
          label: "Barcelona a la Butxaca on Google Play",
          href: "https://play.google.com/store/apps/details?id=cat.bcn.butxaca&pcampaignid=web_share",
          external: true,
        },
      ],
    },
    {
      title: "Nescafé Dolce Gusto QA validation",
      context:
        "Structured QA support for a production mobile app connected to coffee machine flows.",
      role: "Manual QA support using Jira, structured test plans, test cases, functional validation, and issue follow-up.",
      stack: [
        "Jira",
        "Test plans",
        "Test cases",
        "Functional validation",
        "Mobile QA",
      ],
      demonstrates:
        "Product quality mindset, structured manual testing, and reconnection and brew flow validation on a public production app.",
      links: [
        {
          label: "Nescafé Dolce Gusto on Google Play",
          href: "https://play.google.com/store/apps/details?id=com.nestle.nescafe.dolcegusto&pcampaignid=web_share",
          external: true,
        },
      ],
    },
  ],
  contacts: createSharedContacts("Download CV"),
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
        "In-development full-stack manga reader composed of a Flutter frontend and a FastAPI backend for catalogue discovery, reader flows, and authenticated preferences.",
      shortDescription:
        "In-development manga reader with Flutter frontend and FastAPI backend.",
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
        "Work-in-progress mobile product structure across a Flutter app, REST API, external manga data sources, auth/preferences architecture, and reader/catalogue flows.",
      featured: true,
      mockups: [
        {
          src: {
            dark: "/inkscroller/screenshots/dark/en/explore.jpg",
            light: "/inkscroller/screenshots/light/en/explore.jpg",
          },
          width: 1080,
          height: 2340,
        },
        {
          src: {
            dark: "/inkscroller/screenshots/dark/en/home.jpg",
            light: "/inkscroller/screenshots/light/en/home.jpg",
          },
          width: 1080,
          height: 2340,
        },
        {
          src: {
            dark: "/inkscroller/screenshots/dark/en/library.jpg",
            light: "/inkscroller/screenshots/light/en/library.jpg",
          },
          width: 1080,
          height: 2340,
        },
      ],
      links: [
        {
          label: "InkScroller",
          ctaLabel: "View InkScroller",
          href: "/en/projects/inkscroller",
        },
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
      name: "AppSwiftUI",
      description:
        "SwiftUI character browser that consumes the Jikan API and displays manga/anime character data in a native declarative interface.",
      shortDescription:
        "Worldline internship learning path: SwiftUI, API mapping, navigation, and reactive state.",
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
        "Worldline internship learning path: UIKit, networking, custom cells, and list-to-detail navigation.",
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
        "Worldline internship learning path: Kotlin, Jetpack Compose, dependency injection, and local persistence.",
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
      meta: "Universitat Pompeu Fabra",
    },
    {
      title: "Master's in AI Development",
      meta: "BIG School · In progress",
    },
  ],
  languages: [
    { name: "Spanish", level: "Native" },
    { name: "Catalan", level: "Native" },
    { name: "English", level: "B2" },
  ],
};
