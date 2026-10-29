<div align="center">

<img src="./assets/logo.svg" width="88" height="88" alt="Veil UI" />

# Veil UI

**Copy-paste React components. Radix behaviour, Tailwind v4 styling, zero lock-in.**

A monochrome component registry for React 19 — 297 components, 669 live examples and 30 page templates.
One command writes readable source into your codebase. No wrapper package to upgrade, no runtime to fight.

[![CI](https://img.shields.io/github/actions/workflow/status/agnogad/veil-ui/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/agnogad/veil-ui/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-0A0A0A?style=flat-square)](./LICENSE)
[![React](https://img.shields.io/badge/React-19-0A0A0A?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-0A0A0A?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Radix UI](https://img.shields.io/badge/Radix-UI-0A0A0A?style=flat-square)](https://www.radix-ui.com)
[![Components](https://img.shields.io/badge/components-297-0A0A0A?style=flat-square)](#whats-inside)
[![Examples](https://img.shields.io/badge/examples-669-0A0A0A?style=flat-square)](#whats-inside)

[Quick start](#quick-start) · [Components](#whats-inside) · [Repository](#repository-layout) · [Development](#development) · [Roadmap](#roadmap)

</div>

---

## Why Veil UI

Most component libraries ask you to import their runtime, adopt their release cadence and
override their opinions. Veil UI does the opposite: the registry is a catalog of source files,
and the CLI copies the ones you need into your project.

- **You own the source.** Every component arrives as plain TypeScript you can edit, extend or delete.
- **Accessible by default.** Radix primitives handle focus, keyboard interaction and ARIA semantics. Every component has a render, behaviour and `axe-core` test.
- **One design language.** A monochrome OKLCH palette, a single destructive hue, a 6px base radius and dark mode out of the box.
- **Composable API.** Variants via `cva`, class merging via `cn`, `data-slot` attributes and `asChild` composition.
- **No drift.** Demos, documentation and tests live next to the source, so the docs always match the code.

## Quick start

**Requirements:** Node.js 20+, React 19, Tailwind CSS v4 and a `tsconfig.json` path alias such as `@/*`.

```bash
# Configure an existing project (writes components.json, lib/utils.ts and design tokens)
npx veil-ui@latest init

# Add components — dependencies and files are resolved automatically
npx veil-ui@latest add button input card dialog
```

Then import from your configured alias:

```tsx
import { Button } from "@/components/ui/button";

export function ReviewActions() {
  return (
    <div className="flex gap-2">
      <Button variant="outline">Cancel</Button>
      <Button>Approve changes</Button>
    </div>
  );
}
```

The CLI reads `components.json`, resolves registry dependencies, installs missing npm packages
and rewrites `@veil-ui/utils` imports to your own alias. Run `npx veil-ui@latest doctor` at any
time to validate the setup.

### CLI

| Command | Description |
| --- | --- |
| `veil-ui init` | Detect the framework and configure the project |
| `veil-ui add <components...>` | Add components with their dependencies |
| `veil-ui list [query]` | List available components |
| `veil-ui search <query>` | Search the registry |
| `veil-ui view <component>` | Print a component's files |
| `veil-ui doctor` | Diagnose the local setup |

`add` supports `--overwrite`, `--no-install`, `--dry-run`, `--registry <url>` and `--cwd <path>`.
Full reference: [`apps/docs/content/docs/cli.mdx`](apps/docs/content/docs/cli.mdx).

## What's inside

| Group | Components | Examples |
| --- | ---: | ---: |
| Actions | 18 | 60 |
| Forms | 38 | 111 |
| Feedback | 22 | 55 |
| Data display | 30 | 62 |
| Charts | 15 | 30 |
| Media | 13 | 26 |
| Navigation | 25 | 46 |
| Overlays | 15 | 38 |
| Typography | 19 | 47 |
| Layout | 22 | 64 |
| Mobile | 20 | 40 |
| Landing | 20 | 40 |
| Auth | 10 | 20 |
| Page templates | 30 | 30 |
| **Total** | **297** | **669** |

Highlights across the catalog:

- **Forms** — inputs, textareas, selects, comboboxes, multi-selects, sliders, OTP, uploads, validation messages, field groups and complete form layouts.
- **Data display** — tables, sortable data tables, trees, key-value lists, timelines, activity feeds and Recharts-powered charts.
- **Overlays** — dialogs, alert dialogs, sheets, drawers, popovers, hover cards, context menus, command palette and toasts.
- **Navigation** — navbars, sidebars, tabs, breadcrumbs, pagination, back-to-top and a full command menu.
- **Mobile** — app shell, mobile headers, bottom bars, swipe rows, pickers and safe-area helpers.
- **Landing** — heroes, feature grids, pricing tables, testimonials, FAQ sections, CTAs and footers.
- **Auth & pages** — login, signup, reset and OTP flows, plus 30 full-page templates for dashboards, commerce, content, chat, kanban, settings and error states.

## Repository layout

```
veil-ui/
├─ apps/
│  └─ docs/                     Next.js 16 + Fumadocs documentation and registry host
│     ├─ app/                   App Router routes, layouts and landing page
│     ├─ content/docs/          MDX documentation (installation, theming, CLI, components)
│     └─ public/r/              Generated registry JSON (git-ignored)
├─ packages/
│  ├─ cli/                      `veil-ui` CLI — init, add, list, search, view, doctor
│  ├─ registry/                 Single source of truth for components
│  │  ├─ scripts/               Registry compiler
│  │  └─ src/components/        One folder per component
│  ├─ tokens/                   OKLCH theme tokens and Tailwind v4 mapping
│  └─ utils/                    `cn()` helper shared inside the monorepo
├─ scripts/e2e-cli.mjs          End-to-end CLI check against a local registry
└─ tooling/                     Shared tsconfig and lint presets
```

Every component is a self-contained folder:

```
packages/registry/src/components/button/
├─ index.tsx      Component source (what the CLI ships)
├─ meta.json      Registry metadata, dependencies and example names
├─ demo.tsx       Live examples rendered by the docs
└─ test.tsx       Render, behaviour and axe-core accessibility tests
```

`pnpm registry:build` compiles these folders into `apps/docs/public/r/*.json`, generates the
source shown in the docs and validates metadata, names and demo exports. Generated output is
never committed — the source folders are the only truth.

## Development

```bash
pnpm install          # install the workspace
pnpm dev              # docs at http://localhost:3000 (generates the registry first)
pnpm build            # registry + docs production build
pnpm test             # component render, behaviour and a11y tests
pnpm typecheck        # TypeScript across the workspace
pnpm lint             # oxlint
pnpm format           # Prettier
pnpm registry:build   # regenerate registry JSON and demo source
pnpm test:e2e         # CLI end-to-end against a built local registry
pnpm clean            # remove build output and node_modules
```

The repository is a pnpm workspace orchestrated by Turborepo. A local registry is available at
`http://localhost:3000/r` while the docs are running:

```bash
npx veil-ui add card --registry http://localhost:3000/r
```

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | React 19, Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4, OKLCH CSS variables |
| Behaviour | Radix UI primitives, `cmdk`, `embla-carousel`, `react-day-picker`, Recharts |
| API | TypeScript, `class-variance-authority`, `clsx` + `tailwind-merge` |
| Docs | Fumadocs, MDX, generated registry source |
| Tooling | pnpm workspaces, Turborepo, tsup, Vitest, Testing Library, axe-core, oxlint, Prettier |
| CI | GitHub Actions — lint, typecheck, tests, registry build, production build, CLI e2e |

## Design principles

- **Monochrome first.** Foreground, background and neutral surfaces carry the interface; colour is reserved for status.
- **Tokens over classes.** Semantic utilities such as `bg-background`, `text-muted-foreground` and `border-border` map to CSS variables.
- **Behaviour is delegated.** Radix owns focus management, portalling and keyboard semantics.
- **Small, explicit APIs.** `cva` for variants, `cn` for overrides, `data-slot` for styling hooks.
- **The registry is the product.** There is no separate runtime package to publish or version.

## Documentation

The documentation app lives in `apps/docs`. Run `pnpm dev` and open
[`http://localhost:3000/docs`](http://localhost:3000/docs).

| Page | Path |
| --- | --- |
| Introduction | `apps/docs/content/docs/index.mdx` |
| Installation | `apps/docs/content/docs/installation.mdx` |
| Theming | `apps/docs/content/docs/theming.mdx` |
| CLI | `apps/docs/content/docs/cli.mdx` |
| Components | `apps/docs/content/docs/components/*.mdx` |

Each component page is generated from the same folder the CLI ships, including every demo's
source code and installation command.

## Roadmap

| Phase | Scope | Status |
| --- | --- | --- |
| P0 | Monorepo, tokens, registry, CLI, docs foundations | ✅ Done |
| P1 | Core components | ✅ Done |
| P2 | Forms, validation, selection | ✅ Done |
| P3 | Data display, tables, navigation, date | ✅ Done |
| P4 | Overlays, media, charts | ✅ Done |
| P5 | Mobile, landing and marketing | ✅ Done |
| P6 | Auth flows and 30 page templates | ✅ Done |
| P7 | v1 polish — final audit, CLI release, hosted docs | 🚧 In progress |

## Contributing

Contributions are welcome. Before opening a pull request:

1. Add the component as a folder under `packages/registry/src/components/<name>/` with `index.tsx`, `meta.json`, `demo.tsx` and `test.tsx`.
2. Run `pnpm registry:build` so metadata and demo exports validate.
3. Run `pnpm test`, `pnpm typecheck` and `pnpm lint`.
4. Keep accessibility checks green — tests disable only `color-contrast` and `region` from axe.

Please open an issue before starting large features so the API can be discussed first.

## License

Released under the [MIT License](./LICENSE). Copyright © 2026 Veil UI contributors.

<div align="center">

**[Documentation](apps/docs/content/docs/index.mdx)** · **[Components](apps/docs/content/docs/components)** · **[CLI](apps/docs/content/docs/cli.mdx)**

</div>
