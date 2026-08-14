import React from 'react';
import { FACTS, IMG } from '../data.js';

export default function FunFactsScene() {
  return (
    <section className="scene" data-scene="facts" aria-label="Fun Facts">
      <div className="stage" data-stage>
        <div className="scene-content facts-content">
          <div className="facts-figure">
            <div className="anime-glow" aria-hidden="true" />
            <div className="anime-wrap">
              <div className="anime-frame" data-focal="anime" data-reveal="frame">
                <img src={IMG('anime1.webp')} alt="Anime portrait of Shruti Rai" loading="eager" decoding="async" />
              </div>
            </div>
            <div className="anime-float" aria-hidden="true">
              <img src={IMG('anime2.webp')} alt="" loading="lazy" decoding="async" />
            </div>
            <figcaption className="anime-caption">THE ANIME EDITION</figcaption>
          </div>

          <div className="facts-side">
            <h2 className="facts-heading font-hero" data-reveal="clip">
              Fun Facts
            </h2>
            <p className="facts-intro" data-reveal="rise">
              The things that don't fit on a résumé.
            </p>
            <div className="fact-list">
              {FACTS.map((f) => (
                <div className="fact" key={f.title} data-reveal="rise">
                  <span className="fact-icon" aria-hidden="true">
                    {f.icon}
                  </span>
                  <div className="fact-body">
                    <h3 className="fact-title">{f.title}</h3>
                    <p className="fact-text">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="zoom-dark" data-zoom-dark />
        <div className="vignette" />
      </div>
    </section>
  );
}
