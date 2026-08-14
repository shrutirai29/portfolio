import React from 'react';
import { TECH } from '../data.js';

const RINGS = [
  { key: 'lang', label: 'LANGUAGES', r: 15, items: TECH.languages },
  { key: 'web', label: 'WEB & BACKEND', r: 29, items: [...TECH.web, ...TECH.backend] },
  { key: 'tools', label: 'TOOLS · SECURITY · CORE', r: 42, items: [...TECH.tools, ...TECH.security, ...TECH.concepts] },
];

const polar = (r, angle) => ({
  left: `calc(50% + ${(r * Math.cos(angle)).toFixed(2)}vmin)`,
  top: `calc(50% + ${(r * Math.sin(angle)).toFixed(2)}vmin)`,
});

export default function TechScene() {
  return (
    <section className="scene" data-scene="tech" aria-label="Tech Stack">
      <div className="stage" data-stage>
        <div className="scene-content tech-content">
          <div className="tech-hub" data-reveal="pop">
            <div className="tech-hub-mark font-hero">S.R.</div>
            <div className="tech-hub-label">TECH STACK</div>
          </div>

          {RINGS.map((ring) => (
            <div key={ring.key} className="tech-ring" style={{ width: `${ring.r * 2}vmin`, height: `${ring.r * 2}vmin` }}>
              <span className="tech-ring-label" style={{ top: `calc(50% - ${ring.r + 1.2}vmin)` }}>
                {ring.label}
              </span>
              {ring.items.map((item, i) => {
                const angle = (i / ring.items.length) * Math.PI * 2 - Math.PI / 2;
                const pos = polar(ring.r, angle);
                return (
                  <span key={item} className="chip" style={{ ...pos, animationDelay: `${(i * 0.37) % 6}s` }}>
                    {item}
                  </span>
                );
              })}
            </div>
          ))}

          <div className="tech-orbit" aria-hidden="true" />
        </div>
        <div className="zoom-dark" data-zoom-dark />
        <div className="vignette" />
      </div>
    </section>
  );
}
