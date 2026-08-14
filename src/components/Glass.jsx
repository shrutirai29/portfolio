import React, { useMemo } from 'react';

// Glass-breaking built the way real glass breaks (technique inspired by
// "Smash the Screen" — Delaunay triangulation):
//   1. scatter points around an impact point (jittered rings + boundary)
//   2. Delaunay-triangulate them → irregular triangle shards
//   3. every crack line in the pre-break phase IS a shard boundary,
//      so the pane cracks exactly where it will split
//   4. each shard flies outward from the impact point with its own
//      direction, depth, rotation and fade
// The impact point sits near the center (the user asked for a
// center-origin break), so the whole pane bursts radially from there.

/* ---------- Delaunay triangulation (Bowyer–Watson) ---------- */

function inCircumcircle(a, b, c, p) {
  const ax = a.x - p.x;
  const ay = a.y - p.y;
  const bx = b.x - p.x;
  const by = b.y - p.y;
  const cx = c.x - p.x;
  const cy = c.y - p.y;
  return (
    (ax * ax + ay * ay) * (bx * cy - cx * by) -
    (bx * bx + by * by) * (ax * cy - cx * ay) +
    (cx * cx + cy * cy) * (ax * by - bx * ay)
  ) < 0;
}

const triKey = (t) => [...t].sort((a, b) => a - b).join('|');

function delaunay(points) {
  const n = points.length;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  const dmax = Math.max(maxX - minX, maxY - minY, 1);
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const superT = [
    { x: midX - 20 * dmax, y: midY - dmax },
    { x: midX, y: midY + 20 * dmax },
    { x: midX + 20 * dmax, y: midY - dmax },
  ];
  const pts = points.concat(superT);
  let tris = new Set([triKey([n, n + 1, n + 2])]);

  for (let i = 0; i < n; i++) {
    const p = points[i];
    const bad = new Set();
    for (const k of tris) {
      const [a, b, c] = k.split('|').map(Number);
      if (inCircumcircle(pts[a], pts[b], pts[c], p)) bad.add(k);
    }
    const boundary = new Map();
    for (const k of bad) {
      const [a, b, c] = k.split('|').map(Number);
      for (const [x, y] of [[a, b], [b, c], [c, a]]) {
        const ek = x < y ? `${x}|${y}` : `${y}|${x}`;
        boundary.set(ek, (boundary.get(ek) || 0) + 1);
      }
    }
    for (const k of bad) tris.delete(k);
    for (const [ek, count] of boundary) {
      if (count === 1) {
        const [a, b] = ek.split('|').map(Number);
        tris.add(triKey([a, b, i]));
      }
    }
  }

  const out = [];
  for (const k of tris) {
    const [a, b, c] = k.split('|').map(Number);
    if (a >= n || b >= n || c >= n) continue;
    out.push([pts[a], pts[b], pts[c]]);
  }
  return out;
}

/* ---------- geometry: impact point, rings, triangulation ---------- */

