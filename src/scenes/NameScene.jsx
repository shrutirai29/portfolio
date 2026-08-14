import React from 'react';
import Particles from '../components/Particles.jsx';

const LINE_ONE = 'SHRUTI'.split('');
const LINE_TWO = ['R', 'A', 'I'];

// Floating dev-humor snippets — they drift around the name like little
// sticky notes from a very relatable codebase. Pure jokes, nothing claimed
// as fact. Positions hug the edges so the big letters stay readable.
const FLOATERS = [
  { text: '// works on my machine 🤷', left: '4%', top: '13%', rot: -5, dur: 7, delay: 0.2 },
  { text: 'while (alive) { coffee(); }', right: '5%', top: '19%', rot: 4, dur: 8.5, delay: 1.1 },
  { text: 'console.log("feature, not a bug")', left: '6%', top: '42%', rot: -3, dur: 9, delay: 0.6, hideSm: true },
  { text: 'git commit -m "final_v2_FINAL_v3"', right: '6%', top: '45%', rot: 3, dur: 7.5, delay: 1.6, hideSm: true },
  { text: 'catch (error) { blameTheWiFi(); }', left: '9%', bottom: '17%', rot: -4, dur: 8, delay: 0.9 },
  { text: "if (works) { don'tTouchIt(); }", right: '9%', bottom: '13%', rot: 5, dur: 7.2, delay: 0.3 },
  { text: 'const bugs = 0; // trust me', left: '26%', bottom: '9%', rot: -2, dur: 8.8, delay: 1.3, hideSm: true },
  { text: 'setTimeout(realFix, 99999); // later', right: '22%', top: '8%', rot: 2, dur: 9.4, delay: 2, hideSm: true },
];

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
        <div className="zoom-dark" data-zoom-dark />
        <div className="vignette vignette-name" />
      </div>
    </section>
  );
}
