import { existsSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

import pc from "picocolors";
import prompts from "prompts";

import {
  type ComponentsConfig,
  DEFAULT_REGISTRY,
  detectPackageManager,
  fail,
  installCommand,
  logger,
  normalizeFramework,
  readConfig,
  resolveAlias,
  staticAliasDir,
} from "../lib/config";
import { ensureDir, relative } from "../lib/fs";
import { readPackageJson } from "../lib/project";
import {
  createRegistryClient,
  type RegistryFile,
  type RegistryItem,
  resolveItems,
} from "../lib/registry";

interface AddOptions {
  cwd?: string;
  registry?: string;
  overwrite?: boolean;
  install?: boolean;
  dryRun?: boolean;
  framework?: string;
}

/**
 * Map a registry path onto the consumer's alias directories:
 *   ui/button.tsx                    -> <ui>/button.tsx
 *   components/ui/button/Button.vue  -> <ui>/button/Button.vue
 *   components/ui/tabs.js            -> <ui>/tabs.js
 *   lib/utils.ts                     -> <lib>/utils.ts
 */
function targetFor(
  file: RegistryFile,
  item: RegistryItem,
  dirs: { ui: string; lib: string; components: string },
) {
  const normalized = file.path.split(path.sep).join("/");

  if (normalized.startsWith("components/ui/")) {
    return path.join(dirs.ui, normalized.slice("components/ui/".length));
  }
  if (normalized.startsWith("ui/")) {
    return path.join(dirs.ui, normalized.slice("ui/".length));
  }
  if (normalized.startsWith("lib/")) {
    return path.join(dirs.lib, normalized.slice("lib/".length));
  }

  return path.join(dirs.components, item.name, path.basename(normalized));
}

async function confirmOverwrite(file: string) {
  if (!process.stdout.isTTY) return false;
  const response = await prompts({
    type: "confirm",
    name: "overwrite",
    message: `${file} already exists. Overwrite?`,
    initial: false,
  });
  return Boolean(response.overwrite);
}

export async function add(names: string[], options: AddOptions = {}) {
  if (names.length === 0) {
    fail("Specify at least one component: npx veil-ui add button");
  }

  const cwd = path.resolve(options.cwd ?? process.cwd());
  const config: ComponentsConfig = await readConfig(cwd);
  const framework = normalizeFramework(options.framework ?? config.framework);
  const registryUrl = options.registry ?? config.registry ?? DEFAULT_REGISTRY;

  const dirs =
    framework === "html"
      ? {
          ui: staticAliasDir(cwd, config.aliases.ui),
          lib: staticAliasDir(cwd, config.aliases.lib),
          components: staticAliasDir(cwd, config.aliases.components),
        }
      : {
          ui: (await resolveAlias(cwd, config.aliases.ui)).dir,
          lib: (await resolveAlias(cwd, config.aliases.lib)).dir,
          components: (await resolveAlias(cwd, config.aliases.components)).dir,
        };

  const client = createRegistryClient(registryUrl, framework);
  const items = await resolveItems(client, names);

  const plan: Array<{ file: RegistryFile; item: RegistryItem; target: string }> = [];
  for (const item of items) {
    for (const file of item.files) {
      plan.push({
        file,
        item,
        target: targetFor(file, item, dirs),
      });
    }
  }

  if (options.dryRun) {
    logger.step("Dry run");
    for (const entry of plan) {
      console.log(`  ${relative(cwd, entry.target)}`);
    }
    return;
  }

  const skipped: string[] = [];
  const written: string[] = [];

  for (const entry of plan) {
    const rel = relative(cwd, entry.target);

    if (existsSync(entry.target) && !options.overwrite) {
      const overwrite = await confirmOverwrite(rel);
      if (!overwrite) {
        skipped.push(rel);
        continue;
      }
    }

    await ensureDir(path.dirname(entry.target));
    const { writeFile } = await import("node:fs/promises");
    await writeFile(entry.target, entry.file.content, "utf8");
    written.push(rel);
    logger.success(`Created ${pc.bold(rel)}`);
  }

  const dependencies = [...new Set(items.flatMap((item) => item.dependencies ?? []))];
  const pkg = await readPackageJson(cwd);
  const installed = { ...pkg?.dependencies, ...pkg?.devDependencies };
  const missing = dependencies.filter((dependency) => !installed[dependency]);

  if (
    framework !== "html" &&
    options.install !== false &&
    missing.length > 0
  ) {
    const pm = detectPackageManager(cwd);
    const { command, args } = installCommand(pm, missing);
    logger.info(`Installing ${missing.join(", ")} with ${command}...`);

    await new Promise<void>((resolve) => {
      const child = spawn(command, args, { cwd, stdio: "inherit" });
      child.on("close", (code) => {
        if (code !== 0) logger.warn(`Package installation exited with code ${code}.`);
        resolve();
      });
    });
  }

  if (skipped.length > 0) {
    logger.warn(`Skipped existing files: ${skipped.join(", ")}`);
  }

  if (framework === "html") {
    logger.info(
      `HTML snippets are static markup. Load any matching .js file with a <script> tag; see ${relative(cwd, dirs.ui)}.`,
    );
  }

  logger.step("Done");
  logger.muted(
    `Added ${items.map((item) => item.name).join(", ")} (${framework}) · ${written.length} file(s) written.`,
  );
}
