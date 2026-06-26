import { Download, Mail, createLucideIcon } from "lucide-react";
import type { ContactLinkKind } from "../../content/site";

const Github = createLucideIcon("Github", [
  [
    "path",
    {
      d: "M16 22v-2.87a3.26 3.26 0 0 0-.94-2.37c3.14-.35 6.44-1.54 6.44-6.97a5.6 5.6 0 0 0-1.5-3.89 5.2 5.2 0 0 0-.09-3.9s-1.15-.37-3.8 1.5a13.16 13.16 0 0 0-7 0c-2.65-1.87-3.8-1.5-3.8-1.5a5.2 5.2 0 0 0-.09 3.9 5.6 5.6 0 0 0-1.5 3.89c0 5.41 3.3 6.62 6.44 6.97a3.26 3.26 0 0 0-.94 2.37V22",
      key: "github-logo",
    },
  ],
]);

const Linkedin = createLucideIcon("Linkedin", [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z",
      key: "linkedin-network",
    },
  ],
  ["rect", { x: "2", y: "9", width: "4", height: "12", key: "linkedin-i" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "linkedin-dot" }],
]);

const contactIcons = {
  linkedin: Linkedin,
  github: Github,
  cv: Download,
  email: Mail,
} satisfies Record<ContactLinkKind, typeof Mail>;

export function getContactIcon(kind: ContactLinkKind) {
  return contactIcons[kind];
}
