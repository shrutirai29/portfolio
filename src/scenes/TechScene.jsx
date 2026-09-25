import React from 'react';
import { TECH } from '../data.js';

const CAPS = [
  {
    key: 'lang',
    label: '01 · LANGUAGES',
    icon: '⚡',
    items: TECH.languages,
    highlight: 'C++ · Python · Java · JS',
  },
  {
    key: 'web',
    label: '02 · WEB & FRONTEND',
    icon: '🎨',
    items: TECH.web,
    highlight: 'React.js · Vite · Tailwind · Node',
  },
  {
    key: 'backend',
    label: '03 · BACKEND & DATA',
    icon: '🗄️',
    items: TECH.backend,
    highlight: 'Flask · MongoDB · SQL · REST APIs',
  },
  {
    key: 'security',
    label: '04 · SECURITY & SYSTEMS',
    icon: '🛡️',
    items: TECH.security,
    highlight: 'Linux · TryHackMe · Secure Coding',
  },
  {
    key: 'tools',
    label: '05 · CORE & ARCHITECTURE',
    icon: '⚙️',
    items: TECH.tools.concat(TECH.concepts),
    highlight: 'DSA · OOP · Git · Postman',
  },
];

export default function TechScene() {
  return (
    <section className="scene" data-scene="tech" aria-label="Tech Stack">
      <div className="stage" data-stage>
        <div className="tech-head" data-reveal="clip">
          <span className="kicker">03 · ARSENAL &amp; CAPABILITIES</span>
          <h2 className="tech-title font-hero">
            Tech <em>Stack</em>
          </h2>
          <p className="tech-intro">
            Modern tools and proven patterns for building production-grade full-stack and secure systems.
          </p>
        </div>

        <div className="cap-index">
          {CAPS.map((cap) => (
            <div className="cap-row" data-reveal="rise" key={cap.key}>
              <div className="cap-header-col">
                <span className="cap-icon" aria-hidden="true">{cap.icon}</span>
                <span className="cap-label">{cap.label}</span>
              </div>
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
