import React from 'react';
import { CONTACT } from '../data.js';

const EXPERIENCES = [
  {
    period: '2025',
    role: '2nd Position — Hackathon at IIT Gandhinagar',
    org: 'IIT Gandhinagar',
    category: 'HACKATHONS & INNOVATION',
    points: [
      'Secured 2nd Position competing in a high-intensity hackathon at IIT Gandhinagar.',
      'Developed and demonstrated an innovative full-stack software prototype solving practical domain challenges.',
      'Recognized by evaluation panels for technical depth, architectural scalability, and clear execution.',
    ],
    badge: '🥈 2nd Position',
  },
  {
    period: '2024 — 2025',
    role: 'Smart India Hackathon (SIH) — 6th Position',
    org: 'Rashtriya Raksha University (Internal Round)',
    category: 'HACKATHONS & INNOVATION',
    points: [
      'Secured 6th Position in the university internal round of Smart India Hackathon (SIH).',
      'Engineered an end-to-end prototype addressing high-impact problem statements under tight hackathon timelines.',
      'Demonstrated robust technical architecture, UI/UX execution, and rapid problem-solving.',
    ],
    badge: '🏆 6th Position',
  },
  {
    period: '2025 · REMOTE',
    role: 'Virtual Learning Internship – Software Engineering / Full-Stack Track',
    org: 'Infosys Springboard',
    category: 'INDUSTRY EXPERIENCE',
    points: [
      'Completed structured learning in programming, software development, and full-stack development.',
      'Worked through technical learning modules and assessments covering software engineering concepts.',
      'Applied industry best practices in modular full-stack architecture, clean code, and API engineering.',
    ],
    badge: 'Internship',
  },
  {
    period: '2024 — 2028',
    role: 'B.Tech in Computer Science and Engineering (Cybersecurity)',
    org: 'Rashtriya Raksha University, Gandhinagar',
    category: 'ACADEMICS',
    points: [
      'Academic Record: CGPA 8.17 across core computer science and engineering coursework.',
      'Specialized curricula in Cybersecurity, Full-Stack Web Development, Database Management, and Algorithms.',
      'Campus Leadership: Served as Vice President & Treasurer of Qalavant, the Drama and Films Club at RRU.',
    ],
    badge: 'CGPA 8.17',
  },
];

const METRICS = [
  {
    value: '2nd Rank',
    label: 'IIT GANDHINAGAR HACKATHON',
    detail: 'Secured 2nd Position at IIT Gandhinagar',
    link: null,
    icon: '🥈',
  },
  {
    value: 'Top 2%',
    label: 'TRYHACKME GLOBAL RANK',
    detail: 'Top 2% globally · 100+ rooms completed',
    link: CONTACT.tryhackme,
    icon: '🛡️',
  },
  {
    value: '200+',
    label: 'LEETCODE PROBLEMS',
    detail: '200+ algorithmic solves · Python & C++',
    link: CONTACT.leetcode,
    icon: '⚡',
  },
  {
    value: '8.17',
    label: 'ACADEMIC CGPA',
    detail: 'B.Tech CSE (Cybersecurity) · RRU',
    link: null,
    icon: '🎓',
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
            A track record of competitive problem solving, hackathon excellence, and rigorous software engineering.
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
          {EXPERIENCES.map((exp) => (
            <div className="exp-timeline-card" key={exp.role} data-reveal="rise">
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
