import React from 'react';
import { IMG, PROJECTS } from '../data.js';

export default function ProjectDetail({ index }) {
  const project = PROJECTS.find((p) => p.index === index);

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

      <a className="detail-back" href="#/">
        <span aria-hidden="true">←</span> BACK TO THE JOURNEY
      </a>

      <main className="detail-content">
        <span className="kicker">SELECTED WORK · {project.index} / {String(PROJECTS.length).padStart(2, '0')}</span>
        <h1 className="detail-title font-hero">{project.name}</h1>
        <p className="detail-tagline">{project.tagline}</p>

        <div className="detail-rule" aria-hidden="true" />

        <p className="detail-desc">{project.description}</p>

        <h2 className="detail-subhead">WHAT&rsquo;S INSIDE</h2>
        <ul className="detail-highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className="detail-tech">
          {project.tech.map((t) => (
            <span className="cap-chip" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="detail-links">
          {project.live && (
            <a className="detail-link detail-link-live" href={project.live} target="_blank" rel="noreferrer">
              <span className="detail-link-label">VIEW LIVE</span>
              <span className="detail-link-arrow" aria-hidden="true">→</span>
            </a>
          )}
          <a className="detail-link" href={project.github} target="_blank" rel="noreferrer">
            <span className="detail-link-label">SOURCE ON GITHUB</span>
            <span className="detail-link-arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <p className="detail-foot">S.R. — {project.name}</p>
      </main>
    </div>
  );
}
