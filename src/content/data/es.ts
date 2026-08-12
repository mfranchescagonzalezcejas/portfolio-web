import type { SiteContent } from "../types";
import { createSharedContacts } from "./shared";

export const esSiteContent: SiteContent = {
  locale: "es",
  meta: {
    title: "DevDigi | Mercedes Franchesca Gonzalez Cejas",
    description:
      "Flutter / Mobile Developer en Barcelona con foco en equipos de producto, QA y validación de releases.",
    socialImageAlt:
      "Vista previa del portfolio DevDigi de Mercedes Franchesca Gonzalez Cejas, desarrolladora mobile.",
  },
  skipLink: "Saltar al contenido",
  nav: [
    { label: "Sobre mí", href: "#about" },
    { label: "Experiencia", href: "#experience" },
    { label: "Proyectos", href: "#projects" },
    { label: "Habilidades", href: "#skills" },
    { label: "Educación", href: "#education" },
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
    eyebrow: "Flutter / Mobile Developer · Barcelona · Híbrido / Remoto",
    tagline: "Ayudo a equipos de producto a entregar apps móviles fiables.",
    taglineAccent: "apps móviles",
    summary:
      "Flutter / Mobile Developer para equipos de producto. Construyo aplicaciones móviles mantenibles con arquitectura limpia, integración REST API, validación QA y responsabilidad sobre releases dentro de flujos de entrega en producción.",
    panelLabel: "Señal",
    panelTitle: "Entrega mobile en equipos de producto",
    panelText:
      "Me encajan roles de Flutter y mobile donde la entrega en producción, la validación QA/release y la arquitectura mantenible importan tanto como el desarrollo de features.",
    profileLinksLabel: "Enlaces principales del perfil",
    ctaLabel: "Contáctame",
    quickCtaLabel: "Ver proyectos",
    quickCtaHref: "#projects",
    panelAriaLabel: "Foco profesional",
    cvLabel: "Descargar CV",
    visual: {
      ariaLabel: "Mockup de demo del producto",
      readingEyebrow: "Leyendo ahora",
      readingTitle: "Capítulo 47",
      stackLabel: "Flutter · Riverpod",
      deliveryTitle: "En desarrollo",
      deliverySubtitle: "arquitectura primero",
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
    eyebrow: "Proyecto destacado",
    title: "Inkscroller",
    kicker: "App lectora de manga full-stack · en desarrollo",
    linksLabel: "Enlaces del proyecto",
    stackLabel: "Tecnologías de {project}",
    linkAriaLabel: "{label} de {project}",
    primaryCtaLabel: "Repo frontend",
    secondaryCtaLabel: "Repo backend",
  },
  allProjectsSection: {
    eyebrow: "Proyectos",
    title: "Trabajos seleccionados",
    description:
      "Una mezcla de mobile full-stack, Android e iOS nativos y web — cada uno enfocado en el oficio.",
    linksLabel: "Enlaces del proyecto",
    stackLabel: "Tecnologías de {project}",
    proofLabel: "Demuestra",
    repositoryLabel: "Ver repo",
    repositoryAriaLabel: "{repository}: {link} de {project}",
    learningProjectsTitle: "Proyectos de aprendizaje",
    learningProjectsDescription:
      "Proyectos de aprendizaje durante las prácticas en Worldline, en desarrollo nativo para iOS y Android.",
  },
  caseStudiesSection: {
    eyebrow: "Casos de estudio",
    title: "Casos de estudio seleccionados",
    description:
      "Trabajo profesional mostrado solo con referencias públicas de las apps. No se incluyen detalles confidenciales de implementación.",
    contextLabel: "Contexto",
    roleLabel: "Mi rol",
    stackLabel: "Stack",
    demonstratesLabel: "Demuestra",
  },
  educationSection: {
    eyebrow: "Formación",
    title: "Formación e idiomas",
    educationTitle: "Formación",
    languagesTitle: "Idiomas",
    languagesAriaLabel: "Nivel de idiomas",
  },
  skillsSection: {
    eyebrow: "Competencias",
    title: "Caja de herramientas técnicas",
    categorySkillsLabel: "Competencias en {category}",
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
        title: "Arquitectura",
        skills: [
          "Clean Architecture",
          "Arquitectura por capas",
          "Patrón Repository",
          "Inyección de dependencias",
          "Screaming Architecture",
        ],
      },
      {
        title: "Backend y APIs",
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
        title: "Entrega y calidad",
        skills: [
          "GitHub Actions",
          "Jenkins",
          "GitLab",
          "CI/CD",
          "Google Play",
          "App Store",
          "Jira",
          "Validación QA",
          "QA manual",
          "Planes de prueba",
          "Casos de prueba",
          "Debugging",
          "Validación de releases",
        ],
      },
      {
        title: "Formas de trabajo",
        skills: [
          "Agile/Scrum",
          "Code review",
          "Coordinación técnica",
          "Colaboración multidisciplinar",
        ],
      },
    ],
  },
  contactSection: {
    eyebrow: "Contacto",
    titlePrefix: "Construyamos grandes",
    titleHighlight: "productos móviles.",
    body: "Disponible para roles de Flutter / Mobile Developer en equipos de producto, especialmente donde importen la entrega en producción, la validación QA/release y la colaboración híbrida en Barcelona o remota.",
    ariaLabel: "Enlaces de contacto",
  },
  footerText: "Desarrollado con cariño en Barcelona",
  caseStudies: [
    {
      title: "Release en producción de La Mercè",
      context:
        "App pública en Flutter lanzada a producción para un gran evento cultural de Barcelona.",
      role: "Desarrolladora mobile contribuyendo en flujos de entrega y apoyo a validación de releases.",
      stack: ["Flutter", "Jenkins", "GitLab", "Jira", "Google Play"],
      demonstrates:
        "Disciplina de entrega en producción, validación de release y colaboración en una app pública con usuarios reales.",
      links: [
        {
          label: "La Mercè en Google Play",
          href: "https://play.google.com/store/apps/details?id=cat.bcn.festamerce&pcampaignid=web_share",
          external: true,
        },
      ],
    },
    {
      title: "Barcelona a la Butxaca calidad del aire",
      context:
        "Trabajo en la funcionalidad de calidad del aire dentro de una app pública activa para la ciudadanía de Barcelona.",
      role: "Desarrolladora mobile trabajando en la funcionalidad de calidad del aire mediante integración de APIs y prácticas de entrega.",
      stack: ["Flutter", "APIs REST", "Jira", "Google Play"],
      demonstrates:
        "Integración de APIs, entrega de features y mantenimiento en una app de producción ciudadana real.",
      links: [
        {
          label: "Barcelona a la Butxaca en Google Play",
          href: "https://play.google.com/store/apps/details?id=cat.bcn.butxaca&pcampaignid=web_share",
          external: true,
        },
      ],
    },
    {
      title: "Nescafé Dolce Gusto validación QA",
      context:
        "Soporte de QA estructurado para una app móvil en producción conectada a flujos de máquinas de café.",
      role: "Soporte de QA manual usando Jira, planes de prueba estructurados, casos de prueba, validación funcional y seguimiento de incidencias.",
      stack: [
        "Jira",
        "Planes de prueba",
        "Casos de prueba",
        "Validación funcional",
        "QA mobile",
      ],
      demonstrates:
        "Mentalidad de calidad de producto, testing manual estructurado y validación de flujos de reconexión y preparación en una app pública de producción.",
      links: [
        {
          label: "Nescafé Dolce Gusto en Google Play",
          href: "https://play.google.com/store/apps/details?id=com.nestle.nescafe.dolcegusto&pcampaignid=web_share",
          external: true,
        },
      ],
    },
  ],
  contacts: createSharedContacts("Descargar CV"),
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
        "Lector de manga full-stack en desarrollo, compuesto por frontend Flutter y backend FastAPI para descubrimiento de catálogo, flujos de lectura y preferencias autenticadas.",
      shortDescription:
        "Lector de manga en desarrollo con frontend Flutter y backend FastAPI.",
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
        "Estructura de producto móvil en progreso con app Flutter, REST API, fuentes externas de manga, arquitectura de autenticación/preferencias y flujos de catálogo/lectura.",
      featured: true,
      mockups: [
        {
          src: {
            dark: "/inkscroller/screenshots/dark/es/explore.jpg",
            light: "/inkscroller/screenshots/light/es/explore.jpg",
          },
          width: 1080,
          height: 2340,
        },
        {
          src: {
            dark: "/inkscroller/screenshots/dark/es/home.jpg",
            light: "/inkscroller/screenshots/light/es/home.jpg",
          },
          width: 1080,
          height: 2340,
        },
        {
          src: {
            dark: "/inkscroller/screenshots/dark/es/library.jpg",
            light: "/inkscroller/screenshots/light/es/library.jpg",
          },
          width: 1080,
          height: 2340,
        },
      ],
      links: [
        {
          label: "InkScroller",
          ctaLabel: "Ver InkScroller",
          href: "/es/proyectos/inkscroller",
        },
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
      name: "AppSwiftUI",
      description:
        "Explorador de personajes en SwiftUI que consume la API de Jikan y muestra datos de personajes de manga/anime en una interfaz nativa declarativa.",
      shortDescription:
        "Itinerario de aprendizaje en las prácticas de Worldline: SwiftUI, mapeo de API, navegación y estado reactivo.",
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
        "Itinerario de aprendizaje en las prácticas de Worldline: UIKit, networking, celdas personalizadas y navegación lista-detalle.",
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
        "Itinerario de aprendizaje en las prácticas de Worldline: Kotlin, Jetpack Compose, inyección de dependencias y persistencia local.",
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
      meta: "Universitat Pompeu Fabra",
    },
    {
      title: "Máster en Desarrollo de IA",
      meta: "BIG School · En curso",
    },
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Catalán", level: "Nativo" },
    { name: "Inglés", level: "B2" },
  ],
};
