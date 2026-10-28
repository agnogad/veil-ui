import pc from "picocolors";

import { DEFAULT_REGISTRY, logger, readConfig } from "../lib/config";
import { createRegistryClient, fetchIndexWithFallback } from "../lib/registry";

interface ListOptions {
  cwd?: string;
  registry?: string;
  json?: boolean;
  query?: string;
}

export async function list(options: ListOptions = {}) {
  const cwd = options.cwd ?? process.cwd();
  const config = await readConfig(cwd);
  const registryUrl = options.registry ?? config.registry ?? DEFAULT_REGISTRY;

  const index = await fetchIndexWithFallback(registryUrl);
  if (!index) return;

  const query = options.query?.toLowerCase();
  const items = index.items.filter((item) => {
    if (!query) return true;
    return (
      item.name.includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  if (options.json) {
    console.log(JSON.stringify(items, null, 2));
    return;
  }

  if (items.length === 0) {
    logger.warn(`No components matched "${options.query}".`);
    return;
  }

  const groups = new Map<string, typeof items>();
  for (const item of items) {
    const category = item.category ?? "other";
    groups.set(category, [...(groups.get(category) ?? []), item]);
  }

  for (const [category, entries] of [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`\n${pc.bold(category)} ${pc.dim(`(${entries.length})`)}`);
    for (const entry of entries) {
      console.log(`  ${pc.cyan(entry.name.padEnd(22))} ${pc.dim(entry.description)}`);
    }
  }

  console.log(
    `\n${pc.dim(`${items.length} component(s) · ${registryUrl}`)}`,
  );
}

export async function view(name: string, options: { cwd?: string; registry?: string; code?: boolean } = {}) {
  const cwd = options.cwd ?? process.cwd();
  const config = await readConfig(cwd);
  const registryUrl = options.registry ?? config.registry ?? DEFAULT_REGISTRY;
  const client = createRegistryClient(registryUrl);

  const item = await client.item(name);

  console.log(`\n${pc.bold(item.title)} ${pc.dim(`(${item.name})`)}`);
  console.log(item.description);
  if (item.dependencies?.length) {
    console.log(`\n${pc.bold("Dependencies")}: ${item.dependencies.join(", ")}`);
  }
  if (item.registryDependencies?.length) {
    console.log(
      `${pc.bold("Registry")}: ${item.registryDependencies.join(", ")}`,
    );
  }
  console.log(`\n${pc.bold("Files")}`);
  for (const file of item.files) {
    console.log(`  ${pc.cyan(file.path)}`);
    if (options.code) {
      console.log(pc.dim("─".repeat(60)));
      console.log(file.content);
      console.log(pc.dim("─".repeat(60)));
    }
  }
  console.log(
    `\n${pc.dim(`Install: npx veil-ui add ${item.name}`)}`,
  );
}
