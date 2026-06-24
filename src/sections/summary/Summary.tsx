import { MapPin } from "lucide-react";
import type { SummaryContent } from "../../content/site";

type SummaryProps = {
  summary: SummaryContent;
};

export default function Summary({ summary }: SummaryProps) {
  return (
    <section
      id="about"
      className="summary-section section-shell scroll-mt-32"
      aria-labelledby="summary-title"
    >
      <div className="section-inner summary-layout">
        <div>
          <p className="eyebrow summary-eyebrow">{summary.eyebrow}</p>

          <h2 id="summary-title" className="section-title summary-title">
            <span className="text-gradient">{summary.titleLines[0]}</span>
            <br />
            {summary.titleLines[1]}
          </h2>

          <div className="card-surface summary-profile-card">
            <div className="summary-profile-avatar" aria-hidden="true">
              {summary.profile.initials}
            </div>
            <div>
              <div className="summary-profile-name">{summary.profile.name}</div>
              <div className="summary-profile-location">
                <MapPin aria-hidden="true" />
                {summary.profile.location}
              </div>
            </div>
          </div>
        </div>

        <div className="summary-copy">
          {summary.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>
              {paragraph.map((segment, segmentIndex) =>
                segment.emphasis ? (
                  <span key={segmentIndex} className="summary-copy-strong">
                    {segment.text}
                  </span>
                ) : (
                  segment.text
                ),
              )}
            </p>
          ))}

          <div
            className="summary-badges"
            role="group"
            aria-label={summary.badgesLabel}
          >
            {summary.badges.map((badge) => (
              <span key={badge} className="summary-badge">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
