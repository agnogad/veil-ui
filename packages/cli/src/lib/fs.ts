import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true });
}

export async function writeIfChanged(file: string, content: string) {
  if (existsSync(file)) {
    const current = await readFile(file, "utf8");
    if (current === content) return false;
  }
  await ensureDir(path.dirname(file));
  await writeFile(file, content, "utf8");
  return true;
}

export async function readFileSafe(file: string) {
  if (!existsSync(file)) return null;
  return readFile(file, "utf8");
}

/** Resolve a bundled template (works from both src/ during dev and dist/ after build). */
export async function readTemplate(name: string) {
  const file = fileURLToPath(new URL(`../templates/${name}`, import.meta.url));
  return readFile(file, "utf8");
}

export function relative(cwd: string, file: string) {
  return path.relative(cwd, file).split(path.sep).join("/");
}