function buildGeometry(w, h) {
  const mobile = w <= 768;
  // Impact slightly off true center — real glass never hits dead center.
  const cx = w * (0.5 + (Math.random() - 0.5) * 0.08);
  const cy = h * (0.5 + (Math.random() - 0.5) * 0.08);
  const maxR = Math.hypot(w, h) / 2;

  const rings = mobile ? [0.14, 0.34, 0.6, 0.88] : [0.12, 0.3, 0.52, 0.78];
  const counts = mobile ? [5, 8, 11, 14] : [6, 10, 14, 18];

  const points = [{ x: cx, y: cy }];
  rings.forEach((r, ri) => {
    const n = counts[ri];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.55;
      const rad = Math.max(6, (r + (Math.random() - 0.5) * 0.16) * maxR);
      points.push({ x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad });
    }
  });

  // boundary points just outside the frame so the mesh closes cleanly
  const perEdge = mobile ? 3 : 5;
  for (let e = 0; e < 4; e++) {
    for (let i = 1; i <= perEdge; i++) {
      const t = i / (perEdge + 1);
      const j = (Math.random() - 0.5) * 10;
      if (e === 0) points.push({ x: w * t + j, y: -8 });
      else if (e === 1) points.push({ x: w + 8, y: h * t + j });
      else if (e === 2) points.push({ x: w * t + j, y: h + 8 });
      else points.push({ x: -8, y: h * t + j });
    }
  }
  points.push({ x: -8, y: -8 }, { x: w + 8, y: -8 }, { x: w + 8, y: h + 8 }, { x: -8, y: h + 8 });

  // dedupe (jitter can collide at 0.1px)
  const seen = new Set();
  const uniq = [];
  for (const p of points) {
    const k = `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    if (!seen.has(k)) {
      seen.add(k);
      uniq.push(p);
    }
  }

  const tris = delaunay(uniq);

  const shards = [];
  const edges = new Map();
  const edgeKey = (a, b) =>
    `${Math.min(a.x, b.x).toFixed(1)},${Math.min(a.y, b.y).toFixed(1)}|${Math.max(a.x, b.x).toFixed(1)},${Math.max(a.y, b.y).toFixed(1)}`;

  for (const tri of tris) {
    const [p0, p1, p2] = tri;
    const gx = (p0.x + p1.x + p2.x) / 3;
    const gy = (p0.y + p1.y + p2.y) / 3;
    const dx = gx - cx;
    const dy = gy - cy;
    const dist = Math.hypot(dx, dy) || 1;
    shards.push({
      clip: `polygon(${((p0.x / w) * 100).toFixed(2)}% ${((p0.y / h) * 100).toFixed(2)}%, ${((p1.x / w) * 100).toFixed(2)}% ${((p1.y / h) * 100).toFixed(2)}%, ${((p2.x / w) * 100).toFixed(2)}% ${((p2.y / h) * 100).toFixed(2)}%)`,
      dx: dx / dist,
      dy: dy / dist,
      depth: Math.min(1, dist / maxR),
      glint: Math.random() < 0.14,
    });
    for (const [a, b] of [[p0, p1], [p1, p2], [p2, p0]]) {
      const ek = edgeKey(a, b);
      if (edges.has(ek)) continue;
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const mdist = Math.hypot(mx - cx, my - cy);
      if (mdist > maxR * 1.02) continue;
      // radial lines (running away from the impact) are the bright
      // primary fractures; short cross-edges are faint connectors
      const ex = b.x - a.x;
      const ey = b.y - a.y;
      const el = Math.hypot(ex, ey) || 1;
      const rx = mx - cx;
      const ry = my - cy;
      const rl = Math.hypot(rx, ry) || 1;
      const dot = Math.abs((ex / el) * (rx / rl) + (ey / el) * (ry / rl));
      edges.set(ek, { a, b, tier: dot > 0.8 ? 'r' : 'c' });
    }
  }

  const cracks = [...edges.values()]
    .filter((e) => Math.hypot((e.a.x + e.b.x) / 2 - cx, (e.a.y + e.b.y) / 2 - cy) > maxR * 0.05)
    .map((e) => ({
      d: `M ${((e.a.x / w) * 100).toFixed(2)} ${((e.a.y / h) * 100).toFixed(2)} L ${((e.b.x / w) * 100).toFixed(2)} ${((e.b.y / h) * 100).toFixed(2)}`,
      tier: e.tier,
    }));

  return { shards, cracks, impactX: (cx / w) * 100, impactY: (cy / h) * 100 };
}

export default function Glass() {
  const { shards, cracks, impactX, impactY } = useMemo(
    () => buildGeometry(window.innerWidth, window.innerHeight),
    []
  );

  return (
    <div
      className="glass-layer"
      style={{ '--ix': `${impactX}%`, '--iy': `${impactY}%` }}
      aria-hidden="true"
    >
      <div className="glass-sheen" />
      <div className="glass-shock" />
      <svg className="glass-cracks" viewBox="0 0 100 100" preserveAspectRatio="none">
        {cracks.map((c, i) => (
          <path key={i} className="crack-path" data-tier={c.tier} d={c.d} />
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
              ? 'linear-gradient(135deg, rgba(216,204,246,0.30), rgba(216,204,246,0.06) 45%, rgba(185,168,230,0.16))'
              : 'linear-gradient(135deg, rgba(236,232,248,0.09), rgba(236,232,248,0.02) 50%, rgba(185,168,230,0.06))',
          }}
        />
      ))}
    </div>
  );
}
