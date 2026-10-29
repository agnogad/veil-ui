import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./index";

export function ContextMenuBasic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="grid h-32 w-64 place-items-center rounded-md border border-dashed text-sm text-muted-foreground">
        Right-click this area
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>File</ContextMenuLabel>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function ContextMenuShortcuts() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="grid h-32 w-64 place-items-center rounded-md border border-dashed text-sm text-muted-foreground">
        Right-click for actions
      </ContextMenuTrigger>
      <ContextMenuContent className="min-w-52">
        <ContextMenuLabel>Edit</ContextMenuLabel>
        <ContextMenuItem>
          Copy
          <span className="ml-auto text-xs tracking-widest text-muted-foreground">
            ⌘C
          </span>
        </ContextMenuItem>
        <ContextMenuItem>
          Paste
          <span className="ml-auto text-xs tracking-widest text-muted-foreground">
            ⌘V
          </span>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Paste and match style
          <span className="ml-auto text-xs tracking-widest text-muted-foreground">
            ⇧⌘V
          </span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>Select all</ContextMenuItem>
        <ContextMenuItem inset variant="destructive">
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
