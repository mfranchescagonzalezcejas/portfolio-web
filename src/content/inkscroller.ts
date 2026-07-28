import type { Locale } from "./site";

export type ProductMedia =
  | {
      kind: "capture";
      src: `/inkscroller/${string}`;
      alt: string;
      width: number;
      height: number;
    }
  | { kind: "placeholder"; label: string; disclosure: string };

type SlideMeta = { title: string; description: string };

type InkScrollerContent = {
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
  proof: { title: string; items: string[] };
  capabilities: {
    title: string;
    items: { capability: string; value: string }[];
  };
  story: { title: string; steps: { title: string; description: string }[] };
  media: Array<ProductMedia & SlideMeta>;
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
        kind: "placeholder",
        label: "Preview",
        disclosure: "This is a product preview, not an English app capture.",
        title: "Explore",
        description: "Browse curated stories and discover new reads.",
      },
      {
        kind: "placeholder",
        label: "Preview",
        disclosure: "This is a product preview, not an English app capture.",
        title: "Home",
        description: "Your personal reading dashboard at a glance.",
      },
      {
        kind: "placeholder",
        label: "Preview",
        disclosure: "This is a product preview, not an English app capture.",
        title: "Library",
        description: "Keep your saved stories organized and close.",
      },
      {
        kind: "placeholder",
        label: "Preview",
        disclosure: "This is a product preview, not an English app capture.",
        title: "Story detail",
        description: "Dive into the details before you start reading.",
      },
      {
        kind: "placeholder",
        label: "Preview",
        disclosure: "This is a product preview, not an English app capture.",
        title: "Reader",
        description: "A focused reading space, free of distractions.",
      },
      {
        kind: "placeholder",
        label: "Preview",
        disclosure: "This is a product preview, not an English app capture.",
        title: "Reader settings",
        description: "Customize font, size, and theme to match your pace.",
      },
    ],
    beta: {
      title: "Beta updates",
      description:
        "Beta access is not currently available. Contact me to follow the project.",
      action: "Ask about InkScroller",
      href: "mailto:mercedesgon03@gmail.com?subject=InkScroller",
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
        src: "/inkscroller/product-explore-es-v1.jpg",
        alt: "Explorar InkScroller descubriendo historias",
        width: 1080,
        height: 2340,
        title: "Explorar",
        description: "Navega por historias seleccionadas y descubre nuevas lecturas.",
      },
      {
        kind: "capture",
        src: "/inkscroller/product-home-es-v1.jpg",
        alt: "Inicio de InkScroller con panel de lectura",
        width: 1080,
        height: 2340,
        title: "Inicio",
        description: "Tu panel personal de lectura de un vistazo.",
      },
      {
        kind: "capture",
        src: "/inkscroller/home-library-es-v1.jpg",
        alt: "Biblioteca de InkScroller mostrando historias guardadas",
        width: 1080,
        height: 2340,
        title: "Biblioteca",
        description: "Mantén tus historias guardadas organizadas y a mano.",
      },
      {
        kind: "capture",
        src: "/inkscroller/home-manga-detail-es-v1.jpg",
        alt: "Detalle de manga en InkScroller con opción de guardar",
        width: 1080,
        height: 2340,
        title: "Detalle de historia",
        description: "Sumérgete en los detalles antes de comenzar a leer.",
      },
      {
        kind: "capture",
        src: "/inkscroller/home-reader-es-v1.jpg",
        alt: "Lector de InkScroller retomando la lectura",
        width: 1080,
        height: 2340,
        title: "Lector",
        description: "Un espacio de lectura enfocado, libre de distracciones.",
      },
      {
        kind: "capture",
        src: "/inkscroller/product-settings-es-v1.jpg",
        alt: "Ajustes del lector de InkScroller",
        width: 1080,
        height: 2340,
        title: "Ajustes del lector",
        description: "Personaliza fuente, tamaño y tema a tu ritmo.",
      },
    ],
    beta: {
      title: "Actualizaciones de beta",
      description:
        "El acceso a beta no está disponible actualmente. Contacta conmigo para seguir el proyecto.",
      action: "Consultar sobre InkScroller",
      href: "mailto:mercedesgon03@gmail.com?subject=InkScroller",
    },
  },
};
