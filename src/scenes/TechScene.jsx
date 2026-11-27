import React from 'react';
import { TECH } from '../data.js';

const CAPS = [
  {
    key: 'lang',
    label: '01 · PROGRAMMING LANGUAGES',
    icon: '⚡',
    items: TECH.languages,
    highlight: 'Python · C++ · Java · JavaScript · TypeScript · C',
  },
  {
    key: 'web',
    label: '02 · FRONTEND ENGINEERING',
    icon: '🎨',
    items: TECH.web,
    highlight: 'React.js · JavaScript · TypeScript · Tailwind CSS · HTML5 · CSS3',
  },
  {
    key: 'backend',
    label: '03 · BACKEND & DATABASES',
    icon: '🗄️',
    items: TECH.backend,
    highlight: 'Node.js · Express.js · FastAPI · Flask · REST APIs · MongoDB · SQLite · SQLAlchemy',
  },
  {
    key: 'aiml',
    label: '04 · AI / ML & DATA ANALYTICS',
    icon: '🤖',
    items: TECH.aiml,
    highlight: 'TensorFlow · Scikit-learn · YOLOv8 · OpenCV · CNN Classification · Streamlit',
  },
  {
    key: 'tools',
    label: '05 · TOOLS & PLATFORMS',
    icon: '⚙️',
    items: TECH.tools,
    highlight: 'Git · GitHub · Postman · VS Code · Linux · Render · Cloudinary',
  },
  {
    key: 'security',
    label: '06 · CYBERSECURITY & ALGORITHMS',
    icon: '🛡️',
    items: TECH.security.concat(TECH.concepts),
    highlight: 'TryHackMe Top 2% (100+ Rooms) · 200+ LeetCode · Secure Architecture',
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
