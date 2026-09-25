import React, { useEffect } from 'react';
import { IMG, PROJECTS } from '../data.js';
import { sounds } from '../lib/sound.js';

export default function ProjectDetail({ index }) {
  const project = PROJECTS.find((p) => p.index === index);
  const pos = PROJECTS.findIndex((p) => p.index === index);
  const prev = pos > 0 ? PROJECTS[pos - 1] : null;
  const next = pos < PROJECTS.length - 1 ? PROJECTS[pos + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        window.location.hash = '#/';
      } else if (e.key === 'ArrowLeft' && prev) {
        window.location.hash = `#/project/${prev.index}`;
      } else if (e.key === 'ArrowRight' && next) {
        window.location.hash = `#/project/${next.index}`;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [prev, next]);

  if (!project) {
    return (
      <div className="detail-page">
        <div className="world-backdrop" style={{ backgroundImage: `url(${IMG('background.webp')})` }} aria-hidden="true" />
        <div className="world-shade" aria-hidden="true" />
        <div className="detail-missing">
          <p>Project not found.</p>
          <a className="detail-back" href="#/">
            ← BACK TO THE JOURNEY
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div
        className="world-backdrop"
        style={{ backgroundImage: `url(${IMG('background.webp')})` }}
        aria-hidden="true"
      />
      <div className="world-shade" aria-hidden="true" />

      {/* Top Bar Navigation */}
      <div className="detail-header-bar">
        <a
          className="detail-back"
          href="#/"
          onClick={() => sounds.playChime(520, 0.15)}
          title="Press Esc to return"
        >
          <span aria-hidden="true">←</span> BACK TO THE JOURNEY <span className="kbd-shortcut">(ESC)</span>
        </a>
        <div className="detail-header-actions">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-header-btn detail-header-live"
            >
              <span>Visit Live App</span> ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-header-btn"
            >
              <span>GitHub</span> ↗
            </a>
          )}
        </div>
      </div>

      <main className="detail-content">
        <span className="kicker">
          SELECTED WORK · {project.index} OF {String(PROJECTS.length).padStart(2, '0')}
        </span>
        <h1 className="detail-title font-hero">{project.name}</h1>
        <p className="detail-tagline">{project.tagline}</p>

        <div className="detail-rule" aria-hidden="true" />

        <p className="detail-desc">{project.description}</p>

        {/* Quick facts — verified details at a glance */}
        <div className="detail-facts">
          {project.facts.map(([label, value]) => (
            <div className="detail-fact" key={label}>
              <span className="detail-fact-label">{label}</span>
              <span className="detail-fact-value">{value}</span>
            </div>
          ))}
        </div>

        <h2 className="detail-subhead">ARCHITECTURE &amp; FEATURES</h2>
        <ul className="detail-highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <h2 className="detail-subhead">TECH STACK BREAKDOWN</h2>
        <div className="detail-stack">
          {Object.entries(project.stackGroups).map(([group, items]) => (
            <div className="detail-stack-group" key={group}>
              <span className="detail-stack-label">{group}</span>
              <div className="detail-stack-items">
                {items.map((t) => (
                  <span className="cap-chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Project Links Action CTAs */}
        <div className="detail-links">
          {project.live && (
            <a className="detail-link detail-link-live" href={project.live} target="_blank" rel="noreferrer">
              <span className="detail-link-label">LAUNCH LIVE PROJECT</span>
              <span className="detail-link-arrow" aria-hidden="true">→</span>
            </a>
          )}
          {project.github && (
            <a className="detail-link" href={project.github} target="_blank" rel="noreferrer">
              <span className="detail-link-label">VIEW SOURCE ON GITHUB</span>
              <span className="detail-link-arrow" aria-hidden="true">→</span>
            </a>
          )}
          <a className="detail-link" href="#/" onClick={() => sounds.playHover()}>
            <span className="detail-link-label">BACK TO PORTFOLIO</span>
            <span className="detail-link-arrow" aria-hidden="true">↑</span>
          </a>
        </div>

        {/* Prev / next navigation */}
        <nav className="detail-nav" aria-label="Other projects">
          {prev ? (
            <a
              className="detail-nav-link"
              href={`#/project/${prev.index}`}
              onClick={() => sounds.playHover()}
            >
              <span className="detail-nav-dir" aria-hidden="true">←</span>
              <span className="detail-nav-body">
                <span className="detail-nav-kicker">PREVIOUS PROJECT</span>
                <span className="detail-nav-name">{prev.name}</span>
              </span>
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a
              className="detail-nav-link detail-nav-next"
              href={`#/project/${next.index}`}
              onClick={() => sounds.playHover()}
            >
              <span className="detail-nav-body">
                <span className="detail-nav-kicker">NEXT PROJECT</span>
                <span className="detail-nav-name">{next.name}</span>
              </span>
              <span className="detail-nav-dir" aria-hidden="true">→</span>
            </a>
          ) : (
            <span />
          )}
        </nav>

        <p className="detail-foot">S.R. — {project.name} · {project.role}</p>
      </main>
    </div>
  );
}
