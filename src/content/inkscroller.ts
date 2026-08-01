import type { Locale } from "./site";

export type ProductMedia = {
  kind: "capture";
  src: Record<"dark" | "light", `/inkscroller/${string}`>;
  alt: string;
  width: number;
  height: number;
};

export type InkScrollerSlide = ProductMedia & {
  title: string;
  description: string;
};

export type InkScrollerContent = {
  locale: Locale;
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
    alternates: Record<Locale | "x-default", string>;
  };
  home: { label: string; href: string };
  counterpart: { label: string; href: string };
  skipLabel: string;
  hero: { eyebrow: string; title: string; description: string };
  carousel: {
    sectionLabel: string;
    regionLabel: string;
    previousLabel: string;
    nextLabel: string;
    navigationLabel: string;
    slideLabel: string;
  };
  proof: { title: string; items: string[] };
  capabilities: {
    title: string;
    items: { capability: string; value: string }[];
  };
  story: { title: string; steps: { title: string; description: string }[] };
  media: InkScrollerSlide[];
  beta: { title: string; description: string; action: string; href: string };
};

const productPaths = {
  en: "/en/projects/inkscroller",
  es: "/es/proyectos/inkscroller",
  "x-default": "/en/projects/inkscroller",
} as const;

export const inkscrollerContent: Record<Locale, InkScrollerContent> = {
  en: {
    locale: "en",
    seo: {
      title: "InkScroller | DevDigi",
      description:
        "InkScroller is a focused reading companion for saving and continuing stories.",
      canonicalPath: productPaths.en,
      alternates: productPaths,
    },
    home: { label: "DevDigi", href: "/en" },
    counterpart: { label: "Ver en español", href: productPaths.es },
    skipLabel: "Skip to InkScroller content",
    hero: {
      eyebrow: "Reading companion",
      title: "Keep your next chapter within reach.",
      description:
        "InkScroller brings saved reads, progress and quiet discovery into one focused mobile experience.",
    },
    carousel: {
      sectionLabel: "Product carousel",
      regionLabel: "Product screenshots carousel",
      previousLabel: "Previous slide",
      nextLabel: "Next slide",
      navigationLabel: "Carousel navigation",
      slideLabel: "Go to slide {index}: {title}",
    },
    proof: {
      title: "Built around the reading flow",
      items: [
        "Save a story",
        "Pick up where you left off",
        "Keep a personal library",
      ],
    },
    capabilities: {
      title: "Useful details, not more noise",
      items: [
        {
          capability: "Reading progress",
          value: "Return to the right chapter without hunting.",
        },
        {
          capability: "Saved library",
          value: "Keep promising reads close for later.",
        },
        {
          capability: "Focused interface",
          value: "Make space for the story, not the feed.",
        },
      ],
    },
    story: {
      title: "From discovery to the next page",
      steps: [
        { title: "Find", description: "Notice a story worth keeping." },
        {
          title: "Save",
          description: "Add it to your personal reading space.",
        },
        {
          title: "Continue",
          description: "Return when you are ready for the next chapter.",
        },
      ],
    },
    media: [
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/en/home.jpg",
          light: "/inkscroller/screenshots/light/en/home.jpg",
        },
        alt: "InkScroller home screen with reading dashboard",
        width: 1080,
        height: 2340,
        title: "Home",
        description: "Your personal reading dashboard at a glance.",
      },
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/en/explore.jpg",
          light: "/inkscroller/screenshots/light/en/explore.jpg",
        },
        alt: "InkScroller explore screen with story discovery",
        width: 1080,
        height: 2340,
        title: "Explore",
        description: "Browse curated stories and discover new reads.",
      },
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/en/library.jpg",
          light: "/inkscroller/screenshots/light/en/library.jpg",
        },
        alt: "InkScroller library screen with saved stories",
        width: 1080,
        height: 2340,
        title: "Library",
        description: "Keep your saved stories organized and close.",
      },
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/en/story-detail.jpg",
          light: "/inkscroller/screenshots/light/en/story-detail.jpg",
        },
        alt: "InkScroller story detail screen with saved reading options",
        width: 1080,
        height: 2340,
        title: "Story detail",
        description: "Dive into the details before you start reading.",
      },
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/reader.jpg",
          light: "/inkscroller/screenshots/light/reader.jpg",
        },
        alt: "InkScroller reader in continuous vertical reading mode",
        width: 1080,
        height: 2340,
        title: "Reader: vertical",
        description: "A focused reading space, free of distractions.",
      },
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/reader-2.jpg",
          light: "/inkscroller/screenshots/light/reader-2.jpg",
        },
        alt: "InkScroller reader in paginated reading mode",
        width: 1080,
        height: 2340,
        title: "Reader: paginated",
        description: "Move through a story one page at a time.",
      },
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/en/reader-settings.jpg",
          light:
            "/inkscroller/screenshots/light/en/reader-settings-vertical-en.jpg",
        },
        alt: "InkScroller reader settings screen",
        width: 1080,
        height: 2340,
        title: "Reader settings",
        description: "Customize font, size, and theme to match your pace.",
      },
    ],
    beta: {
      title: "Beta testing",
      description:
        "InkScroller is in closed beta. Join as a tester to help shape the app.",
      action: "Apply as a tester",
      href: "/en/beta/inkscroller",
    },
  },
  es: {
    locale: "es",
    seo: {
      title: "InkScroller | DevDigi",
      description:
        "InkScroller es un acompañante de lectura para guardar y retomar historias.",
      canonicalPath: productPaths.es,
      alternates: productPaths,
    },
    home: { label: "DevDigi", href: "/es" },
    counterpart: { label: "View in English", href: productPaths.en },
    skipLabel: "Saltar al contenido de InkScroller",
    hero: {
      eyebrow: "Compañero de lectura",
      title: "Tu próximo capítulo, siempre a mano.",
      description:
        "InkScroller reúne lecturas guardadas, progreso y descubrimiento tranquilo en una experiencia móvil enfocada.",
    },
    carousel: {
      sectionLabel: "Carrusel de producto",
      regionLabel: "Carrusel de capturas de pantalla del producto",
      previousLabel: "Diapositiva anterior",
      nextLabel: "Diapositiva siguiente",
      navigationLabel: "Navegación del carrusel",
      slideLabel: "Ir a la diapositiva {index}: {title}",
    },
    proof: {
      title: "Pensado para el ritmo de lectura",
      items: [
        "Guarda una historia",
        "Retoma donde lo dejaste",
        "Mantén tu biblioteca personal",
      ],
    },
    capabilities: {
      title: "Detalles útiles, sin más ruido",
      items: [
        {
          capability: "Progreso de lectura",
          value: "Vuelve al capítulo correcto sin buscar.",
        },
        {
          capability: "Biblioteca guardada",
          value: "Conserva cerca las lecturas que te interesan.",
        },
        {
          capability: "Interfaz enfocada",
          value: "Deja espacio para la historia, no para el feed.",
        },
      ],
    },
    story: {
      title: "Del descubrimiento a la siguiente página",
      steps: [
        {
          title: "Descubre",
          description: "Encuentra una historia que merece guardarse.",
        },
        {
          title: "Guarda",
          description: "Añádela a tu espacio personal de lectura.",
        },
        {
          title: "Continúa",
          description: "Vuelve cuando estés lista para el próximo capítulo.",
        },
      ],
    },
    media: [
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/es/home.jpg",
          light: "/inkscroller/screenshots/light/es/home.jpg",
        },
        alt: "Inicio de InkScroller con panel de lectura",
        width: 1080,
        height: 2340,
        title: "Inicio",
        description: "Tu panel personal de lectura de un vistazo.",
      },
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/es/explore.jpg",
          light: "/inkscroller/screenshots/light/es/explore.jpg",
        },
        alt: "Explorar InkScroller descubriendo historias",
        width: 1080,
        height: 2340,
        title: "Explorar",
        description:
          "Navega por historias seleccionadas y descubre nuevas lecturas.",
      },
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/es/library.jpg",
          light: "/inkscroller/screenshots/light/es/library.jpg",
        },
        alt: "Biblioteca de InkScroller mostrando historias guardadas",
        width: 1080,
        height: 2340,
        title: "Biblioteca",
        description: "Mantén tus historias guardadas organizadas y a mano.",
      },
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/es/story-detail.jpg",
          light: "/inkscroller/screenshots/light/es/story-detail.jpg",
        },
        alt: "Detalle de manga en InkScroller con opción de guardar",
        width: 1080,
        height: 2340,
        title: "Detalle de historia",
        description: "Sumérgete en los detalles antes de comenzar a leer.",
      },
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/reader.jpg",
          light: "/inkscroller/screenshots/light/reader.jpg",
        },
        alt: "Lector de InkScroller en modo de lectura vertical continua",
        width: 1080,
        height: 2340,
        title: "Lector: vertical",
        description: "Un espacio de lectura enfocado, libre de distracciones.",
      },
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/reader-2.jpg",
          light: "/inkscroller/screenshots/light/reader-2.jpg",
        },
        alt: "Lector de InkScroller en modo de lectura paginada",
        width: 1080,
        height: 2340,
        title: "Lector: paginado",
        description: "Avanza por la historia de página en página.",
      },
      {
        kind: "capture",
        src: {
          dark: "/inkscroller/screenshots/dark/es/reader-settings.jpg",
          light:
            "/inkscroller/screenshots/light/es/reader-settings-vertical.jpg",
        },
        alt: "Ajustes del lector de InkScroller",
        width: 1080,
        height: 2340,
        title: "Ajustes del lector",
        description: "Personaliza fuente, tamaño y tema a tu ritmo.",
      },
    ],
    beta: {
      title: "Beta cerrada",
      description:
        "InkScroller está en beta cerrada. Solicita acceso como tester y ayuda a mejorar la app.",
      action: "Solicitar acceso",
      href: "/es/beta/inkscroller",
    },
  },
};
