import { ScrollArea, ScrollBar } from "./index";

export function ScrollAreaVertical() {
  return (
    <ScrollArea className="h-48 w-full max-w-sm rounded-md border">
      <div className="grid gap-2 p-3">
        {Array.from({ length: 20 }, (_, index) => (
          <div
            key={index}
            className="rounded-md border bg-muted/20 px-3 py-2 text-sm"
          >
            Row {index + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function ScrollAreaHorizontal() {
  return (
    <ScrollArea className="w-full max-w-sm whitespace-nowrap rounded-md border">
      <div className="flex gap-2 p-3">
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={index}
            className="flex size-24 shrink-0 items-center justify-center rounded-md border bg-muted/20 text-sm"
          >
            {index + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export function ScrollAreaBoth() {
  return (
    <ScrollArea className="h-48 w-full max-w-sm rounded-md border">
      <div className="grid w-[40rem] grid-cols-4 gap-2 p-3">
        {Array.from({ length: 32 }, (_, index) => (
          <div
            key={index}
            className="flex h-20 items-center justify-center rounded-md border bg-muted/20 text-sm"
          >
            {index + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
