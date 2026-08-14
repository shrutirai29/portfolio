import React from 'react';
import Particles from '../components/Particles.jsx';

const LINE_ONE = 'SHRUTI'.split('');
const LINE_TWO = ['R', 'A', 'I'];

export default function NameScene() {
  return (
    <section className="scene" data-scene="name" aria-label="Shruti Rai — full name">
      <div className="stage" data-stage>
        <Particles />
        <div className="scene-content name-content">
          <div className="name-row">
            {LINE_ONE.map((l, i) => (
              <span key={i} className="letter">
                {l}
              </span>
            ))}
          </div>
          <div className="name-row name-row-a">
            {LINE_TWO.map((l, i) => (
              <span key={i} className={`letter${l === 'A' ? ' letter-a' : ''}`} data-focal={l === 'A' ? 'a' : undefined}>
                {l}
                {l === 'A' && <span className="portal-ring" aria-hidden="true" />}
              </span>
            ))}
          </div>
        </div>
        <div className="name-caption">
          <span>B.TECH CSE · RASHTRIYA RAKSHA UNIVERSITY</span>
          <span className="name-caption-dot">·</span>
          <span>FULL-STACK · AI · SECURITY</span>
        </div>
        <div className="zoom-dark" data-zoom-dark />
        <div className="vignette vignette-name" />
      </div>
    </section>
  );
}
