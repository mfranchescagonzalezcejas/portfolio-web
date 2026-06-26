import { Layers, Rocket } from "lucide-react";
import type { HeroVisualContent } from "../../content/site";

type HeroVisualProps = {
  visual: HeroVisualContent;
};

export default function HeroVisual({ visual }: HeroVisualProps) {
  return (
    <aside className="hero-visual" aria-label={visual.ariaLabel}>
      <div className="hero-visual-inner">
        <div className="hero-phone-glow hero-float-glow" aria-hidden="true" />

        <div className="hero-phone" aria-hidden="true">
          <span className="hero-phone-notch" aria-hidden="true" />

          <div className="hero-phone-screen">
            <div className="hero-phone-status" aria-label="Header status row">
              <span>9:41</span>
              <span>Inkscroller</span>
            </div>

            <div className="hero-reading-card">
              <p className="hero-reading-eyebrow text-[0.62rem] font-bold tracking-[0.22em] uppercase">
                {visual.readingEyebrow}
              </p>
              <p className="mt-1 text-sm font-semibold text-[color:var(--device-text-strong)]">
                {visual.readingTitle}
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[color:var(--device-line-muted)]">
                <div className="hero-reading-progress" />
              </div>
            </div>

            <div className="hero-library-list" aria-label="Library rows">
              {[1, 2, 3, 4].map((row) => (
                <div className="hero-library-row" key={row}>
                  <div className="hero-cover" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2 w-3/4 rounded bg-[color:var(--device-line-strong)]" />
                    <div className="h-1.5 w-1/2 rounded bg-[color:var(--device-line-muted)]" />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="hero-phone-bottom"
              aria-label="Bottom quick actions"
            >
              {["■", "❤", "↓", "☰"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-code-overlay hero-code" aria-hidden="true">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />
            <span className="ml-2 font-mono text-[0.62rem] text-[color:var(--glass-text-muted)]">
              main.dart
            </span>
          </div>
          <pre className="hero-code-pre m-0 overflow-hidden font-mono text-[0.62rem] leading-relaxed">{`class Library extends
  ConsumerWidget {
  build(ctx, ref) {
    final manga = ref
      .watch(libraryProvider);
    return manga.when(
      data: (m) => Grid(m),
    );
  }
}`}</pre>
        </div>

        <div className="hero-stack-pill" aria-hidden="true">
          <span className="hero-stack-dot" />
          <span>{visual.stackLabel}</span>
        </div>

        <div className="hero-delivery-card" aria-hidden="true">
          <div className="hero-delivery-icon hero-delivery-icon-primary">
            <Rocket className="hero-card-icon" aria-hidden="true" />
          </div>
          <div>
            <p className="m-0 text-[0.68rem] font-semibold text-[color:var(--glass-text-strong)]">
              {visual.deliveryTitle}
            </p>
            <p className="m-0 font-mono text-[0.62rem] text-[color:var(--glass-text-muted)]">
              {visual.deliverySubtitle}
            </p>
          </div>
        </div>

        <div className="hero-architecture-card" aria-hidden="true">
          <div className="hero-delivery-icon hero-delivery-icon-secondary">
            <Layers className="hero-card-icon" aria-hidden="true" />
          </div>
          <div>
            <p className="m-0 text-[0.68rem] font-semibold text-[color:var(--glass-text-strong)]">
              {visual.architectureTitle}
            </p>
            <p className="m-0 font-mono text-[0.62rem] text-[color:var(--glass-text-muted)]">
              {visual.architectureSubtitle}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
