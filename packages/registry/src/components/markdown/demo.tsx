import { Markdown } from "./index";

export function MarkdownBasic() {
  return (
    <Markdown className="max-w-prose">
      {`## Release notes

Ship **accessible** components with \`npx veil-ui add\`.

- Copy the source
- Own the code
- Keep the styles

> No wrapper library, no lock-in.
`}
    </Markdown>
  );
}

export function MarkdownGfm() {
  return (
    <Markdown className="max-w-prose">
      {`| Component | Status |
| --- | --- |
| Button | Stable |
| Markdown | New |

~~Legacy wrapper~~ replaced by **source files**.
`}
    </Markdown>
  );
}
