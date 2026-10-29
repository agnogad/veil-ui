import { CommandPalette } from "./index";

export function CommandPaletteBasic() {
  return (
    <CommandPalette
      trigger={
        <button
          type="button"
          className="rounded-md border px-3 py-1.5 text-sm font-medium"
        >
          Press ⌘K
        </button>
      }
      items={[
        { label: "Search docs", shortcut: "⌘K" },
        { label: "Go to settings", shortcut: "G S" },
        { label: "Copy install command" },
      ]}
    />
  );
}
