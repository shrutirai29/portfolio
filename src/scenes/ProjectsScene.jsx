import React from 'react';
import { PROJECTS } from '../data.js';

// Editorial project index (Studio Foundry pattern): numbered rows with
// name, category, description, stack and a View/Explore CTA — plus a
// "by the numbers" band inspired by CA Film Creatives. All stats are
// taken from the résumé — nothing invented.
const STATS = [
  ['04', 'SHIPPED PROJECTS'],
  ['50+', 'PAGES — MEDTRUST PROTOTYPE'],
  ['14+', 'VOICE LANGUAGES — KHETY'],
  ['03', 'AI FEATURES — CNN · CLAUDE · RULES'],
];

export default function ProjectsScene() {
  return (
    <section className="scene" data-scene="projects" aria-label="Projects">
      <div className="stage" data-stage>
        <div className="film-head" data-reveal="clip">
          <span className="kicker">05 · SELECTED WORK</span>
          <h2 className="film-title font-hero">
            Selected <em>Work</em>
          </h2>
          <span className="film-rule" aria-hidden="true" />
        </div>

        <div className="proj-stats" data-reveal="rise">
          {STATS.map(([num, label]) => (
            <div className="stat" key={label}>
              <b className="stat-num font-hero">{num}</b>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="proj-index">
          {PROJECTS.map((p) => (
            <a className="proj-row" href={`#/project/${p.index}`} data-reveal="rise" key={p.index}>
              <span className="proj-no font-hero" aria-hidden="true">
                {p.index}
              </span>
              <div className="proj-body">
                <div className="proj-title-line">
                  <h3 className="proj-name font-hero">{p.name}</h3>
                  <span className="proj-tag">{p.tagline}</span>
                </div>
                <p className="proj-desc">{p.description}</p>
                <div className="proj-tech">
                  {p.tech.map((t) => (
                    <span className="chip-sm" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="proj-cta">
                EXPLORE <span className="proj-arrow" aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>

        <div className="zoom-dark" data-zoom-dark />
        <div className="vignette" />
      </div>
    </section>
  );
}
