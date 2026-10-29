import { readFile, readdir, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseVueSfc } from "@vue/compiler-sfc";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(packageRoot, "../..");
const docsRoot = path.join(repoRoot, "apps/docs");
const componentsRoot = path.join(packageRoot, "src/components");
const frameworkRoot = path.join(packageRoot, "src/frameworks");
const outDir = path.join(docsRoot, "public/r");
const generatedDir = path.join(docsRoot, "lib/generated");

type Framework = "react" | "vue" | "html";

interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  category: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  examples?: string[];
  /** Extra npm packages used by the Vue implementation. */
  vueDependencies?: string[];
  /** Extra npm packages used by the plain HTML implementation. */
  htmlDependencies?: string[];
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
  framework: Framework;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
  /** Frameworks that ship a working implementation for this component. */
  frameworks: Framework[];
}

interface FrameworkSourceFile {
  name: string;
  content: string;
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

/** Collect every bare module specifier imported by a source file. */
function collectPackages(source: string) {
  const packages = new Set<string>();
  const patterns = [
    /import\s+(?:[^"'()]*?\s+from\s+)?["']([^"']+)["']/g,
    /import\(\s*["']([^"']+)["']\s*\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const specifier = match[1];
      if (!specifier) continue;
      if (
        specifier.startsWith(".") ||
        specifier.startsWith("/") ||
        specifier.startsWith("@/") ||
        specifier.startsWith("~")
      ) {
        continue;
      }
      // `@scope/pkg/sub` and `pkg/sub` both install `@scope/pkg` / `pkg`.
      const segments = specifier.split("/");
      const name = specifier.startsWith("@")
        ? segments.slice(0, 2).join("/")
        : segments[0] ?? specifier;
      if (name === "vue") continue;
      packages.add(name);
    }
  }

  return [...packages].sort();
}

/** Cross-component imports use `@/components/ui/<name>.vue` by convention. */
function collectVueComponentImports(source: string) {
  const names = new Set<string>();
  for (const match of source.matchAll(
    /["']@\/components\/ui\/([a-z0-9-]+)(?:\.vue)?["']/g,
  )) {
    if (match[1]) names.add(match[1]);
  }
  return [...names].sort();
}

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}

async function readIfExists(file: string) {
  try {
    return await readFile(file, "utf8");
  } catch {
    return null;
  }
}

async function main() {
  const entries = await readdir(componentsRoot, { withFileTypes: true });
  const dirs = entries.filter((entry) => entry.isDirectory()).map((e) => e.name);

  if (dirs.length === 0) {
    errors.push("No component directories found in src/components");
  }

  const items: RegistryItem[] = [];
  const vueItems: RegistryItem[] = [];
  const htmlItems: RegistryItem[] = [];
  const demoSource: Record<string, Record<string, string>> = {};
  const frameworkSource: Record<
    string,
    { vue?: FrameworkSourceFile[]; html?: FrameworkSourceFile[] }
  > = {};
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

    // ── Vue variant ────────────────────────────────────────────────────────
    // Convention: vue/index.ts plus one or more .vue files. Installed as
    // `components/ui/<name>/…` so consumers import from the folder index.
    const vueDir = path.join(dirPath, "vue");
    const vueIndex = await readIfExists(path.join(vueDir, "index.ts"));
    const vueEntries = await readdir(vueDir, { withFileTypes: true }).catch(
      () => [],
    );
    const vueFileNames = vueEntries
      .filter(
        (entry) =>
          entry.isFile() &&
          (entry.name.endsWith(".vue") || entry.name.endsWith(".ts")) &&
          entry.name !== "demo.vue",
      )
      .map((entry) => entry.name)
      .sort();
    const vueDemo = await readIfExists(path.join(vueDir, "demo.vue"));

    if (vueIndex !== null && vueFileNames.length > 1) {
      const vueSources = new Map<string, string>();
      for (const fileName of vueFileNames) {
        const content = await readFile(path.join(vueDir, fileName), "utf8");
        vueSources.set(fileName, content);

        if (fileName.endsWith(".vue")) {
          const { errors: sfcErrors } = parseVueSfc(content, {
            filename: fileName,
          });
          for (const error of sfcErrors) {
            errors.push(`${dir}: invalid Vue SFC ${fileName}: ${String(error)}`);
          }
        }
      }

      const allVueSource = [...vueSources.values()].join("\n");
      const importedComponents = collectVueComponentImports(allVueSource).filter(
        (name) => name !== meta.name,
      );

      vueItems.push({
        name: meta.name,
        type: meta.type,
        title: meta.title,
        description: meta.description,
        category: meta.category,
        framework: "vue",
        dependencies: [
          ...new Set([
            ...collectPackages(allVueSource),
            ...(meta.vueDependencies ?? []),
          ]),
        ].sort(),
        registryDependencies: [
          ...new Set([
            ...(allVueSource.includes("@/lib/utils") ? ["vue-utils"] : []),
            ...importedComponents,
          ]),
        ],
        files: vueFileNames.map((fileName) => ({
          path: `components/ui/${meta.name}/${fileName}`,
          type: fileName.endsWith(".vue") ? meta.type : "registry:lib",
          content: vueSources.get(fileName)!,
        })),
        frameworks: ["vue"],
      });

      frameworkSource[meta.name] = {
        ...frameworkSource[meta.name],
        vue: [
          ...vueFileNames.map((fileName) => ({
            name: fileName,
            content: vueSources.get(fileName)!,
          })),
          ...(vueDemo ? [{ name: "demo.vue", content: vueDemo }] : []),
        ],
      };
    } else if (
      vueIndex !== null ||
      vueFileNames.length > 0 ||
      vueDemo !== null
    ) {
      errors.push(
        `${dir}: Vue variant needs vue/index.ts and at least one .vue file`,
      );
    }

    // ── Plain HTML variant ─────────────────────────────────────────────────
    const htmlDir = path.join(dirPath, "html");
    const htmlSource = await readIfExists(
      path.join(htmlDir, `${meta.name}.html`),
    );
    const htmlScript = await readIfExists(path.join(htmlDir, `${meta.name}.js`));

    if (htmlSource !== null) {
      htmlItems.push({
        name: meta.name,
        type: meta.type,
        title: meta.title,
        description: meta.description,
        category: meta.category,
        framework: "html",
        dependencies: meta.htmlDependencies ?? [],
        registryDependencies: [],
        files: [
          {
            path: `components/ui/${meta.name}.html`,
            type: meta.type,
            content: htmlSource,
          },
          ...(htmlScript
            ? [
                {
                  path: `components/ui/${meta.name}.js`,
                  type: `${meta.type}:script`,
                  content: htmlScript,
                },
              ]
            : []),
        ],
        frameworks: ["html"],
      });

      frameworkSource[meta.name] = {
        ...frameworkSource[meta.name],
        html: [
          { name: `${meta.name}.html`, content: htmlSource },
          ...(htmlScript
            ? [{ name: `${meta.name}.js`, content: htmlScript }]
            : []),
        ],
      };
    } else if (htmlScript !== null) {
      errors.push(
        `${dir}: html/${meta.name}.js exists without html/${meta.name}.html`,
      );
    }

    const frameworks: Framework[] = ["react"];
    if (vueIndex !== null) frameworks.push("vue");
    if (htmlSource !== null) frameworks.push("html");

    items.push({
      name: meta.name,
      type: meta.type,
      title: meta.title,
      description: meta.description,
      category: meta.category,
      framework: "react",
      dependencies: meta.dependencies ?? [],
      registryDependencies: meta.registryDependencies ?? [],
      files,
      frameworks,
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

  // Utility module shipped with every React component.
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
    framework: "react",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
        content: utilsSource,
      },
    ],
    frameworks: ["react"],
  };

  // Utility module shipped with every Vue component.
  const vueUtilsSource = await readFile(
    path.join(frameworkRoot, "vue/utils.ts"),
    "utf8",
  );

  const vueUtilsItem: RegistryItem = {
    name: "vue-utils",
    type: "registry:lib",
    title: "Vue Utils",
    description: "The cn() class-merging helper used by Vue components.",
    category: "lib",
    framework: "vue",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
        content: vueUtilsSource,
      },
    ],
    frameworks: ["vue"],
  };

  // Validate React registry dependencies.
  for (const item of [...items, utilsItem]) {
    for (const dependency of item.registryDependencies) {
      if (dependency === "utils") continue;
      if (!items.some((candidate) => candidate.name === dependency)) {
        errors.push(`${item.name}: unknown registry dependency "${dependency}"`);
      }
    }
  }

  // Validate Vue registry dependencies against components with a Vue build.
  const vueNames = new Set(vueItems.map((item) => item.name));
  for (const item of vueItems) {
    for (const dependency of item.registryDependencies) {
      if (dependency === "vue-utils") continue;
      if (!vueNames.has(dependency)) {
        errors.push(
          `${item.name}: Vue import of "${dependency}" but no vue implementation exists`,
        );
      }
    }
  }

  const frameworkCount = (name: Framework) =>
    items.filter((item) => item.frameworks.includes(name)).length;

  if (errors.length > 0) {
    console.error("\nRegistry build failed:\n");
    for (const error of errors) console.error(`  ✗ ${error}`);
    console.error("");
    process.exit(1);
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await mkdir(generatedDir, { recursive: true });
  await mkdir(path.join(outDir, "vue"), { recursive: true });
  await mkdir(path.join(outDir, "html"), { recursive: true });

  const writeItem = async (item: RegistryItem, target: string) => {
    await writeFile(
      path.join(outDir, target, `${item.name}.json`),
      `${JSON.stringify(item, null, 2)}\n`,
    );
  };

  for (const item of [...items, utilsItem]) {
    await writeItem(item, ".");
  }
  for (const item of [...vueItems, vueUtilsItem]) {
    await writeItem(item, "vue");
  }
  for (const item of htmlItems) {
    await writeItem(item, "html");
  }

  const indexItem = ({
    name,
    type,
    title,
    description,
    category,
    framework,
    dependencies,
    registryDependencies,
    files,
    frameworks,
  }: RegistryItem) => ({
    name,
    type,
    title,
    description,
    category,
    framework,
    dependencies,
    registryDependencies,
    files: files.map((file) => ({ path: file.path, type: file.type })),
    frameworks,
  });

  const writeIndex = async (
    target: string,
    name: string,
    framework: Framework | null,
    indexItems: RegistryItem[],
  ) => {
    const index = {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name,
      homepage: "https://veil-ui.dev",
      ...(framework ? { framework } : {}),
      items: indexItems.map(indexItem),
    };

    await writeFile(
      path.join(outDir, target, "registry.json"),
      `${JSON.stringify(index, null, 2)}\n`,
    );
  };

  await writeIndex(".", "veil-ui", null, [...items, utilsItem]);
  await writeIndex("vue", "veil-ui-vue", "vue", [...vueItems, vueUtilsItem]);
  await writeIndex("html", "veil-ui-html", "html", htmlItems);

  await writeFile(
    path.join(generatedDir, "demo-source.json"),
    `${JSON.stringify(demoSource, null, 2)}\n`,
  );

  await writeFile(
    path.join(generatedDir, "framework-source.json"),
    `${JSON.stringify(frameworkSource, null, 2)}\n`,
  );

  console.log(
    `Registry built: ${items.length} components + 1 lib → apps/docs/public/r`,
  );
  console.log(
    `Examples: ${Object.values(demoSource).reduce((sum, group) => sum + Object.keys(group).length, 0)}`,
  );
  console.log(
    `Frameworks: react ${frameworkCount("react")}, vue ${frameworkCount("vue")}, html ${frameworkCount("html")}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
