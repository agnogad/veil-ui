import { existsSync } from "node:fs";
import path from "node:path";

import pc from "picocolors";

import {
  CONFIG_FILE,
  DEFAULT_REGISTRY,
  logger,
  readConfig,
  resolveAlias,
} from "../lib/config";
import { detectProject } from "../lib/project";
import { createRegistryClient } from "../lib/registry";

export async function doctor(options: { cwd?: string; registry?: string } = {}) {
  const cwd = path.resolve(options.cwd ?? process.cwd());
  let problems = 0;

  function check(label: string, ok: boolean, hint?: string) {
    if (ok) {
      console.log(`${pc.green("✓")} ${label}`);
    } else {
      problems += 1;
      console.log(`${pc.red("✗")} ${label}`);
      if (hint) console.log(`  ${pc.dim(hint)}`);
    }
  }

  const project = await detectProject(cwd);

  check("package.json found", project.hasPackageJson, "Run from your project root.");
  check(
    `tailwindcss v4 detected (${project.tailwindMajor ?? "missing"})`,
    project.tailwindMajor === 4,
    "Veil UI requires Tailwind CSS v4.",
  );
  check(
    `${CONFIG_FILE} found`,
    existsSync(path.join(cwd, CONFIG_FILE)),
    "Run npx veil-ui init",
  );

  if (existsSync(path.join(cwd, CONFIG_FILE))) {
    const config = await readConfig(cwd);

    for (const [name, alias] of Object.entries(config.aliases)) {
      if (name === "utils" || name === "hooks") continue;
      try {
        await resolveAlias(cwd, alias);
        check(`alias ${alias}`, true);
      } catch {
        check(`alias ${alias}`, false, `Add "${alias.split("/")[0]}/*" to tsconfig paths.`);
      }
    }

    check(
      `stylesheet ${config.tailwind.css}`,
      existsSync(path.resolve(cwd, config.tailwind.css)),
      "Update tailwind.css in components.json.",
    );

    const registryUrl = options.registry ?? config.registry ?? DEFAULT_REGISTRY;
    const client = createRegistryClient(registryUrl);
    try {
      const index = await client.index();
      check(
        `registry reachable (${index.items.length} components)`,
        index.items.length > 0,
        registryUrl,
      );
    } catch {
      check("registry reachable", false, registryUrl);
    }
  }

  console.log("");
  if (problems > 0) {
    logger.warn(`${problems} problem(s) found.`);
    process.exitCode = 1;
  } else {
    logger.success("Everything looks good.");
  }
}
