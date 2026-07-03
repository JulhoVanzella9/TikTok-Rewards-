// Regenerates package/public/videos-exclusivos/index.json from the .mp4 files
// in that folder. Run from the repo root:  node scripts/gerar-index-exclusivos.mjs
import { readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dir = join(root, "..", "package", "public", "videos-exclusivos");

const files = readdirSync(dir)
  .filter((f) => f.toLowerCase().endsWith(".mp4"))
  .sort();

writeFileSync(join(dir, "index.json"), JSON.stringify(files, null, 2) + "\n");
console.log(`index.json atualizado com ${files.length} video(s) exclusivo(s).`);
