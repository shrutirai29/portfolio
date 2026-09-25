import React, { useRef } from 'react';
import { ABOUT, IMG } from '../data.js';

export default function AboutScene() {
  const photoRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = photoRef.current;
    if (!el || window.innerWidth < 768) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (y / (rect.height / 2)) * -8;
    const rotY = (x / (rect.width / 2)) * 8;
    el.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const el = photoRef.current;
    if (el) {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  const scrollToProjects = () => {
    const el = document.querySelector('[data-scene="projects"]');
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { duration: 1.2, offset: -30 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 30;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="scene" data-scene="about" aria-label="About Me">
      <div className="stage" data-stage>
        <div className="scene-content about-content">
          <div className="about-grid">
            <figure
              className="about-photo"
              ref={photoRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="photo-frame" data-photo>
                <img src={IMG('mainImage.webp')} alt="Shruti Rai" loading="eager" decoding="async" />
                <div className="photo-shine" aria-hidden="true" />
              </div>
              <figcaption className="photo-caption">GANDHINAGAR · INDIA</figcaption>
            </figure>

            <div className="about-side">
              <div className="open-badge" data-focal="badge">
                <span className="badge-dot" />
                <span>{ABOUT.openToWork}</span>
              </div>
              <h2 className="about-heading font-hero" data-reveal="clip">
                About Me
              </h2>
              <p className="about-intro" data-reveal="rise">
                {ABOUT.intro}
              </p>
              <p className="about-body" data-reveal="rise">
                {ABOUT.body}
              </p>

              <dl className="about-quick" data-reveal="rise">
                {ABOUT.quick.map(([label, value]) => (
                  <div className="quick-item" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Bio Actions — Clean, refined, balanced buttons */}
              <div className="about-cta-row" data-reveal="rise">
                <a
                  href="resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-btn-primary"
                  title="View and download Shruti Rai's official résumé"
                >
                  <span>Download Résumé (PDF)</span>
                  <svg className="btn-download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={scrollToProjects}
                  className="about-btn-ghost"
                  title="Scroll to view all 9 projects"
                >
                  <span>Explore Projects (9)</span>
                  <span className="btn-arrow-down" aria-hidden="true">↓</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="zoom-dark" data-zoom-dark />
        <div className="vignette" />
      </div>
    </section>
  );
}
