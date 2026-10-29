import { TableOfContents } from "./index";

const items = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "theming", title: "Theming", level: 3 as const },
  { id: "tokens", title: "Tokens", level: 4 as const },
];

export function TableOfContentsBasic() {
  return <TableOfContents items={items} className="max-w-56" />;
}

export function TableOfContentsActive() {
  return (
    <TableOfContents items={items} activeId="theming" className="max-w-56" />
  );
}
