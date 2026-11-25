// Exports transparent PNGs of every master SVG in ../svg into ../png.
// Run from the project root (it uses the `sharp` package already installed for the website):
//   node brand/logo/source/export-png.mjs
import { createRequire } from "node:module";
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(process.cwd(), "package.json"));
const sharp = require("sharp");

const SVG_DIR = join(here, "..", "svg");
const PNG_DIR = join(here, "..", "png");
mkdirSync(PNG_DIR, { recursive: true });

// Output widths per artwork type.
const WIDTHS = {
  symbol: [64, 256, 512, 1024],
  horizontal: [600, 1200, 2400],
  stacked: [500, 1000, 2000],
};

let count = 0;
for (const file of readdirSync(SVG_DIR).filter((f) => f.endsWith(".svg"))) {
  const kind = file.includes("-horizontal-") ? "horizontal" : file.includes("-stacked-") ? "stacked" : "symbol";
  const svg = readFileSync(join(SVG_DIR, file));
  const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg.toString());
  const vbWidth = Number(vb[1]);
  for (const width of WIDTHS[kind]) {
    // Render at the exact target width: density scales the SVG's own 72-dpi size.
    const density = Math.max(1, (72 * width) / vbWidth);
    const out = join(PNG_DIR, `${basename(file, ".svg")}-${width}.png`);
    await sharp(svg, { density }).resize({ width }).png({ compressionLevel: 9 }).toFile(out);
    count += 1;
  }
}
console.log(`wrote ${count} PNGs to ${PNG_DIR}`);
