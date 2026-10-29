import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import pc from "picocolors";

export const DEFAULT_REGISTRY = "https://veil-ui.dev/r";

export const logger = {
  info(message: string) {
    console.log(`${pc.cyan("•")} ${message}`);
  },
  success(message: string) {
    console.log(`${pc.green("✓")} ${message}`);
  },
  warn(message: string) {
    console.log(`${pc.yellow("!")} ${message}`);
  },
  error(message: string) {
    console.error(`${pc.red("✗")} ${message}`);
  },
  step(message: string) {
    console.log(`\n${pc.bold(message)}`);
  },
  muted(message: string) {
    console.log(pc.dim(message));
  },
};

export function fail(message: string): never {
  logger.error(message);
  process.exit(1);
}

export interface ComponentsConfig {
  $schema?: string;
  style: string;
  rsc: boolean;
  tsx: boolean;
  /** Runtime that installed components target. Defaults to React. */
  framework?: Framework;
  tailwind: {
    config: string;
    css: string;
    baseColor: string;
    cssVariables: boolean;
  };
  aliases: {
    components: string;
    utils: string;
    ui: string;
    lib: string;
    hooks: string;
  };
  registry: string;
}

export type Framework = "react" | "vue" | "html";

export const FRAMEWORKS: Framework[] = ["react", "vue", "html"];

export function normalizeFramework(value?: string | null): Framework {
  if (!value || value === "react") return "react";
  if (value === "vue" || value === "html") return value;
  fail(
    `Unknown framework "${value}". Use one of: ${FRAMEWORKS.join(", ")}.`,
  );
}

/** Resolve an alias without tsconfig, e.g. "@/components/ui" -> <cwd>/components/ui. */
export function staticAliasDir(cwd: string, alias: string) {
  return path.resolve(cwd, alias.replace(/^[@~]\//, ""));
}


export const CONFIG_FILE = "components.json";

export async function readConfig(cwd: string) {
  const file = path.join(cwd, CONFIG_FILE);
  if (!existsSync(file)) {
    fail(
      `No ${CONFIG_FILE} found. Run ${pc.bold("npx veil-ui init")} first.`,
    );
  }
  try {
    return JSON.parse(await readFile(file, "utf8")) as ComponentsConfig;
  } catch {
    fail(`${CONFIG_FILE} is not valid JSON.`);
  }
}

/** Strip comments and trailing commas so we can read tsconfig.json without a parser. */
export function parseJsonc<T>(source: string): T {
  const withoutComments = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1")
    .replace(/,(\s*[}\]])/g, "$1");
  return JSON.parse(withoutComments) as T;
}

interface TsConfig {
  compilerOptions?: {
    baseUrl?: string;
    paths?: Record<string, string[]>;
  };
}

export interface AliasResolution {
  /** e.g. `@/components/ui` */
  alias: string;
  /** Absolute directory on disk. */
  dir: string;
}

export async function resolveAlias(
  cwd: string,
  alias: string,
): Promise<AliasResolution> {
  const tsconfigPath = path.join(cwd, "tsconfig.json");

  if (!existsSync(tsconfigPath)) {
    fail("tsconfig.json not found. Veil UI requires TypeScript.");
  }

  const tsconfig = parseJsonc<TsConfig>(await readFile(tsconfigPath, "utf8"));
  const paths = tsconfig.compilerOptions?.paths ?? {};
  const baseUrl = tsconfig.compilerOptions?.baseUrl ?? ".";

  const match = /^([^/]+)\/(.*)$/.exec(alias);
  if (!match) fail(`Invalid alias "${alias}". Expected something like "@/components".`);

  const [, prefix, rest] = match as unknown as [string, string, string];
  const pattern = `${prefix}/*`;
  const targets = paths[pattern];

  if (!targets?.[0]) {
    fail(
      `The alias ${pc.bold(pattern)} is not defined in tsconfig.json paths. ` +
        `Add it or pass a different alias in ${CONFIG_FILE}.`,
    );
  }

  const target = targets[0].replace("*", rest);
  return {
    alias,
    dir: path.resolve(cwd, baseUrl, target),
  };
}

export function detectPackageManager(cwd: string): "pnpm" | "npm" | "yarn" | "bun" {
  if (existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(path.join(cwd, "bun.lockb")) || existsSync(path.join(cwd, "bun.lock")))
    return "bun";
  if (existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

export function installCommand(
  pm: ReturnType<typeof detectPackageManager>,
  packages: string[],
) {
  const verb = pm === "npm" ? "install" : "add";
  return { command: pm, args: [verb, ...packages] };
}
