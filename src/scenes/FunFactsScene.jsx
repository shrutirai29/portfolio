import React from 'react';
import { FACTS, FACTS_INTRO, IMG } from '../data.js';

// Settled rotations for the scrapbook pieces (applied by the timeline,
// so GSAP owns transforms — no CSS/GSAP conflicts).
const ROTS = [-1.6, 1.8, -1.2, 2.1, -2.2, 1.3];

export default function FunFactsScene() {
  return (
    <section className="scene" data-scene="facts" aria-label="Fun Facts">
      <div className="stage" data-stage>
        <div className="scrap-head" data-reveal="clip">
          <span className="kicker">06 · BEHIND THE CODE</span>
          <h2 className="scrap-title font-hero">
            Fun <em>Facts</em>
          </h2>
          <p className="scrap-intro" data-reveal="rise">
            {FACTS_INTRO}
          </p>
        </div>

        <div className="scrap-collage">
          <div className="scrap-anime">
            <div className="anime-glow" aria-hidden="true" />
            <div className="anime-wrap">
              <div className="anime-frame" data-focal="anime" data-reveal="frame">
                <img src={IMG('anime1.webp')} alt="Anime portrait of Shruti Rai" loading="eager" decoding="async" />
              </div>
            </div>
            <span className="scrap-tape" aria-hidden="true" />
            <span className="scrap-note">THE ANIME EDITION — ONE OF MANY</span>
            <div className="anime-float" aria-hidden="true">
              <img src={IMG('anime2.webp')} alt="" loading="lazy" decoding="async" />
            </div>
          </div>

          {FACTS.map((f, i) => (
            <div className="scrap-fact" key={f.title} data-reveal="rise" data-rot={ROTS[i]} data-idx={i + 1}>
              <span className="scrap-no font-hero" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="scrap-icon" aria-hidden="true">
                {f.icon}
              </span>
              <h3 className="scrap-fact-title">{f.title}</h3>
              <p className="scrap-fact-text">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="scrap-ghost font-hero" aria-hidden="true">
          S.R.
        </div>

        <div className="zoom-dark" data-zoom-dark />
        <div className="vignette" />
      </div>
    </section>
  );
}
