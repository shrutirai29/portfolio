import React from 'react';
import { CONTACT } from '../data.js';

const EXPERIENCES = [
  {
    period: '2025 · VIRTUAL',
    role: 'Full-Stack Software Engineering Intern',
    org: 'Infosys Springboard',
    category: 'INDUSTRY EXPERIENCE',
    points: [
      'Completed full-stack engineering modules spanning frontend architecture, backend REST APIs, and database modeling.',
      'Earned multiple industry certificates and demonstrated robust software engineering practices.',
      'Practiced clean code, modular architecture, and security-first development standards.',
    ],
    badge: 'Internship',
  },
  {
    period: '2024 — 2028',
    role: 'B.Tech in Computer Science & Engineering',
    org: 'Rashtriya Raksha University, Gandhinagar',
    category: 'ACADEMICS',
    points: [
      'Current CGPA: 8.17 across core engineering and computing curricula.',
      'Specialized coursework in Data Structures, Algorithms, Cybersecurity, Networks, and Full-Stack Engineering.',
      'Active leadership: Vice President & Treasurer of Qalavant (university drama and creative club).',
    ],
    badge: 'CGPA 8.17',
  },
];

const METRICS = [
  {
    value: 'Top 5%',
    label: 'TRYHACKME GLOBAL RANK',
    detail: '82 rooms · 46-day streak · 4 badges',
    link: CONTACT.tryhackme,
    icon: '🛡️',
  },
  {
    value: '100+',
    label: 'LEETCODE PROBLEMS',
    detail: 'DSA in Python & C++ · Active grinder',
    link: CONTACT.leetcode,
    icon: '⚡',
  },
  {
    value: '8.17',
    label: 'ACADEMIC CGPA',
    detail: 'B.Tech CSE · Rashtriya Raksha Univ',
    link: null,
    icon: '🎓',
  },
  {
    value: '09+',
    label: 'SHIPPED PROJECTS',
    detail: 'Full-stack, AI, WebGL & Systems',
    link: CONTACT.github,
    icon: '🚀',
  },
];

export default function ExperienceScene() {
  return (
    <section className="scene" data-scene="experience" aria-label="Experience & Credentials">
      <div className="stage" data-stage>
        <div className="exp-head" data-reveal="clip">
          <span className="kicker">05 · CREDENTIALS &amp; MILESTONES</span>
          <h2 className="exp-title font-hero">
            Journey &amp; <em>Milestones</em>
          </h2>
          <p className="exp-intro">
            A track record of consistent hands-on building, competitive problem solving, and rigorous computer science.
          </p>
        </div>

        {/* Highlight Metrics Grid */}
        <div className="exp-metrics-grid" data-reveal="rise">
          {METRICS.map((m) => {
            const Content = (
              <div className="metric-card" key={m.label}>
                <div className="metric-header">
                  <span className="metric-icon" aria-hidden="true">{m.icon}</span>
                  {m.link && (
                    <span className="metric-ext-arrow" aria-hidden="true">↗</span>
                  )}
                </div>
                <div className="metric-value font-hero">{m.value}</div>
                <div className="metric-label">{m.label}</div>
                <div className="metric-detail">{m.detail}</div>
              </div>
            );

            return m.link ? (
              <a
                key={m.label}
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="metric-card-link"
              >
                {Content}
              </a>
            ) : (
              <div key={m.label} className="metric-card-wrap">
                {Content}
              </div>
            );
          })}
        </div>

        {/* Experience & Education Cards */}
        <div className="exp-cards-container">
          {EXPERIENCES.map((exp, idx) => (
            <div className="exp-timeline-card" key={exp.org} data-reveal="rise">
              <div className="exp-card-glow" aria-hidden="true" />
              <div className="exp-card-header">
                <div>
                  <span className="exp-period">{exp.period}</span>
                  <h3 className="exp-role font-hero">{exp.role}</h3>
                  <div className="exp-org">{exp.org}</div>
                </div>
                <span className="exp-badge">{exp.badge}</span>
              </div>
              <ul className="exp-points">
                {exp.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="exp-ghost font-hero" aria-hidden="true">
          S.R.
        </div>
        <div className="vignette" />
      </div>
    </section>
  );
}
