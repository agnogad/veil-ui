import { readFileSync } from "node:fs";

import { Command } from "commander";

import { add } from "./commands/add";
import { doctor } from "./commands/doctor";
import { init } from "./commands/init";
import { list, view } from "./commands/list";

const pkg = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { version: string };

const program = new Command();

program
  .name("veil-ui")
  .description("Copy-paste UI components for React, built on Radix UI and Tailwind CSS.")
  .version(pkg.version);

program
  .command("init")
  .description("Set up Veil UI in your project")
  .option("--cwd <path>", "working directory")
  .option("--force", "overwrite an existing components.json")
  .option("--no-install", "skip installing dependencies")
  .action(async (options) => {
    await run(() => init(options));
  });

program
  .command("add")
  .description("Add components and their dependencies to your project")
  .argument("<components...>", "component names, e.g. button dialog")
  .option("--cwd <path>", "working directory")
  .option("--registry <url>", "registry base URL")
  .option("--overwrite", "overwrite existing files without prompting")
  .option("--no-install", "skip installing npm dependencies")
  .option("--dry-run", "print the files that would be written")
  .action(async (components: string[], options) => {
    await run(() => add(components, options));
  });

program
  .command("list")
  .description("List available components")
  .argument("[query]", "filter by name or description")
  .option("--cwd <path>", "working directory")
  .option("--registry <url>", "registry base URL")
  .option("--json", "print raw JSON")
  .action(async (query: string | undefined, options) => {
    await run(() => list({ ...options, query }));
  });

program
  .command("search")
  .description("Search available components")
  .argument("<query>", "search query")
  .option("--cwd <path>", "working directory")
  .option("--registry <url>", "registry base URL")
  .action(async (query: string, options) => {
    await run(() => list({ ...options, query }));
  });

program
  .command("view")
  .description("Show a component's files")
  .argument("<component>", "component name")
  .option("--cwd <path>", "working directory")
  .option("--registry <url>", "registry base URL")
  .option("--code", "print file contents")
  .action(async (name: string, options) => {
    await run(() => view(name, options));
  });

program
  .command("doctor")
  .description("Diagnose your Veil UI setup")
  .option("--cwd <path>", "working directory")
  .option("--registry <url>", "registry base URL")
  .action(async (options) => {
    await run(() => doctor(options));
  });

async function run(task: () => Promise<void>) {
  try {
    await task();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`\n✗ ${message}\n`);
    process.exit(1);
  }
}

program.parseAsync(process.argv).catch((error) => {
  console.error(error);
  process.exit(1);
});
