import type { Locale } from "./site";

export type BetaProgram = {
  id: string;
  name: string;
  status: "open" | "closed" | "paused";
  description: string;
  href: string;
};

export type BetaContent = {
  locale: Locale;
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
    alternates: Record<Locale | "x-default", string>;
  };
  index: {
    title: string;
    description: string;
    programs: BetaProgram[];
  };
  inkscroller: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    scope: {
      title: string;
      items: string[];
    };
    requirements: {
      title: string;
      items: string[];
    };
    faq: {
      title: string;
      questions: { q: string; a: string }[];
    };
    cta: {
      primary: { label: string; href: string };
      secondary: { label: string; href: string };
    };
    privacy: {
      title: string;
      body: string;
      contactEmail: string;
      deletionInfo: string;
    };
  };
};

const betaPaths = {
  en: "/en/beta",
  es: "/es/beta",
  "x-default": "/en/beta",
} as const;

export const betaContent: Record<Locale, BetaContent> = {
  en: {
    locale: "en",
    seo: {
      title: "Beta Programs | DevDigi",
      description:
        "Join DevDigi beta programs and help shape the future of mobile reading tools.",
      canonicalPath: betaPaths.en,
      alternates: betaPaths,
    },
    index: {
      title: "Beta Programs",
      description:
        "Participate in closed beta programs and help improve apps before they reach everyone.",
      programs: [
        {
          id: "inkscroller",
          name: "InkScroller",
          status: "open",
          description:
            "A focused reading companion for saving and continuing your favourite stories.",
          href: "/en/beta/inkscroller",
        },
      ],
    },
    inkscroller: {
      hero: {
        eyebrow: "Closed beta",
        title: "Join InkScroller Beta",
        description:
          "Help shape a reading companion built for discovering, organising and following manga — across platforms, at your own pace.",
      },
      scope: {
        title: "What we are validating",
        items: [
          "Search and discovery: finding stories across sources",
          "Personal library: saving and organising your reads",
          "Manual tracking: marking progress even when you read elsewhere or in print",
          "Built-in reader: complementary reading via MangaDex",
          "Stability and overall experience on Android",
        ],
      },
      requirements: {
        title: "Requirements",
        items: [
          "An Android device",
          "A Google Play account",
          "Willingness to use the app for at least 14 days",
          "Comfort providing feedback via Discord and forms",
        ],
      },
      faq: {
        title: "Frequently asked questions",
        questions: [
          {
            q: "Does InkScroller only work with its built-in reader?",
            a: "No. Tracking works across platforms — you can mark progress on stories you read in another app, on a website, or even in print.",
          },
          {
            q: "Is the built-in reader the main feature?",
            a: "It is complementary. The reader pulls content from MangaDex so you can start a chapter without switching apps, but the core experience is tracking and organising your reading list.",
          },
          {
            q: "Will my data be kept after the beta ends?",
            a: "Beta data may be reset or archived when the program ends. You will be notified before any changes.",
          },
          {
            q: "What happens after I submit the form?",
            a: "I review each request manually. If accepted, you receive the Google Play opt-in link and a Discord invite. The process usually takes 1–3 days.",
          },
          {
            q: "Can I leave the beta at any time?",
            a: "Yes. You can unsubscribe from the Google Play testing programme at any time. Your data will be handled according to the privacy notice below.",
          },
        ],
      },
      cta: {
        primary: {
          label: "Apply as a tester",
          href: "https://forms.gle/GrBEMuvJggf3hVhUA",
        },
        secondary: {
          label: "Join the community",
          href: "https://discord.gg/devdigi",
        },
      },
      privacy: {
        title: "Privacy",
        body: "The application form collects your name, email address and device information. This data is used solely to manage the closed testing programme and communicate with you about it. Your data is not shared with third parties beyond what Google Forms and Google Play require.",
        contactEmail: "contact.me@devdigi.dev",
        deletionInfo:
          "To request deletion of your data, email the address above from the same email you used in the form.",
      },
    },
  },
  es: {
    locale: "es",
    seo: {
      title: "Programas Beta | DevDigi",
      description:
        "Participa en los programas beta de DevDigi y ayuda a dar forma al futuro de las herramientas de lectura móvil.",
      canonicalPath: betaPaths.es,
      alternates: betaPaths,
    },
    index: {
      title: "Programas Beta",
      description:
        "Participa en programas beta cerrados y ayuda a mejorar las aplicaciones antes de que lleguen a todo el mundo.",
      programs: [
        {
          id: "inkscroller",
          name: "InkScroller",
          status: "open",
          description:
            "Un acompañante de lectura para guardar y retomar tus historias favoritas.",
          href: "/es/beta/inkscroller",
        },
      ],
    },
    inkscroller: {
      hero: {
        eyebrow: "Beta cerrada",
        title: "Únete a la beta de InkScroller",
        description:
          "Ayuda a dar forma a un acompañante de lectura diseñado para descubrir, organizar y seguir manga, manhwa y manhua — entre plataformas, a tu ritmo.",
      },
      scope: {
        title: "Qué estamos validando",
        items: [
          "Búsqueda y descubrimiento: encontrar historias entre fuentes",
          "Biblioteca personal: guardar y organizar tus lecturas",
          "Seguimiento manual: marcar progreso aunque leas en otra plataforma o en físico",
          "Lector integrado: lectura complementaria a través de MangaDex",
          "Estabilidad y experiencia general en Android",
        ],
      },
      requirements: {
        title: "Requisitos",
        items: [
          "Un dispositivo Android",
          "Una cuenta de Google Play",
          "Disponibilidad para usar la app al menos 14 días",
          "Disposición a dar feedback mediante Discord y formularios",
        ],
      },
      faq: {
        title: "Preguntas frecuentes",
        questions: [
          {
            q: "¿InkScroller solo funciona con su lector integrado?",
            a: "No. El seguimiento funciona entre plataformas: puedes marcar progreso de historias que lees en otra app, en web o incluso en físico.",
          },
          {
            q: "¿El lector integrado es la función principal?",
            a: "Es complementario. El lector obtiene contenido de MangaDex para que puedas empezar un capítulo sin cambiar de app, pero la experiencia principal es el seguimiento y la organización de tu lista de lectura.",
          },
          {
            q: "¿Qué pasa con mis datos tras la beta?",
            a: "Los datos de la beta pueden resetearse o archivarse al finalizar el programa. Te avisaremos antes de cualquier cambio.",
          },
          {
            q: "¿Qué ocurre tras enviar el formulario?",
            a: "Reviso cada solicitud manualmente. Si eres aceptada, recibirás el enlace de opt-in de Google Play y una invitación a Discord. El proceso suele llevar 1–3 días.",
          },
          {
            q: "¿Puedo salir de la beta cuando quiera?",
            a: "Sí. Puedes darte de baja del programa de pruebas de Google Play en cualquier momento. Tus datos se tratarán según el aviso de privacidad.",
          },
        ],
      },
      cta: {
        primary: {
          label: "Solicitar acceso",
          href: "https://forms.gle/GrBEMuvJggf3hVhUA",
        },
        secondary: {
          label: "Unirse a la comunidad",
          href: "https://discord.gg/devdigi",
        },
      },
      privacy: {
        title: "Privacidad",
        body: "El formulario de solicitud recoge tu nombre, correo electrónico e información del dispositivo. Estos datos se usan exclusivamente para gestionar el programa de pruebas cerradas y comunicarnos contigo. No se comparten con terceros más allá de lo que requieren Google Forms y Google Play.",
        contactEmail: "contact.me@devdigi.dev",
        deletionInfo:
          "Para solicitar la eliminación de tus datos, escribe al correo anterior desde la misma dirección que usaste en el formulario.",
      },
    },
  },
};
