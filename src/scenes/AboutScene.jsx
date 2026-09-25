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

              {/* Bio Actions */}
              <div className="about-cta-row" data-reveal="rise">
                <a
                  href="resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-btn-primary"
                >
                  <span>Download Résumé</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={scrollToProjects}
                  className="about-btn-ghost"
                >
                  <span>Explore All Projects (9)</span>
                  <span aria-hidden="true">↓</span>
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
