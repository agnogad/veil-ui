import { readFile, readdir, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(packageRoot, "../..");
const docsRoot = path.join(repoRoot, "apps/docs");
const componentsRoot = path.join(packageRoot, "src/components");
const outDir = path.join(docsRoot, "public/r");
const generatedDir = path.join(docsRoot, "lib/generated");

interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  category: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  examples?: string[];
}

interface RegistryFile {
  path: string;
  type: string;
  content: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  category: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

const errors: string[] = [];

function pascal(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/** Rewrite monorepo imports into the aliases used inside consumer projects. */
function transformSource(source: string) {
  return source
    .replaceAll("@veil-ui/utils", "@/lib/utils")
    .replaceAll("@veil-ui/registry/", "@/components/ui/")
    // Cross-component imports are relative inside the monorepo but must point
    // at the consumer's ui alias once the file is copied into a project.
    .replace(
      /(["'])\.\.\/([a-z0-9-]+)(?:\/index)?\1/g,
      '"@/components/ui/$2"',
    );
}

/** Extract the source text of every exported example function. */
function extractExamples(source: string) {
  const sourceFile = ts.createSourceFile(
    "demo.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const examples: Record<string, string> = {};

  for (const statement of sourceFile.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name) {
      const hasExport = statement.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      );
      if (!hasExport) continue;
      examples[statement.name.text] = statement.getText(sourceFile).trim();
    }
  }

  return examples;
}

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}

async function main() {
  const entries = await readdir(componentsRoot, { withFileTypes: true });
  const dirs = entries.filter((entry) => entry.isDirectory()).map((e) => e.name);

  if (dirs.length === 0) {
    errors.push("No component directories found in src/components");
  }

  const items: RegistryItem[] = [];
  const demoSource: Record<string, Record<string, string>> = {};
  const names = new Set<string>();

  for (const dir of dirs.sort()) {
    const dirPath = path.join(componentsRoot, dir);
    const metaPath = path.join(dirPath, "meta.json");

    let meta: ComponentMeta;
    try {
      meta = await readJson<ComponentMeta>(metaPath);
    } catch {
      errors.push(`${dir}: missing or invalid meta.json`);
      continue;
    }

    if (meta.name !== dir) {
      errors.push(`${dir}: meta.name must equal the directory name`);
    }
    if (names.has(meta.name)) {
      errors.push(`${dir}: duplicate component name`);
    }
    names.add(meta.name);

    const indexSource = await readFile(path.join(dirPath, "index.tsx"), "utf8");
    const demoFilePath = path.join(dirPath, "demo.tsx");
    const demoFile = await readFile(demoFilePath, "utf8");

    const files: RegistryFile[] = [
      {
        path: `ui/${meta.name}.tsx`,
        type: meta.type,
        content: transformSource(indexSource),
      },
    ];

    items.push({
      name: meta.name,
      type: meta.type,
      title: meta.title,
      description: meta.description,
      category: meta.category,
      dependencies: meta.dependencies ?? [],
      registryDependencies: meta.registryDependencies ?? [],
      files,
    });

    // Map declared examples to exported functions: `as-child` -> `<Pascal><Pascal>`.
    const functions = extractExamples(demoFile);
    const examples: Record<string, string> = {};

    for (const example of meta.examples ?? []) {
      const functionName = `${pascal(meta.name)}${pascal(example)}`;
      const code = functions[functionName];
      if (!code) {
        errors.push(
          `${dir}: demo.tsx is missing exported function ${functionName}() for example "${example}"`,
        );
        continue;
      }
      examples[example] = code;
    }

    demoSource[meta.name] = examples;
  }

  // Utility module shipped with every component.
  const utilsSource = await readFile(
    path.join(packageRoot, "src/lib/utils.ts"),
    "utf8",
  );

  const utilsItem: RegistryItem = {
    name: "utils",
    type: "registry:lib",
    title: "Utils",
    description: "The cn() class-merging helper used by every component.",
    category: "lib",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
        content: utilsSource,
      },
    ],
  };

  // Validate registry dependencies.
  for (const item of [...items, utilsItem]) {
    for (const dependency of item.registryDependencies) {
      if (dependency === "utils") continue;
      if (!items.some((candidate) => candidate.name === dependency)) {
        errors.push(`${item.name}: unknown registry dependency "${dependency}"`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("\nRegistry build failed:\n");
    for (const error of errors) console.error(`  ✗ ${error}`);
    console.error("");
    process.exit(1);
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await mkdir(generatedDir, { recursive: true });

  for (const item of [...items, utilsItem]) {
    await writeFile(
      path.join(outDir, `${item.name}.json`),
      `${JSON.stringify(item, null, 2)}\n`,
    );
  }

  const index = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "veil-ui",
    homepage: "https://veil-ui.dev",
    items: items.map(({ name, type, title, description, category, dependencies, registryDependencies, files }) => ({
      name,
      type,
      title,
      description,
      category,
      dependencies,
      registryDependencies,
      files: files.map((file) => ({ path: file.path, type: file.type })),
    })),
  };

  await writeFile(
    path.join(outDir, "registry.json"),
    `${JSON.stringify(index, null, 2)}\n`,
  );

  await writeFile(
    path.join(generatedDir, "demo-source.json"),
    `${JSON.stringify(demoSource, null, 2)}\n`,
  );

  console.log(
    `Registry built: ${items.length} components + 1 lib → apps/docs/public/r`,
  );
  console.log(
    `Examples: ${Object.values(demoSource).reduce((sum, group) => sum + Object.keys(group).length, 0)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
