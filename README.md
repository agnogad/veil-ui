# Veil UI

Copy-paste React components, built on Radix UI and Tailwind CSS v4. Monochrome by
default, fully yours after one command.

```bash
npx veil-ui@latest init
npx veil-ui@latest add button
```

## Status

P0 (foundations) is complete: monorepo, design tokens, registry, CLI and the
docs site. P1 is in progress with 14 of 42 core components shipped:
button, input, textarea, label, badge, avatar, alert, progress, skeleton,
separator, tabs, tooltip, kbd and card.

| Phase | Scope | Status |
| --- | --- | --- |
| P0 | Foundations, registry, CLI, docs | Done |
| P1 | 42 core components | 14 / 42 shipped |
| P2 | Forms, validation, selection | Planned |
| P3 | Data display, tables, navigation, date | Planned |
| P4 | Overlays, media, charts | Planned |
| P5 | AI, editors, utilities | Planned |
| P6 | 75 blocks, v1.0 | Planned |

## Repository

```
apps/docs                  Next.js + Fumadocs documentation and registry host
packages/cli               veil-ui CLI (init, add, list, view, doctor)
packages/registry          Single source of truth for components, demos, docs
packages/tokens            OKLCH theme tokens
packages/utils             cn() helper used inside the monorepo
scripts/e2e-cli.mjs        End-to-end CLI check against a local registry
```

Every component lives in one folder:

```
packages/registry/src/components/button/
├─ index.tsx      component source (shipped)
├─ meta.json      registry metadata + example list
├─ demo.tsx       live examples used by the docs
└─ test.tsx       render, behaviour and axe tests
```

`pnpm registry:build` compiles these folders into
`apps/docs/public/r/*.json` and generates the code shown in the docs.

## Development

```bash
pnpm install
pnpm dev            # docs on http://localhost:3000
pnpm test           # unit + a11y tests
pnpm typecheck
pnpm build
pnpm test:e2e       # CLI against the local registry (requires a build)
```

## Design principles

- Monochrome OKLCH palette, single destructive hue, 6px base radius.
- Radix primitives for behaviour and accessibility.
- `className` merging via `cn`, variants via `cva`.
- `data-slot` attributes and `asChild` composition.
- No runtime wrapper package: the registry output is the source.

## License

MIT
