import React from 'react';
import Glass from '../components/Glass.jsx';

export default function SRScene() {
  return (
    <section className="scene" data-scene="sr" aria-label="Shruti Rai — initials">
      <div className="stage" data-stage>
        <div className="scene-content sr-content">
          <div className="sr-eyebrow">PORTFOLIO · 2026</div>
          <h1 className="sr-title font-hero">S.R.</h1>
          <div className="sr-rule" />
          <p className="sr-caption">a cinematic journey through code, creativity &amp; curiosity</p>
        </div>
        <div className="scroll-hint">
          <span className="scroll-hint-label">SCROLL</span>
          <span className="scroll-hint-line" />
        </div>
      </div>
      <Glass />
      <div className="vignette" />
    </section>
  );
}
