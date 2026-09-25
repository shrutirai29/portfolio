import React, { useEffect } from 'react';
import { IMG, PROJECTS } from '../data.js';
import { sounds } from '../lib/sound.js';

export default function ProjectDetail({ index }) {
  // Normalize index lookup (handles both '1' and '01')
  const normIndex = String(parseInt(index, 10) || 1).padStart(2, '0');
  const project = PROJECTS.find((p) => p.index === index || p.index === normIndex) || PROJECTS[0];
  const pos = PROJECTS.findIndex((p) => p.index === project.index);
  const prev = pos > 0 ? PROJECTS[pos - 1] : PROJECTS[PROJECTS.length - 1];
  const next = pos < PROJECTS.length - 1 ? PROJECTS[pos + 1] : PROJECTS[0];

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

  return (
    <div className="detail-page">
      <div
        className="world-backdrop"
        style={{ backgroundImage: `url(${IMG('background.webp')})` }}
        aria-hidden="true"
      />
      <div className="world-shade" aria-hidden="true" />

      {/* Sticky Full-Width Top Bar */}
      <header className="detail-header-bar">
        <a
          className="detail-back"
          href="#/"
          onClick={() => sounds.playChime(520, 0.15)}
          title="Return to main portfolio"
        >
          <span aria-hidden="true">←</span> BACK TO MAIN JOURNEY <span className="kbd-shortcut">(ESC)</span>
        </a>

        <div className="detail-header-breadcrumbs" aria-hidden="true">
          <span className="crumb-dim">SHRUTI RAI</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-dim">CASE STUDY #{project.index}</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{project.name}</span>
        </div>

        <div className="detail-header-actions">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-header-btn detail-header-live"
            >
              <span className="live-dot-pulse" />
              <span>Live App</span> ↗
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
          <div className="detail-header-nav-mini">
            <a
              href={`#/project/${prev.index}`}
              className="detail-mini-arrow"
              title={`Previous: ${prev.name}`}
              onClick={() => sounds.playHover()}
            >
              ‹
            </a>
            <a
              href={`#/project/${next.index}`}
              className="detail-mini-arrow"
              title={`Next: ${next.name}`}
              onClick={() => sounds.playHover()}
            >
              ›
            </a>
          </div>
        </div>
      </header>

      {/* Full-Screen Expansive Case Study Content */}
      <main className="detail-content detail-content-wide">
        {/* 1. HERO HEADER */}
        <section className="detail-hero-box">
          <div className="detail-kicker-row">
            <span className="detail-category-badge">
              {project.category || 'SOFTWARE ENGINEERING'}
            </span>
            <span className="detail-index-badge">
              CASE STUDY {project.index} OF {String(PROJECTS.length).padStart(2, '0')}
            </span>
            {project.live && (
              <span className="detail-status-pill detail-status-live">
                <span className="live-dot" /> LIVE DEMO AVAILABLE
              </span>
            )}
          </div>

          <h1 className="detail-title font-hero">{project.name}</h1>
          <p className="detail-tagline">{project.tagline}</p>

          <p className="detail-lead-desc">{project.description}</p>

          {/* Quick Meta Ribbon */}
          <div className="detail-meta-ribbon">
            <div className="meta-item">
              <span className="meta-label">ROLE &amp; FOCUS</span>
              <span className="meta-val">{project.role}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">CORE TECHNOLOGIES</span>
              <span className="meta-val">{project.tech.slice(0, 4).join(' · ')}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">SYSTEM AVAILABILITY</span>
              <span className="meta-val">{project.live ? 'Public Live Deployment' : 'Open-Source Architecture'}</span>
            </div>
          </div>

          {/* Direct Hero Action Buttons */}
          <div className="detail-hero-ctas">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-cta-btn detail-cta-primary"
              >
                <span>🚀 Launch Live Application</span>
                <span className="cta-arrow" aria-hidden="true">↗</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-cta-btn detail-cta-secondary"
              >
                <span>💻 View Code on GitHub</span>
                <span className="cta-arrow" aria-hidden="true">↗</span>
              </a>
            )}
            <a
              href="#/"
              className="detail-cta-btn detail-cta-ghost"
              onClick={() => sounds.playHover()}
            >
              <span>Back to Journey</span>
              <span className="cta-arrow" aria-hidden="true">↑</span>
            </a>
          </div>
        </section>

        {/* 2. HIGH-IMPACT METRICS RIBBON */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="detail-metrics-section">
            <div className="detail-metrics-grid">
              {project.metrics.map((m) => (
                <div className="detail-metric-card" key={m.label}>
                  <div className="metric-card-val font-hero">{m.value}</div>
                  <div className="metric-card-lbl">{m.label}</div>
                  {m.detail && <div className="metric-card-sub">{m.detail}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. PROBLEM & SOLUTION DUAL-COLUMN GRID */}
        {(project.problem || project.solution) && (
          <section className="detail-narrative-section">
            <div className="detail-narrative-grid">
              {project.problem && (
                <div className="narrative-card narrative-problem">
                  <div className="narrative-badge badge-problem">THE CHALLENGE &amp; CONTEXT</div>
                  <h2 className="narrative-title">The Real-World Problem</h2>
                  <p className="narrative-body">{project.problem}</p>
                  <div className="narrative-takeaway">
                    <span className="takeaway-icon">⚠️</span>
                    <span>Conventional tools fail due to rigid architectures, high friction, or inaccessible user interfaces.</span>
                  </div>
                </div>
              )}

              {project.solution && (
                <div className="narrative-card narrative-solution">
                  <div className="narrative-badge badge-solution">THE ARCHITECTURAL SOLUTION</div>
                  <h2 className="narrative-title">The Engineering Approach</h2>
                  <p className="narrative-body">{project.solution}</p>
                  <div className="narrative-takeaway">
                    <span className="takeaway-icon">💡</span>
                    <span>Built from the ground up for speed, intuitive accessibility, and zero-compromise reliability.</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. KEY ENGINEERING DEEP DIVES (4-CARD GRID) */}
        {project.deepDives && project.deepDives.length > 0 && (
          <section className="detail-deepdives-section">
            <div className="section-head-bar">
              <span className="kicker">SYSTEM CAPABILITIES</span>
              <h2 className="section-heading font-hero">
                Architectural <em>Deep Dives</em>
              </h2>
              <p className="section-subtext">
                Key technical innovations and systems engineering decisions that power {project.name}.
              </p>
            </div>

            <div className="detail-deepdives-grid">
              {project.deepDives.map((d, i) => (
                <div className="deepdive-card" key={i}>
                  <div className="deepdive-top">
                    <span className="deepdive-icon">{d.icon || '⚡'}</span>
                    <span className="deepdive-tag">{d.tag}</span>
                  </div>
                  <h3 className="deepdive-title">{d.title}</h3>
                  <p className="deepdive-desc">{d.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. ENGINEERING CHALLENGE & LESSONS LEARNED CALLOUT */}
        {project.challenges && (
          <section className="detail-challenge-callout">
            <div className="callout-inner">
              <div className="callout-icon-col">
                <span className="callout-icon">🛠️</span>
              </div>
              <div className="callout-content">
                <span className="callout-kicker">BEHIND THE BUILD · ENGINEERING REFLECTION</span>
                <h3 className="callout-title">The Hardest Bug &amp; Key Architectural Learning</h3>
                <p className="callout-text">{project.challenges}</p>
              </div>
            </div>
          </section>
        )}

        {/* 6. TECH STACK MATRIX & SYSTEM HIGHLIGHTS */}
        <section className="detail-tech-matrix-section">
          <div className="tech-matrix-grid">
            {/* Left: Tech stack groups */}
            <div className="tech-matrix-box">
              <div className="box-header">
                <span className="kicker">COMPONENTS &amp; TOOLS</span>
                <h3 className="box-title">Full Tech Stack Breakdown</h3>
              </div>
              <div className="detail-stack-groups">
                {Object.entries(project.stackGroups).map(([group, items]) => (
                  <div className="detail-stack-row" key={group}>
                    <span className="stack-group-name">{group.replace('_', ' / ')}</span>
                    <div className="stack-chips">
                      {items.map((t) => (
                        <span className="cap-chip cap-chip-elevated" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Key highlights checklist */}
            <div className="tech-matrix-box">
              <div className="box-header">
                <span className="kicker">SYSTEM CAPABILITIES</span>
                <h3 className="box-title">Key Architectural Deliverables</h3>
              </div>
              <ul className="detail-highlights-list">
                {project.highlights.map((h, i) => (
                  <li key={i} className="highlight-item">
                    <span className="check-bullet">✓</span>
                    <span className="highlight-text">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 7. QUICK SPECIFICATIONS & FACTS TABLE */}
        <section className="detail-specs-section">
          <div className="section-head-bar">
            <span className="kicker">SPECIFICATIONS</span>
            <h3 className="section-heading font-hero">Project <em>Specifications</em></h3>
          </div>
          <div className="detail-facts-wide">
            {project.facts.map(([label, value]) => (
              <div className="detail-fact-card" key={label}>
                <span className="fact-card-label">{label}</span>
                <span className="fact-card-value">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 8. BOTTOM ACTION BAR */}
        <section className="detail-action-footer">
          <div className="action-footer-inner">
            <div className="footer-meta">
              <h3 className="footer-title font-hero">Explore More Engineering</h3>
              <p className="footer-sub">Interested in discussing this architecture or building something together?</p>
            </div>
            <div className="footer-ctas">
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="detail-cta-btn detail-cta-primary">
                  <span>Visit Live App ↗</span>
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="detail-cta-btn detail-cta-secondary">
                  <span>View GitHub Code ↗</span>
                </a>
              )}
              <a href="#/" className="detail-cta-btn detail-cta-ghost" onClick={() => sounds.playHover()}>
                <span>Back to Main Journey ↑</span>
              </a>
            </div>
          </div>
        </section>

        {/* 9. PREV / NEXT PROJECT ROADMAP CARDS */}
        <nav className="detail-nav-cards" aria-label="Other projects">
          <a
            className="nav-card nav-card-prev"
            href={`#/project/${prev.index}`}
            onClick={() => sounds.playHover()}
          >
            <div className="nav-card-arrow">←</div>
            <div className="nav-card-info">
              <span className="nav-card-label">PREVIOUS CASE STUDY #{prev.index}</span>
              <span className="nav-card-title font-hero">{prev.name}</span>
              <span className="nav-card-role">{prev.role}</span>
            </div>
          </a>

          <a
            className="nav-card nav-card-next"
            href={`#/project/${next.index}`}
            onClick={() => sounds.playHover()}
          >
            <div className="nav-card-info">
              <span className="nav-card-label">NEXT CASE STUDY #{next.index}</span>
              <span className="nav-card-title font-hero">{next.name}</span>
              <span className="nav-card-role">{next.role}</span>
            </div>
            <div className="nav-card-arrow">→</div>
          </a>
        </nav>

        {/* 10. ALL 9 SELECTED PROJECTS GALLERY SWITCHER */}
        <div className="detail-all-switcher">
          <div className="section-head-bar">
            <span className="kicker">PORTFOLIO INDEX</span>
            <h3 className="section-heading font-hero">All 9 <em>Selected Works</em></h3>
            <p className="section-subtext">Click any project to inspect its complete case study.</p>
          </div>

          <div className="detail-switcher-grid">
            {PROJECTS.map((p) => (
              <a
                key={p.index}
                href={`#/project/${p.index}`}
                className={`switcher-card ${p.index === project.index ? 'switcher-card-active' : ''}`}
                onClick={() => sounds.playHover()}
              >
                <div className="switcher-top">
                  <span className="switcher-num font-hero">{p.index}</span>
                  {p.live && <span className="switcher-live-dot" title="Live demo" />}
                </div>
                <span className="switcher-name">{p.name}</span>
                <span className="switcher-role">{p.role.split('·')[0]}</span>
              </a>
            ))}
          </div>
        </div>

        <p className="detail-foot">
          Shruti Rai · B.Tech CSE · Rashtriya Raksha University · Case Study {project.index}
        </p>
      </main>
    </div>
  );
}
