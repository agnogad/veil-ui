import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import prompts from "prompts";

import {
  CONFIG_FILE,
  type ComponentsConfig,
  detectPackageManager,
  fail,
  installCommand,
  logger,
  resolveAlias,
} from "../lib/config";
import { ensureDir, readTemplate, relative, writeIfChanged } from "../lib/fs";
import { detectProject, readPackageJson } from "../lib/project";

interface InitOptions {
  cwd?: string;
  force?: boolean;
  install?: boolean;
}

const UTILS_TEMPLATE = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

export async function init(options: InitOptions = {}) {
  const cwd = path.resolve(options.cwd ?? process.cwd());
  const project = await detectProject(cwd);

  if (!project.hasPackageJson) {
    fail("No package.json found. Run this command from your project root.");
  }

  if (project.tailwindMajor !== null && project.tailwindMajor < 4) {
    fail(
      "Veil UI requires Tailwind CSS v4.\n" +
        "  Upgrade with: npx @tailwindcss/upgrade",
    );
  }

  if (project.tailwindMajor === null) {
    logger.warn(
      "Tailwind CSS was not found in package.json. Install it with: pnpm add -D tailwindcss @tailwindcss/postcss",
    );
  }

  const configPath = path.join(cwd, CONFIG_FILE);
  if (existsSync(configPath) && !options.force) {
    if (!process.stdout.isTTY) {
      fail(`${CONFIG_FILE} already exists. Pass --force to overwrite it.`);
    }
    const response = await prompts({
      type: "confirm",
      name: "overwrite",
      message: `${CONFIG_FILE} already exists. Overwrite?`,
      initial: false,
    });
    if (!response.overwrite) {
      logger.info("Aborted.");
      return;
    }
  }

  const prefix = project.aliasPrefix;
  const config: ComponentsConfig = {
    $schema: "https://veil-ui.dev/schema.json",
    style: "default",
    rsc: project.rsc,
    tsx: true,
    tailwind: {
      config: "",
      css: project.cssFile ?? "app/globals.css",
      baseColor: "neutral",
      cssVariables: true,
    },
    aliases: {
      components: `${prefix}/components`,
      utils: `${prefix}/lib/utils`,
      ui: `${prefix}/components/ui`,
      lib: `${prefix}/lib`,
      hooks: `${prefix}/hooks`,
    },
    registry: process.env.VEIL_REGISTRY_URL ?? "https://veil-ui.dev/r",
  };

  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  logger.success(`Created ${CONFIG_FILE}`);

  // Write the cn() helper.
  const utilsDir = await resolveAlias(cwd, config.aliases.lib);
  const utilsPath = path.join(utilsDir.dir, "utils.ts");
  const wroteUtils = await writeIfChanged(utilsPath, UTILS_TEMPLATE);
  if (wroteUtils) logger.success(`Created ${relative(cwd, utilsPath)}`);

  // Ensure the global stylesheet exists and carries the tokens.
  const cssPath = path.resolve(cwd, config.tailwind.css);
  await ensureDir(path.dirname(cssPath));

  const theme = await readTemplate("theme.css");
  const base = await readTemplate("base.css");

  let css = "";
  try {
    css = await readFile(cssPath, "utf8");
  } catch {
    css = "";
  }

  if (!css.includes("veil-ui tokens")) {
    const parts: string[] = [];

    if (project.tailwindMajor === 4 && !css.includes('@import "tailwindcss"')) {
      parts.push('@import "tailwindcss";');
    }

    if (css.trim().length > 0) parts.push(css.trimEnd());
    parts.push(`\n/* veil-ui tokens */\n${theme.trim()}\n`);
    parts.push(base.trim());

    css = `${parts.join("\n\n")}\n`;
    await writeFile(cssPath, css, "utf8");
    logger.success(`Added Veil UI tokens to ${relative(cwd, cssPath)}`);
  }

  if (options.install !== false) {
    const pkg = await readPackageJson(cwd);
    const installed = { ...pkg?.dependencies, ...pkg?.devDependencies };
    const required = ["clsx", "tailwind-merge", "class-variance-authority", "lucide-react"];
    const missing = required.filter((name) => !installed[name]);

    if (missing.length > 0) {
      const pm = detectPackageManager(cwd);
      const { command, args } = installCommand(pm, missing);
      logger.info(`Installing ${missing.join(", ")} with ${command}...`);
      const { spawn } = await import("node:child_process");
      await new Promise<void>((resolve) => {
        const child = spawn(command, args, { cwd, stdio: "inherit" });
        child.on("close", () => resolve());
      });
    }
  }

  logger.step("Done");
  logger.muted(`Add your first component: npx veil-ui add button`);
}
