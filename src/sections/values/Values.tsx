import { CheckCircle2, GitBranch, Layers, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ValueIconName, ValuesContent } from "../../content/site";

type ValuesProps = {
  values: ValuesContent;
};

const valueIcons: Record<ValueIconName, LucideIcon> = {
  smartphone: Smartphone,
  layers: Layers,
  "git-branch": GitBranch,
  "check-circle": CheckCircle2,
};

export default function Values({ values }: ValuesProps) {
  return (
    <section
      id="values"
      className="values-section"
      aria-labelledby="values-title"
    >
      <div className="section-inner">
        <div className="values-header">
          <p className="eyebrow">{values.eyebrow}</p>
          <h2 id="values-title" className="section-title">
            <span className="text-gradient">{values.title}</span>
          </h2>
          <p className="values-description">{values.description}</p>
        </div>

        <div className="values-grid">
          {values.cards.map((card) => {
            const Icon = valueIcons[card.icon] ?? Smartphone;

            return (
              <article key={card.title} className="values-card card-surface">
                <div className="values-card-highlight" aria-hidden="true" />
                <div className="values-card-icon" aria-hidden="true">
                  <Icon />
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
