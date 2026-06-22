import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { siteContentByLocale } from "../content/site";
import type { Locale } from "../content/site";
import { resolveLocale } from "./locale";
import SiteHeader from "../sections/header/SiteHeader";
import Hero from "../sections/hero/Hero";
import Values from "../sections/values/Values";
import Summary from "../sections/summary/Summary";
import Experience from "../sections/experience/Experience";
import FeaturedProject from "../sections/projects/FeaturedProject";
import Projects from "../sections/projects/Projects";
import Education from "../sections/education/Education";
import Skills from "../sections/skills/Skills";
import ContactLinks from "../sections/contact/ContactLinks";
import CaseStudies from "../sections/case-studies/CaseStudies";

type AppProps = {
  locale?: Locale;
  currentYear?: number;
};

const getBrowserLocale = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  return resolveLocale(window.location.pathname);
};

export default function App({ locale, currentYear }: AppProps) {
  const resolvedLocale = locale ?? getBrowserLocale() ?? "en";
  const resolvedYear = currentYear ?? new Date().getFullYear();
  const site = siteContentByLocale[resolvedLocale];
  const featuredProjectIndex = site.projects.findIndex(
    (project) => project.featured,
  );
  const featuredProject =
    featuredProjectIndex >= 0 ? site.projects[featuredProjectIndex] : null;
  const projectCards = site.projects.filter((project) => !project.featured);
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
      <Analytics />
      <SpeedInsights />
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
        <Values values={site.values} />
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
        <Projects projects={projectCards} section={site.allProjectsSection} />
        {site.caseStudies.length > 0 ? (
          <CaseStudies
            caseStudies={site.caseStudies}
            section={site.caseStudiesSection}
          />
        ) : null}
        <Skills section={site.skillsSection} />
        <Education
          education={site.education}
          languages={site.languages}
          section={site.educationSection}
        />
        <ContactLinks links={site.contacts} section={site.contactSection} />
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <p>DevDigi by Mercedes Gonzalez</p>
          <p>
            © {resolvedYear} · {site.footerText}
          </p>
        </div>
      </footer>
    </div>
  );
}
