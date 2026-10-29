import { SplitLayout } from "./index";

export function SplitLayoutAsideEnd() {
  return (
    <SplitLayout
      aside={
        <div className="rounded-md border bg-muted/20 p-4 text-sm">
          Table of contents
        </div>
      }
      className="w-full"
    >
      <article className="rounded-md border p-4">
        <h3 className="text-sm font-semibold">Article</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The main pane grows to fill the remaining space.
        </p>
      </article>
    </SplitLayout>
  );
}

export function SplitLayoutAsideStart() {
  return (
    <SplitLayout
      asidePosition="start"
      asideSize="sm"
      aside={
        <div className="rounded-md border bg-muted/20 p-4 text-sm">
          Navigation
        </div>
      }
      className="w-full"
    >
      <div className="rounded-md border p-4 text-sm text-muted-foreground">
        Content with a narrow leading aside.
      </div>
    </SplitLayout>
  );
}

export function SplitLayoutSticky() {
  return (
    <SplitLayout
      stickyAside
      gap="lg"
      aside={
        <div className="rounded-md border bg-muted/20 p-4 text-sm">
          Sticks while the main pane scrolls.
        </div>
      }
      className="w-full"
    >
      <div className="grid gap-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="rounded-md border p-4 text-sm text-muted-foreground"
          >
            Section {index + 1}
          </div>
        ))}
      </div>
    </SplitLayout>
  );
}
