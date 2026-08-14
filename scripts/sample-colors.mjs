// One-off: extracts dominant colors from the provided background image
// so the portfolio palette can be derived from the actual asset.
import sharp from 'sharp';

const src = 'background.png';
const img = sharp(src);
const meta = await img.metadata();
console.log('size:', meta.width, 'x', meta.height);

// Sample a grid of pixels (downscale first for speed), quantize into buckets.
const { data, info } = await sharp(src)
  .resize({ width: 160, height: 160, fit: 'fill' })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const buckets = new Map();
const key = (r, g, b) => `${r >> 4},${g >> 4},${b >> 4}`;
for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  // skip near-black and near-white extremes? No — keep everything, report top.
  const k = key(r, g, b);
  buckets.set(k, (buckets.get(k) || 0) + 1);
}

const sorted = [...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 24);
for (const [k, n] of sorted) {
  const [r, g, b] = k.split(',').map((v) => parseInt(v, 10) * 16 + 8);
  console.log(
    `rgb(${r},${g},${b})  #${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}  ${((n / (160 * 160)) * 100).toFixed(1)}%`
  );
}

// Also report average / brightest / darkest across a few regions.
const regions = [
  ['center', 0.30, 0.25, 0.40, 0.50],
  ['top', 0.0, 0.0, 1.0, 0.35],
  ['bottom', 0.0, 0.65, 1.0, 1.0],
  ['left', 0.0, 0.0, 0.35, 1.0],
  ['right', 0.65, 0.0, 1.0, 1.0],
];
for (const [name, x0, y0, x1, y1] of regions) {
  const buf = await sharp(src)
    .extract({
      left: Math.round(meta.width * x0),
      top: Math.round(meta.height * y0),
      width: Math.round(meta.width * (x1 - x0)),
      height: Math.round(meta.height * (y1 - y0)),
    })
    .resize({ width: 8, height: 8 })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let r = 0, g = 0, b = 0, n = 0;
  for (let i = 0; i < buf.data.length; i += buf.info.channels) {
    r += buf.data[i]; g += buf.data[i + 1]; b += buf.data[i + 2]; n++;
  }
  r = Math.round(r / n); g = Math.round(g / n); b = Math.round(b / n);
  console.log(
    `region ${name.padEnd(6)} avg rgb(${r},${g},${b}) #${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`
  );
}
