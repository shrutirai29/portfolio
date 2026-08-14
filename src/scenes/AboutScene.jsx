import React from 'react';
import { ABOUT, IMG } from '../data.js';

export default function AboutScene() {
  return (
    <section className="scene" data-scene="about" aria-label="About Me">
      <div className="stage" data-stage>
        <div className="scene-content about-content">
          <div className="about-grid">
            <figure className="about-photo">
              <div className="photo-frame" data-photo>
                <img src={IMG('mainImage.webp')} alt="Shruti Rai" loading="eager" decoding="async" />
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
            </div>
          </div>
        </div>
        <div className="zoom-dark" data-zoom-dark />
        <div className="vignette" />
      </div>
    </section>
  );
}
