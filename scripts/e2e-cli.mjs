#!/usr/bin/env node
/**
 * End-to-end check for the CLI: spins up a static registry, initializes a
 * throwaway project and adds components to it.
 *
 * Run after `pnpm build` (the CLI must be compiled).
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryRoot = path.join(root, "apps/docs/public");
const cli = path.join(root, "packages/cli/dist/index.js");

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
  throw new Error(message);
}

if (!existsSync(cli)) {
  console.error("CLI is not built. Run `pnpm --filter veil-ui build` first.");
  process.exit(1);
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    const file = path.join(registryRoot, path.normalize(url.pathname));
    if (!file.startsWith(registryRoot)) throw new Error("outside root");
    const body = await readFile(file);
    response.writeHead(200, { "content-type": "application/json" });
    response.end(body);
  } catch {
    response.writeHead(404).end("not found");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const registry = `http://127.0.0.1:${port}/r`;

const project = await mkdtemp(path.join(tmpdir(), "veil-e2e-"));

try {
  await mkdir(path.join(project, "src"), { recursive: true });
  await writeFile(
    path.join(project, "package.json"),
    JSON.stringify(
      {
        name: "veil-e2e-fixture",
        private: true,
        dependencies: {
          react: "^19.0.0",
          "react-dom": "^19.0.0",
          tailwindcss: "^4.0.0",
        },
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(project, "tsconfig.json"),
    JSON.stringify(
      { compilerOptions: { baseUrl: ".", paths: { "@/*": ["./src/*"] } } },
      null,
      2,
    ),
  );
  await writeFile(path.join(project, "src/index.css"), '@import "tailwindcss";\n');

  function run(args) {
    return new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [cli, ...args], { cwd: project });
      let stdout = "";
      let stderr = "";
      child.stdout.on("data", (chunk) => (stdout += chunk));
      child.stderr.on("data", (chunk) => (stderr += chunk));
      child.on("close", (code) => {
        if (code !== 0) {
          reject(
            new Error(
              `veil-ui ${args.join(" ")} failed:\n${stdout}${stderr}`,
            ),
          );
          return;
        }
        resolve(stdout);
      });
    });
  }

  await run(["init", "--no-install"]);
  await run([
    "add",
    "button",
    "input",
    "card",
    "--registry",
    registry,
    "--no-install",
  ]);

  const config = JSON.parse(
    await readFile(path.join(project, "components.json"), "utf8"),
  );
  if (config.aliases.ui !== "@/components/ui") fail("unexpected ui alias");

  const button = await readFile(
    path.join(project, "src/components/ui/button.tsx"),
    "utf8",
  );
  if (!button.includes('from "@/lib/utils"')) fail("utils import was not rewritten");
  if (button.includes("@veil-ui/")) fail("monorepo import leaked into the output");

  const css = await readFile(path.join(project, "src/index.css"), "utf8");
  if (!css.includes("@custom-variant dark")) fail("tokens were not added to the stylesheet");

  for (const file of ["card.tsx", "input.tsx"]) {
    if (!existsSync(path.join(project, "src/components/ui", file))) {
      fail(`${file} was not written`);
    }
  }

  if (!existsSync(path.join(project, "src/lib/utils.ts"))) {
    fail("utils.ts was not written");
  }

  const list = await run(["list", "--registry", registry]);
  if (!list.includes("button")) fail("list did not return the registry contents");

  console.log("✓ CLI end-to-end check passed");
} finally {
  server.close();
  await rm(project, { recursive: true, force: true });
}
