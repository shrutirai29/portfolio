import React, { useMemo } from 'react';

// Builds a fullscreen "pane of glass" from:
//  - fracture lines (SVG) radiating from the center with branches
//  - shard polygons (clip-path) that GSAP drives outward on shatter
function buildShards(w, h) {
  const mobile = w <= 768;
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.hypot(w, h) / 2;

  const rings = mobile ? [0.16, 0.42, 0.82, 1.0] : [0.13, 0.34, 0.62, 0.88, 1.0];
  const sectors = mobile ? [10, 14, 18, 22] : [8, 12, 16, 20, 24];

  const corner = (r, a) => {
    const px = cx + Math.cos(a) * r * maxR;
    const py = cy + Math.sin(a) * r * maxR;
    return { x: (px / w) * 100, y: (py / h) * 100 };
  };

  const shards = [];
  for (let i = 0; i < rings.length - 1; i++) {
    const r0 = rings[i];
    const r1 = rings[i + 1];
    const n = sectors[i];
    for (let j = 0; j < n; j++) {
      const a0 = (j / n) * Math.PI * 2;
      const a1 = ((j + 1) / n) * Math.PI * 2;
      const p = [corner(r0, a0), corner(r1, a0), corner(r1, a1), corner(r0, a1)]
        .map((pt) => `${pt.x.toFixed(2)}% ${pt.y.toFixed(2)}%`)
        .join(',');
      const mid = (a0 + a1) / 2;
      shards.push({
        clip: `polygon(${p})`,
        dx: Math.cos(mid),
        dy: Math.sin(mid),
        depth: r1,
        glint: Math.random() < 0.16,
      });
    }
  }
  return shards;
}

function buildCracks(w, h) {
  const mobile = w <= 768;
  const main = mobile ? 7 : 9;
  const paths = [];
  const cx = 50;
  const cy = 50;

  for (let k = 0; k < main; k++) {
    const base = (k / main) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
    let pts = `M ${cx} ${cy}`;
    const segs = 3;
    let px = cx;
    let py = cy;
    for (let s = 1; s <= segs; s++) {
      const t = s / segs;
      const rad = 55 * t;
      const wob = (Math.random() - 0.5) * (14 * t + 4);
      const nx = cx + Math.cos(base) * rad + Math.cos(base + 1.2) * wob;
      const ny = cy + Math.sin(base) * rad + Math.sin(base + 1.2) * wob;
      pts += ` L ${nx.toFixed(2)} ${ny.toFixed(2)}`;
      px = nx;
      py = ny;
      // occasional branch
      if (s === 2 && Math.random() < 0.6) {
        const ba = base + (Math.random() - 0.5) * 1.6;
        const bl = 8 + Math.random() * 14;
        pts += ` M ${nx.toFixed(2)} ${ny.toFixed(2)} l ${(Math.cos(ba) * bl).toFixed(2)} ${(Math.sin(ba) * bl).toFixed(2)}`;
      }
    }
    paths.push(pts);
  }
  return paths;
}

export default function Glass() {
  const shards = useMemo(() => buildShards(window.innerWidth, window.innerHeight), []);
  const cracks = useMemo(() => buildCracks(window.innerWidth, window.innerHeight), []);

  return (
    <div className="glass-layer" aria-hidden="true">
      <div className="glass-sheen" />
      <svg className="glass-cracks" viewBox="0 0 100 100" preserveAspectRatio="none">
        {cracks.map((d, i) => (
          <path key={i} className="crack-path" d={d} />
        ))}
      </svg>
      <div className="glass-flash" />
      {shards.map((s, i) => (
        <div
          key={i}
          className="glass-shard"
          data-dx={s.dx.toFixed(3)}
          data-dy={s.dy.toFixed(3)}
          data-depth={s.depth}
          style={{
            clipPath: s.clip,
            background: s.glint
              ? 'linear-gradient(135deg, rgba(255,255,255,0.30), rgba(255,255,255,0.05) 45%, rgba(190,220,255,0.18))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02) 50%, rgba(170,200,240,0.07))',
          }}
        />
      ))}
    </div>
  );
}
