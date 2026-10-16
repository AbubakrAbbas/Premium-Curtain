// optimize-images.mjs — turns the originals in source-images/ into small WebP files
// in public/images/ (what the website actually loads).
// Run:  node optimize-images.mjs   (after adding or replacing a photo)
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "source-images";
const OUT = "public/images";
const MAX_WIDTH = 900; // cards are ~400px wide, so 900px stays sharp on retina screens
let before = 0;
let after = 0;

for (const folder of fs.readdirSync(SRC)) {
  fs.mkdirSync(path.join(OUT, folder), { recursive: true });
  for (const f of fs
    .readdirSync(path.join(SRC, folder))
    .filter((f) => /\.jpe?g$/i.test(f))) {
    const input = path.join(SRC, folder, f);
    const output = path.join(OUT, folder, f.replace(/\.jpe?g$/i, ".webp"));
    await sharp(input)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(output);
    before += fs.statSync(input).size;
    after += fs.statSync(output).size;
  }
}
console.log(`${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(1)} MB`);
