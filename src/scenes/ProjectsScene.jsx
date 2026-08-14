import React from 'react';
import { PROJECTS } from '../data.js';

export default function ProjectsScene() {
  return (
    <section className="scene" data-scene="projects" aria-label="Projects">
      <div className="stage" data-stage>
        <div className="scene-content projects-content">
          <h2 className="projects-heading font-hero" data-reveal="clip">
            Selected Work
          </h2>
          <div className="projects-list">
            {PROJECTS.map((p) => (
              <article className="project" key={p.index} data-reveal="rise">
                <div className="p-index font-hero">{p.index}</div>
                <div className="p-main">
                  <div className="p-title-row">
                    <h3 className="p-name font-hero">{p.name}</h3>
                    <span className="p-tagline">{p.tagline}</span>
                  </div>
                  <p className="p-desc">{p.description}</p>
                  <div className="p-tech">
                    {p.tech.map((t) => (
                      <span key={t} className="chip chip-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-links">
                  <a className="p-link" href={p.github} target="_blank" rel="noreferrer">
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                  {p.live && (
                    <a className="p-link" href={p.live} target="_blank" rel="noreferrer">
                      Live <span aria-hidden="true">↗</span>
                    </a>
                  )}
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
