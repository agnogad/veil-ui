# veil-ui

The command line interface for [Veil UI](https://veil-ui.dev).

```bash
npx veil-ui@latest init
npx veil-ui@latest add button dialog form
```

## Commands

| Command | Description |
| --- | --- |
| `init` | Configure a project (`components.json`, tokens, `cn` helper) |
| `add <components...>` | Add components and their dependencies |
| `list [query]` | List available components |
| `search <query>` | Search the registry |
| `view <component>` | Show a component's files |
| `doctor` | Diagnose the setup |

## Options

- `--overwrite` — replace existing files without prompting
- `--no-install` — skip npm dependency installation
- `--dry-run` — print the files that would be written
- `--registry <url>` — use an alternate registry
- `--cwd <path>` — run in another directory

## Requirements

React 19, Tailwind CSS v4 and a TypeScript path alias such as `@/*`.

## License

MIT
