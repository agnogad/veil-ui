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
