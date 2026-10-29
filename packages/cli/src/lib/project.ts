import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { parseJsonc } from "./config";

export interface ProjectInfo {
  cwd: string;
  hasPackageJson: boolean;
  name?: string;
  framework: "next" | "vue" | "vite" | "remix" | "unknown";
  tailwindMajor: number | null;
  rsc: boolean;
  srcDir: boolean;
  /** Alias prefix declared in tsconfig paths, e.g. `@`. */
  aliasPrefix: string;
  /** Whether tsconfig maps `@/*` to `./src/*`. */
  aliasTarget: string;
  cssFile: string | null;
  packageManager: "pnpm" | "npm" | "yarn" | "bun";
}

interface PackageJson {
  name?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

interface TsConfig {
  compilerOptions?: {
    baseUrl?: string;
    paths?: Record<string, string[]>;
  };
}

export async function readPackageJson(cwd: string) {
  const file = path.join(cwd, "package.json");
  if (!existsSync(file)) return null;
  return JSON.parse(await readFile(file, "utf8")) as PackageJson;
}

export async function readTsConfig(cwd: string) {
  const file = path.join(cwd, "tsconfig.json");
  if (!existsSync(file)) return null;
  return parseJsonc<TsConfig>(await readFile(file, "utf8"));
}

function detectCssFile(cwd: string, framework: ProjectInfo["framework"]) {
  const candidates = [
    "app/globals.css",
    "app/global.css",
    "src/app/globals.css",
    "src/app/global.css",
    "src/styles/globals.css",
    "styles/globals.css",
    "src/index.css",
    "src/globals.css",
  ];

  for (const candidate of candidates) {
    if (existsSync(path.join(cwd, candidate))) return candidate;
  }

  if (framework === "next") return "app/globals.css";
  if (framework === "vite" || framework === "vue") return "src/index.css";
  return null;
}

export async function detectProject(cwd: string): Promise<ProjectInfo> {
  const pkg = await readPackageJson(cwd);
  const dependencies = { ...pkg?.dependencies, ...pkg?.devDependencies };

  const framework: ProjectInfo["framework"] = dependencies.vue || dependencies.nuxt
    ? "vue"
    : dependencies.next
      ? "next"
      : dependencies.vite
        ? "vite"
        : dependencies["@remix-run/react"]
          ? "remix"
          : "unknown";

  const tailwindRange = dependencies.tailwindcss;
  const tailwindMajor = tailwindRange
    ? Number(/[0-9]+/.exec(tailwindRange)?.[0] ?? NaN) || null
    : null;

  const tsconfig = await readTsConfig(cwd);
  const paths = tsconfig?.compilerOptions?.paths ?? {};

  let aliasPrefix = "@";
  let aliasTarget = "./src/*";
  for (const [pattern, targets] of Object.entries(paths)) {
    if (pattern.endsWith("/*") && targets[0]) {
      aliasPrefix = pattern.slice(0, -2);
      aliasTarget = targets[0];
      break;
    }
  }

  return {
    cwd,
    hasPackageJson: Boolean(pkg),
    name: pkg?.name,
    framework,
    tailwindMajor,
    rsc: framework === "next",
    srcDir: aliasTarget.startsWith("./src") || existsSync(path.join(cwd, "src")),
    aliasPrefix,
    aliasTarget,
    cssFile: detectCssFile(cwd, framework),
    packageManager: existsSync(path.join(cwd, "pnpm-lock.yaml"))
      ? "pnpm"
      : existsSync(path.join(cwd, "bun.lockb")) || existsSync(path.join(cwd, "bun.lock"))
        ? "bun"
        : existsSync(path.join(cwd, "yarn.lock"))
          ? "yarn"
          : "npm",
  };
}
