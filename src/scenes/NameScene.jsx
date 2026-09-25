import React from 'react';
import Particles from '../components/Particles.jsx';

const LINE_ONE = 'SHRUTI'.split('');
const LINE_TWO = ['R', 'A', 'I'];

const FLOATERS = [
  { text: '// works on my machine 🤷', left: '4%', top: '14%', rot: -5, dur: 7, delay: 0.2 },
  { text: 'const bugs = 0; // trust me', left: '16%', top: '8%', rot: -2, dur: 8.8, delay: 1.3, hideSm: true },
  { text: 'while (alive) { coffee(); }', right: '5%', top: '16%', rot: 4, dur: 8.5, delay: 1.1 },
  { text: 'setTimeout(realFix, 99999); // later', right: '18%', top: '8%', rot: 2, dur: 9.4, delay: 2, hideSm: true },
  { text: 'console.log("feature, not a bug")', left: '5%', top: '42%', rot: -3, dur: 9, delay: 0.6, hideSm: true },
  { text: 'git commit -m "final_v2_FINAL_v3"', right: '5%', top: '42%', rot: 3, dur: 7.5, delay: 1.6, hideSm: true },
  { text: 'catch (error) { blameTheWiFi(); }', left: '6%', bottom: '26%', rot: -4, dur: 8, delay: 0.9 },
  { text: "if (works) { don'tTouchIt(); }", right: '6%', bottom: '26%', rot: 5, dur: 7.2, delay: 0.3 },
];

export default function NameScene() {
  return (
    <section className="scene" data-scene="name" aria-label="Shruti Rai — full name">
      <div className="stage" data-stage>
        <Particles />
        <div className="scene-content name-content">
          <div className="name-row">
            {LINE_ONE.map((l, i) => (
              <span key={i} className="letter" data-letter={l}>
                {l}
              </span>
            ))}
          </div>
          <div className="name-row name-row-a">
            {LINE_TWO.map((l, i) => (
              <span
                key={i}
                className={`letter${l === 'A' ? ' letter-a' : ''}`}
                data-focal={l === 'A' ? 'a' : undefined}
                data-letter={l}
              >
                {l}
                {l === 'A' && <span className="portal-ring" aria-hidden="true" />}
              </span>
            ))}
          </div>
        </div>

        <div className="name-caption">
          <span>B.TECH CSE · RASHTRIYA RAKSHA UNIVERSITY</span>
          <span className="name-caption-dot">·</span>
          <span>FULL-STACK · AI · CYBERSECURITY</span>
        </div>

        {/* Floating dev jokes */}
        <div className="floaters" aria-hidden="true">
          {FLOATERS.map((f, i) => (
            <code
              key={i}
              className={`floater${f.hideSm ? ' floater-hide-sm' : ''}`}
              style={{
                ...(f.left ? { left: f.left } : { right: f.right }),
                ...(f.top ? { top: f.top } : { bottom: f.bottom }),
                '--rot': `${f.rot}deg`,
                '--dur': `${f.dur}s`,
                '--d': `${f.delay}s`,
              }}
            >
              {f.text}
            </code>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-cue" aria-hidden="true">
          <div className="scroll-cue-mouse">
            <div className="scroll-cue-wheel" />
          </div>
          <span className="scroll-cue-text">SCROLL TO ENTER</span>
        </div>

        <div className="zoom-dark" data-zoom-dark />
        <div className="vignette vignette-name" />
      </div>
    </section>
  );
}
