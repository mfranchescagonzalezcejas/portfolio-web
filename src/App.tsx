import { useEffect } from "react";
import {
  defaultLocale,
  isLocale,
  siteContentByLocale,
  type Locale,
} from "./data/site";
import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import Summary from "./components/Summary";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";
import ContactLinks from "./components/ContactLinks";

const resolveLocale = (path: string): Locale => {
  if (!path || path === "/") {
    return defaultLocale;
  }

  const [, localeSegment] = path.split("/");
  if (isLocale(localeSegment)) {
    return localeSegment;
  }

  return defaultLocale;
};

export default function App() {
  const locale = resolveLocale(window.location.pathname);
  const site = siteContentByLocale[locale];
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    document.documentElement.lang = site.locale;
    document.title = site.meta.title;

    const descriptionMeta = document.querySelector("meta[name='description']");
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", site.meta.description);
    }
  }, [site]);

  return (
    <div className="min-h-screen bg-[#06111f] text-[#e5e7eb]">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-sky-300 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
        href="#main-content"
      >
        {site.skipLink}
      </a>

      <SiteHeader
        currentLocale={site.locale}
        navItems={site.nav}
        languageSwitcher={site.languageSwitcher}
        header={site.header}
      />

      <main id="main-content">
        <Hero hero={site.hero} links={site.contacts} />
        <Summary summary={site.summary} />
        <Skills skills={site.summary.skills} section={site.skillsSection} />
        <Experience
          experience={site.experience}
          section={site.experienceSection}
        />
        <Projects projects={site.projects} section={site.projectsSection} />
        <Education education={site.education} section={site.educationSection} />
        <ContactLinks links={site.contacts} section={site.contactSection} />
      </main>

      <footer className="px-6 py-8 text-center text-sm text-[#93c5fd] lg:px-8">
        <p>
          DevDigi by Mercedes Gonzalez • © {currentYear} · {site.footerText}
        </p>
      </footer>
    </div>
  );
}
