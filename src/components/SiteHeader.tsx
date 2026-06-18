import type { Locale, NavItem } from "../data/site";

type SiteHeaderProps = {
  currentLocale: Locale;
  navItems: NavItem[];
  languageSwitcher: {
    label: string;
    options: Record<Locale, string>;
  };
  header: {
    ariaLabel: string;
    homeLabel: string;
  };
};

export default function SiteHeader({
  currentLocale,
  navItems,
  languageSwitcher,
  header,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 px-6 pt-6 lg:px-8">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-cyan-500/30 bg-slate-950/55 px-4 py-3 shadow-lg shadow-cyan-950/20 backdrop-blur sm:flex-nowrap sm:px-5"
        aria-label={header.ariaLabel}
      >
        <a
          className="flex items-center gap-3"
          href="#main-content"
          aria-label={header.homeLabel}
        >
          <span
            className="h-9 w-9 rounded-xl bg-[linear-gradient(135deg,#14b8a6,#38bdf8)] shadow-lg shadow-teal-950/30"
            aria-hidden="true"
          />
          <span className="text-base font-extrabold text-teal-50">DevDigi</span>
        </a>

        <div className="flex w-full items-center gap-4 overflow-x-auto sm:w-auto sm:gap-5 sm:overflow-visible">
          <ul className="flex items-center gap-4 sm:gap-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className="text-sm font-bold text-cyan-100/80 transition hover:text-teal-200"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <nav
            className="flex items-center gap-1 rounded-full border border-cyan-400/30 bg-slate-950/50 p-1"
            aria-label={languageSwitcher.label}
          >
            {Object.entries(languageSwitcher.options).map(([locale, label]) => (
              <a
                key={locale}
                className={`rounded-full px-2.5 py-1 text-xs font-extrabold transition ${
                  locale === currentLocale
                    ? "bg-teal-400 text-teal-950"
                    : "text-cyan-100/80 hover:text-teal-200"
                }`}
                href={`/${locale}`}
                aria-current={locale === currentLocale ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </nav>
    </header>
  );
}
