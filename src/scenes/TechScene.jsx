import React from 'react';
import { TECH } from '../data.js';

// Editorial capability index (OKC-style): one row per domain, with a
// script label on the left and the technology cluster flowing beside it.
const CAPS = [
  { key: 'lang', label: '01 · LANGUAGES', items: TECH.languages },
  { key: 'web', label: '02 · WEB & FRONTEND', items: TECH.web },
  { key: 'backend', label: '03 · BACKEND & DATA', items: TECH.backend },
  { key: 'security', label: '04 · SECURITY & SYSTEMS', items: TECH.security },
  { key: 'tools', label: '05 · TOOLS & CORE', items: TECH.tools.concat(TECH.concepts) },
];

export default function TechScene() {
  return (
    <section className="scene" data-scene="tech" aria-label="Tech Stack">
      <div className="stage" data-stage>
        <div className="tech-head" data-reveal="clip">
          <span className="kicker">04 · SYSTEMS &amp; CRAFT</span>
          <h2 className="tech-title font-hero">
            Tech <em>Stack</em>
          </h2>
        </div>

        <div className="cap-index">
          {CAPS.map((cap) => (
            <div className="cap-row" data-reveal="rise" key={cap.key}>
              <span className="cap-label">{cap.label}</span>
              <div className="cap-items">
                {cap.items.map((item) => (
                  <span className="cap-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="tech-ghost font-hero" aria-hidden="true">
          S.R.
        </div>

        <div className="zoom-dark" data-zoom-dark />
        <div className="vignette" />
      </div>
    </section>
  );
}
