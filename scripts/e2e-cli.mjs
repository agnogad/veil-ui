#!/usr/bin/env node
/**
 * End-to-end check for the CLI: spins up a static registry, initializes
 * throwaway React, Vue and plain HTML projects and adds components to each.
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

const projects = [];

async function makeProject(name) {
  const dir = await mkdtemp(path.join(tmpdir(), `veil-e2e-${name}-`));
  projects.push(dir);
  return dir;
}

function runner(project) {
  return function run(args) {
    return new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [cli, ...args], { cwd: project });
      let stdout = "";
      let stderr = "";
      child.stdout.on("data", (chunk) => (stdout += chunk));
      child.stderr.on("data", (chunk) => (stderr += chunk));
      child.on("close", (code) => {
        if (code !== 0) {
          reject(
            new Error(`veil-ui ${args.join(" ")} failed:\n${stdout}${stderr}`),
          );
          return;
        }
        resolve(stdout);
      });
    });
  };
}

async function writeJson(file, value) {
  await writeFile(file, JSON.stringify(value, null, 2));
}

try {
  // ── React ────────────────────────────────────────────────────────────────
  const reactProject = await makeProject("react");
  await mkdir(path.join(reactProject, "src"), { recursive: true });
  await writeJson(path.join(reactProject, "package.json"), {
    name: "veil-e2e-react",
    private: true,
    dependencies: {
      react: "^19.0.0",
      "react-dom": "^19.0.0",
      tailwindcss: "^4.0.0",
    },
  });
  await writeJson(path.join(reactProject, "tsconfig.json"), {
    compilerOptions: { baseUrl: ".", paths: { "@/*": ["./src/*"] } },
  });
  await writeFile(path.join(reactProject, "src/index.css"), '@import "tailwindcss";\n');

  const runReact = runner(reactProject);
  await runReact(["init", "--no-install"]);
  await runReact([
    "add",
    "button",
    "input",
    "card",
    "--registry",
    registry,
    "--no-install",
  ]);

  const reactConfig = JSON.parse(
    await readFile(path.join(reactProject, "components.json"), "utf8"),
  );
  if (reactConfig.framework !== "react") fail("React framework was not recorded");
  if (reactConfig.aliases.ui !== "@/components/ui") fail("unexpected ui alias");

  const button = await readFile(
    path.join(reactProject, "src/components/ui/button.tsx"),
    "utf8",
  );
  if (!button.includes('from "@/lib/utils"')) fail("utils import was not rewritten");
  if (button.includes("@veil-ui/")) fail("monorepo import leaked into the output");

  const css = await readFile(path.join(reactProject, "src/index.css"), "utf8");
  if (!css.includes("@custom-variant dark")) fail("tokens were not added to the stylesheet");

  for (const file of ["card.tsx", "input.tsx"]) {
    if (!existsSync(path.join(reactProject, "src/components/ui", file))) {
      fail(`${file} was not written`);
    }
  }

  if (!existsSync(path.join(reactProject, "src/lib/utils.ts"))) {
    fail("utils.ts was not written");
  }

  const reactList = await runReact(["list", "--registry", registry]);
  if (!reactList.includes("button")) fail("list did not return React contents");

  // ── Vue ──────────────────────────────────────────────────────────────────
  const vueProject = await makeProject("vue");
  await mkdir(path.join(vueProject, "src"), { recursive: true });
  await writeJson(path.join(vueProject, "package.json"), {
    name: "veil-e2e-vue",
    private: true,
    dependencies: {
      vue: "^3.5.0",
      tailwindcss: "^4.0.0",
    },
  });
  await writeJson(path.join(vueProject, "tsconfig.json"), {
    compilerOptions: { baseUrl: ".", paths: { "@/*": ["./src/*"] } },
  });
  await writeFile(path.join(vueProject, "src/index.css"), '@import "tailwindcss";\n');

  const runVue = runner(vueProject);
  await runVue(["init", "--framework", "vue", "--no-install"]);
  await runVue([
    "add",
    "button",
    "alert-dialog",
    "--registry",
    registry,
    "--framework",
    "vue",
    "--no-install",
  ]);

  const vueConfig = JSON.parse(
    await readFile(path.join(vueProject, "components.json"), "utf8"),
  );
  if (vueConfig.framework !== "vue") fail("Vue framework was not recorded");

  const vueButton = await readFile(
    path.join(vueProject, "src/components/ui/button/Button.vue"),
    "utf8",
  );
  if (!vueButton.includes('from "@/lib/utils"')) fail("Vue utils import is wrong");
  if (!vueButton.includes("reka-ui")) fail("Vue button does not use Reka UI");

  const vueIndex = await readFile(
    path.join(vueProject, "src/components/ui/button/index.ts"),
    "utf8",
  );
  if (!vueIndex.includes("export { default as Button }")) {
    fail("Vue button index does not re-export Button");
  }

  const vueAction = await readFile(
    path.join(vueProject, "src/components/ui/alert-dialog/AlertDialogAction.vue"),
    "utf8",
  );
  if (!vueAction.includes('from "@/components/ui/button"')) {
    fail("Vue cross-component import was not preserved");
  }

  if (!existsSync(path.join(vueProject, "src/lib/utils.ts"))) {
    fail("Vue utils.ts was not written");
  }

  const vueList = await runVue([
    "list",
    "--registry",
    registry,
    "--framework",
    "vue",
  ]);
  if (!vueList.includes("accordion")) fail("Vue list did not return the Vue registry");
  if (vueList.includes("bottom-navigation")) {
    fail("Vue list leaked a React-only component");
  }

  // ── Plain HTML ───────────────────────────────────────────────────────────
  const htmlProject = await makeProject("html");
  const runHtml = runner(htmlProject);
  await runHtml(["init", "--framework", "html", "--no-install"]);
  await runHtml([
    "add",
    "tabs",
    "card",
    "--registry",
    registry,
    "--framework",
    "html",
    "--no-install",
  ]);

  if (!existsSync(path.join(htmlProject, "veil-ui.css"))) {
    fail("veil-ui.css was not written");
  }
  if (!existsSync(path.join(htmlProject, "components/ui/tabs.html"))) {
    fail("tabs.html was not written");
  }
  if (!existsSync(path.join(htmlProject, "components/ui/tabs.js"))) {
    fail("tabs.js was not written");
  }
  if (!existsSync(path.join(htmlProject, "components/ui/card.html"))) {
    fail("card.html was not written");
  }

  const htmlList = await runHtml([
    "list",
    "--registry",
    registry,
    "--framework",
    "html",
  ]);
  if (!htmlList.includes("tabs")) fail("HTML list did not return the HTML registry");

  const doctor = await runHtml([
    "doctor",
    "--registry",
    registry,
    "--framework",
    "html",
  ]);
  if (!doctor.includes("registry reachable")) fail("HTML doctor did not reach registry");

  console.log("✓ CLI end-to-end check passed (react, vue, html)");
} finally {
  server.close();
  await Promise.all(
    projects.map((project) => rm(project, { recursive: true, force: true })),
  );
}
