// Converts the provided PNG assets (kept at the project root) to optimized WebP.
// Run with: npm run optimize:images
import sharp from 'sharp';

const jobs = [
  { from: 'mainImage.png', to: 'public/img/mainImage.webp', width: 1100, quality: 82 },
  { from: 'Anime1.png', to: 'public/img/anime1.webp', width: 908, quality: 82 },
  { from: 'Anime2.png', to: 'public/img/anime2.webp', width: 904, quality: 82 },
  { from: 'background.png', to: 'public/img/background.webp', width: 1536, quality: 78 },
];

for (const job of jobs) {
  await sharp(job.from)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality })
    .toFile(job.to);
  console.log(`✓ ${job.to}`);
}
console.log('Done.');
