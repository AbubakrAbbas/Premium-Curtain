// trim-images.mjs — crops white margins off every product photo, in place.
// Run once:  node trim-images.mjs   (then rebuild: npm run build)
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = "source-images/products"; // originals; then run: node optimize-images.mjs
let done = 0;

for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".jpg"))) {
  const p = path.join(dir, f);
  try {
    const before = await sharp(p).metadata();
    // trim() removes borders that match the image's corner pixel (white page margins)
    const trimmed = await sharp(p).trim({ threshold: 45 }).toBuffer();
    const after = await sharp(trimmed).metadata();
    const changed =
      after.width < before.width * 0.95 || after.height < before.height * 0.95;
    if (changed) {
      await sharp(trimmed)
        .jpeg({ quality: 88 })
        .toFile(p + ".tmp");
      fs.renameSync(p + ".tmp", p);
      console.log(
        `✂️  ${f}:  ${before.width}×${before.height} → ${after.width}×${after.height}`,
      );
      done++;
    } else {
      console.log(`✓   ${f}: already clean`);
    }
  } catch (e) {
    console.log(`⚠️  ${f}: skipped (${e.message})`);
  }
}
console.log(`\n${done} image(s) trimmed.`);
