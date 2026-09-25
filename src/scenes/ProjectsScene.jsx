import React, { useState } from 'react';
import { PROJECTS } from '../data.js';
import { sounds } from '../lib/sound.js';

const STATS = [
  ['09', 'PUBLIC PROJECTS'],
  ['50+', 'PAGES — MEDTRUST'],
  ['14+', 'VOICE LANGUAGES — KHETY'],
  ['03', 'AI SYSTEMS — CNN · CLAUDE · RULES'],
];

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'systems', label: 'Systems & Tools' },
  { id: 'creative', label: 'Creative & WebGL' },
];

export default function ProjectsScene() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return p.tech.some((t) => ['CNN', 'Claude API', 'AI', 'ML'].some((k) => t.includes(k))) || p.role.includes('AI');
    if (filter === 'fullstack') return p.role.includes('Full-stack') || p.tech.includes('Node.js') || p.tech.includes('Express') || p.tech.includes('Flask') || p.tech.includes('MongoDB');
    if (filter === 'systems') return p.tech.includes('Python') || p.tech.includes('Odoo 19') || p.tech.includes('Algorithms') || p.role.includes('Odoo');
    if (filter === 'creative') return p.tech.includes('WebGL') || p.tech.includes('Canvas') || p.role.includes('Creative') || p.role.includes('Design') || p.role.includes('Game');
    return true;
  });

  const handleFilterClick = (catId) => {
    sounds.playHover();
    setFilter(catId);
  };

  return (
    <section className="scene" data-scene="projects" aria-label="Selected Projects">
      <div className="stage" data-stage>
        <div className="film-head" data-reveal="clip">
          <span className="kicker">04 · SELECTED ARCHITECTURE &amp; CODE</span>
          <h2 className="film-title font-hero">
            Selected <em>Work</em>
          </h2>
          <span className="film-rule" aria-hidden="true" />
        </div>

        {/* By the numbers band */}
        <div className="proj-stats" data-reveal="rise">
          {STATS.map(([num, label]) => (
            <div className="stat" key={label}>
              <b className="stat-num font-hero">{num}</b>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Filter categories */}
        <div className="proj-filters" data-reveal="rise">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterClick(cat.id)}
              className={`filter-pill ${filter === cat.id ? 'filter-pill-active' : ''}`}
            >
              {cat.label}
              {cat.id === 'all' && <span className="filter-count">({PROJECTS.length})</span>}
            </button>
          ))}
        </div>

        {/* Projects list */}
        <div className="proj-index">
          {filteredProjects.map((p) => (
            <div className="proj-row-wrap" key={p.index} data-reveal="rise">
              <a className="proj-row" href={`#/project/${p.index}`}>
                <span className="proj-no font-hero" aria-hidden="true">
                  {p.index}
                </span>

                <div className="proj-body">
                  <div className="proj-title-line">
                    <h3 className="proj-name font-hero">{p.name}</h3>
                    <span className="proj-tag">{p.tagline}</span>
                    {p.live && (
                      <span className="live-status-pill">
                        <span className="live-dot" /> LIVE DEMO
                      </span>
                    )}
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

                <div className="proj-actions">
                  <span className="proj-cta">
                    CASE STUDY <span className="proj-arrow" aria-hidden="true">→</span>
                  </span>
                </div>
              </a>

              {/* Direct Quick External Actions */}
              <div className="proj-quick-external">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-ext-link quick-ext-live"
                    title={`Open live site for ${p.name}`}
                  >
                    <span>Launch</span> ↗
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-ext-link"
                    title={`View GitHub repository for ${p.name}`}
                  >
                    <span>Code</span> ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="zoom-dark" data-zoom-dark />
        <div className="vignette" />
      </div>
    </section>
  );
}
