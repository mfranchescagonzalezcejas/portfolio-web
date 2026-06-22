import { useEffect } from "react";
import { siteContentByLocale } from "../content/site";
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

export default function App() {
  const locale = resolveLocale(window.location.pathname);
  const site = siteContentByLocale[locale];
  const currentYear = new Date().getFullYear();
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
