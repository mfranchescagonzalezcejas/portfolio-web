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
import FeaturedProject from "./components/FeaturedProject";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";
import ContactLinks from "./components/ContactLinks";
import CaseStudies from "./components/CaseStudies";

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
  const featuredProjectIndex = site.projects.findIndex(
    (project) => project.featured,
  );
  const featuredProject =
    featuredProjectIndex >= 0 ? site.projects[featuredProjectIndex] : null;
  const otherProjects = site.projects.filter(
    (_, index) => index !== featuredProjectIndex,
  );

  useEffect(() => {
    document.documentElement.lang = site.locale;
    document.title = site.meta.title;

    const descriptionMeta = document.querySelector("meta[name='description']");
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", site.meta.description);
    }
  }, [site]);

  return (
    <div className="portfolio-shell min-h-screen">
      <a className="skip-link sr-only focus:not-sr-only" href="#main-content">
        {site.skipLink}
      </a>

      <SiteHeader
        currentLocale={site.locale}
        navItems={site.nav}
        languageSwitcher={site.languageSwitcher}
        header={site.header}
      />

      <main id="main-content" className="relative z-10">
        <Hero hero={site.hero} links={site.contacts} />
        <Summary summary={site.summary} />
        <Experience
          experience={site.experience}
          section={site.experienceSection}
        />
        {featuredProject ? (
          <FeaturedProject
            project={featuredProject}
            section={site.featuredSection}
          />
        ) : null}
        <Projects projects={otherProjects} section={site.allProjectsSection} />
        {site.caseStudies.length > 0 ? (
          <CaseStudies
            caseStudies={site.caseStudies}
            section={site.caseStudiesSection}
          />
        ) : null}
        <Skills skills={site.summary.skills} section={site.skillsSection} />
        <Education education={site.education} section={site.educationSection} />
        <ContactLinks links={site.contacts} section={site.contactSection} />
      </main>

      <footer className="site-footer">
        <p>
          DevDigi by Mercedes Gonzalez • © {currentYear} · {site.footerText}
        </p>
      </footer>
    </div>
  );
}
