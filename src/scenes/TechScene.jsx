import React from 'react';
import { TECH } from '../data.js';

// Kinetic tech rails: each row is an infinitely scrolling strip of
// technologies. Rows move at different speeds and directions; a
// "focus band" at the viewport center sharpens items, and the whole
// composition collapses into the center when the camera moves on.
const RAILS = [
  { key: 'lang', label: '01 · LANGUAGES', items: TECH.languages, dur: '26s', dir: 'normal' },
  { key: 'web', label: '02 · WEB & FRONTEND', items: TECH.web, dur: '34s', dir: 'reverse' },
  { key: 'backend', label: '03 · BACKEND & DATA', items: TECH.backend, dur: '22s', dir: 'normal' },
  { key: 'security', label: '04 · SECURITY & SYSTEMS', items: TECH.security, dur: '30s', dir: 'reverse' },
  { key: 'tools', label: '05 · TOOLS & CORE', items: TECH.tools.concat(TECH.concepts), dur: '38s', dir: 'normal' },
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

        <div className="tech-rails">
          {RAILS.map((rail, ri) => (
            <div className={`rail-rot ${ri % 2 ? 'rot-b' : 'rot-a'}`} key={rail.key}>
              <div className="rail-row" data-rail={rail.key}>
                <span className="rail-label">{rail.label}</span>
                <div className="rail-track" style={{ ['--dur']: rail.dur, ['--dir']: rail.dir }}>
                  <div className="rail-group">
                    {rail.items.map((item, i) => (
                      <span className="rail-chip" key={`${rail.key}-a-${i}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="rail-group" aria-hidden="true">
                    {rail.items.map((item, i) => (
                      <span className="rail-chip" key={`${rail.key}-b-${i}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
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
