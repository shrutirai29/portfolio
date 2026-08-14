import React, { useEffect, useRef } from 'react';

export default function Particles({ density = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let w = 0;
    let h = 0;

    const isMobile = window.innerWidth <= 768;
    const N = Math.round((isMobile ? 16 : 44) * density);
    const dots = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < N; i++) {
      dots.push({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: 0.25 + Math.random() * 0.75, // depth → speed + size
        r: 0.6 + Math.random() * 1.5,
        tw: Math.random() * Math.PI * 2,
      });
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      for (const d of dots) {
        d.y -= 0.00012 * d.z; // slow upward drift
        d.tw += 0.008 * d.z;
        if (d.y < -1.05) d.y = 1.05;
        const x = cx + d.x * (w * 0.55);
        const y = cy + d.y * (h * 0.55);
        const a = (0.12 + 0.22 * d.z) * (0.6 + 0.4 * Math.sin(d.tw));
        ctx.beginPath();
        ctx.arc(x, y, d.r * (0.7 + d.z * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 220, 196, ${a.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />;
}
