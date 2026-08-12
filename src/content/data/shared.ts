import type { ContactLinkItem } from "../types";

export const contactEmail = "mercedesgon03@gmail.com";

export const createSharedContacts = (cvLabel: string): ContactLinkItem[] => [
  {
    kind: "linkedin",
    variant: "primary",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mercedes-franchesca-gonzalez-cejas-7555a7177",
    external: true,
  },
  {
    kind: "github",
    variant: "secondary",
    label: "GitHub",
    href: "https://github.com/mfranchescagonzalezcejas",
    external: true,
  },
  {
    kind: "cv",
    variant: "secondary",
    label: cvLabel,
    href: "/cv.pdf",
  },
  {
    kind: "email",
    variant: "secondary",
    label: "Email",
    href: `mailto:${contactEmail}`,
  },
];
