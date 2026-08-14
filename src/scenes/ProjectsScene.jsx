import React from 'react';
import { PROJECTS } from '../data.js';

// Themed abstract visuals — no stock imagery, each project gets a
// typographic/symbolic composition drawn in the portfolio's own language.
function Visual({ index }) {
  if (index === '01') {
    // MEDTrust — healthcare: cross, ECG line, vitals grid
    return (
      <svg viewBox="0 0 520 380" className="p-visual-svg" aria-hidden="true">
        <g className="pv-grid">
          {[...Array(9)].map((_, i) => (
            <line key={`v${i}`} x1={40 + i * 55} y1="30" x2={40 + i * 55} y2="350" />
          ))}
          {[...Array(7)].map((_, i) => (
            <line key={`h${i}`} x1="40" y1={30 + i * 53} x2="480" y2={30 + i * 53} />
          ))}
        </g>
        <path className="pv-ecg" d="M60 190 L150 190 L175 120 L205 260 L235 170 L265 170 L290 90 L320 250 L350 190 L460 190" />
        <path className="pv-cross" d="M230 130 h60 v60 h60 v40 h-60 v60 h-40 v-60 h-60 v-40 h60 z" />
        <circle className="pv-node" cx="460" cy="90" r="5" />
        <circle className="pv-node" cx="60" cy="320" r="4" />
      </svg>
    );
  }
  if (index === '02') {
    // Khety — agriculture: leaf + field rows + data nodes
    return (
      <svg viewBox="0 0 520 380" className="p-visual-svg" aria-hidden="true">
        <g className="pv-grid">
          {[...Array(9)].map((_, i) => (
            <line key={`v${i}`} x1={40 + i * 55} y1="30" x2={40 + i * 55} y2="350" />
          ))}
          {[...Array(7)].map((_, i) => (
            <line key={`h${i}`} x1="40" y1={30 + i * 53} x2="480" y2={30 + i * 53} />
          ))}
        </g>
        <path className="pv-leaf" d="M260 320 C 190 260, 150 140, 250 70 C 340 130, 340 250, 260 320 Z" />
        <path className="pv-vein" d="M260 300 C 250 220, 245 160, 255 95" />
        <g className="pv-fields">
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${120 + i * 40} 320 q20 -18 40 0`} />
          ))}
        </g>
        <circle className="pv-node" cx="120" cy="90" r="4" />
        <circle className="pv-node" cx="420" cy="280" r="5" />
      </svg>
    );
  }
  if (index === '03') {
    // SkillBridge — resume analyzer: document + scan beam + keyword dots
    return (
      <svg viewBox="0 0 520 380" className="p-visual-svg" aria-hidden="true">
        <g className="pv-grid">
          {[...Array(9)].map((_, i) => (
            <line key={`v${i}`} x1={40 + i * 55} y1="30" x2={40 + i * 55} y2="350" />
          ))}
          {[...Array(7)].map((_, i) => (
            <line key={`h${i}`} x1="40" y1={30 + i * 53} x2="480" y2={30 + i * 53} />
          ))}
        </g>
        <g className="pv-doc">
          <rect x="190" y="60" width="140" height="250" rx="6" />
          <rect x="210" y="100" width="100" height="7" />
          <rect x="210" y="122" width="70" height="7" />
          <rect x="210" y="160" width="100" height="7" />
          <rect x="210" y="182" width="84" height="7" />
          <rect x="210" y="204" width="92" height="7" />
          <rect x="210" y="244" width="60" height="7" />
          <rect x="210" y="266" width="100" height="7" />
        </g>
        <line className="pv-scan" x1="170" y1="150" x2="350" y2="150" />
        <circle className="pv-node" cx="150" cy="120" r="4" />
        <circle className="pv-node" cx="380" cy="100" r="4" />
        <circle className="pv-node" cx="400" cy="300" r="4" />
      </svg>
    );
  }
  // Portfolio — the web: browser frame + editorial type bars
  return (
    <svg viewBox="0 0 520 380" className="p-visual-svg" aria-hidden="true">
      <g className="pv-grid">
        {[...Array(9)].map((_, i) => (
          <line key={`v${i}`} x1={40 + i * 55} y1="30" x2={40 + i * 55} y2="350" />
        ))}
        {[...Array(7)].map((_, i) => (
          <line key={`h${i}`} x1="40" y1={30 + i * 53} x2="480" y2={30 + i * 53} />
        ))}
      </g>
      <g className="pv-browser">
        <rect x="110" y="70" width="300" height="240" rx="6" />
        <circle cx="136" cy="96" r="5" />
        <circle cx="158" cy="96" r="5" />
        <circle cx="180" cy="96" r="5" />
        <rect x="200" y="88" width="180" height="16" rx="8" />
        <text className="pv-type" x="140" y="170" textAnchor="middle">
          S.R.
        </text>
        <rect x="150" y="196" width="80" height="6" />
        <rect x="150" y="214" width="140" height="6" />
        <rect x="150" y="232" width="110" height="6" />
      </g>
      <circle className="pv-node" cx="150" cy="300" r="4" />
      <circle className="pv-node" cx="380" cy="120" r="4" />
    </svg>
  );
}

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

        <div className="film-viewport">
          <div className="film-track">
            {PROJECTS.map((p, i) => (
              <article className="film-panel" key={p.index} data-panel={i + 1}>
                <div className={`film-visual panel-v${i + 1}`}>
                  <Visual index={p.index} />
                  <span className="film-no font-hero">{p.index}</span>
                  <span className="film-count">{p.index} / 04</span>
                </div>
                <div className="film-meta" data-reveal="rise">
                  <span className="film-tag">{p.tagline}</span>
                  <h3 className="film-name font-hero">{p.name}</h3>
                  <p className="film-desc">{p.description}</p>
                  <div className="film-tech">
                    {p.tech.map((t) => (
                      <span key={t} className="chip-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a className="film-link" href={p.github} target="_blank" rel="noreferrer">
                    EXPLORE PROJECT <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="zoom-dark" data-zoom-dark />
        <div className="vignette" />
      </div>
    </section>
  );
}
