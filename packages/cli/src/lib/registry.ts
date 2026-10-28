import pc from "picocolors";

import { logger } from "./config";

export interface RegistryFile {
  path: string;
  type: string;
  content: string;
  target?: string;
}

export interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  category?: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

export interface RegistryIndexItem {
  name: string;
  type: string;
  title: string;
  description: string;
  category?: string;
  dependencies: string[];
  registryDependencies: string[];
}

export interface RegistryIndex {
  name: string;
  homepage?: string;
  items: RegistryIndexItem[];
}

const TIMEOUT_MS = 15_000;

async function getJson<T>(url: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch (error) {
    throw new Error(
      `Could not reach the registry at ${pc.bold(url)}.\n` +
        `  ${error instanceof Error ? error.message : String(error)}\n` +
        `  If you are running locally, start the docs app and set "registry" in components.json to http://localhost:3000/r`,
    );
  }

  if (!response.ok) {
    throw new Error(
      `Registry request failed (${response.status} ${response.statusText}): ${url}`,
    );
  }

  return (await response.json()) as T;
}

export function createRegistryClient(baseUrl: string) {
  const base = baseUrl.replace(/\/$/, "");

  return {
    async index() {
      return getJson<RegistryIndex>(`${base}/registry.json`);
    },
    async item(name: string) {
      return getJson<RegistryItem>(`${base}/${name}.json`);
    },
  };
}

/** Resolve a component and its registry dependencies, parents first. */
export async function resolveItems(
  client: ReturnType<typeof createRegistryClient>,
  names: string[],
): Promise<RegistryItem[]> {
  const resolved = new Map<string, RegistryItem>();

  async function visit(name: string, stack: string[]): Promise<void> {
    if (resolved.has(name)) return;
    if (stack.includes(name)) {
      throw new Error(`Circular registry dependency: ${[...stack, name].join(" → ")}`);
    }

    const item = await client.item(name);
    resolved.set(name, item);

    for (const dependency of item.registryDependencies ?? []) {
      await visit(dependency, [...stack, name]);
    }
  }

  for (const name of names) {
    await visit(name, []);
  }

  // Utils first so the import target exists before components are written.
  return [...resolved.values()].sort((a, b) => {
    if (a.type === "registry:lib") return -1;
    if (b.type === "registry:lib") return 1;
    return a.name.localeCompare(b.name);
  });
}

export async function fetchIndexWithFallback(baseUrl: string) {
  const client = createRegistryClient(baseUrl);
  try {
    return await client.index();
  } catch {
    logger.warn(
      "Registry index is unavailable; run `veil-ui doctor` to check the registry URL.",
    );
    return null;
  }
}
