import { ResponsiveContainer } from "./index";

export function ResponsiveContainerSizes() {
  return (
    <div className="grid gap-2">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ResponsiveContainer
          key={size}
          maxWidth={size}
          className="rounded-md border bg-muted/20 px-3 py-2 text-xs"
        >
          maxWidth=&quot;{size}&quot;
        </ResponsiveContainer>
      ))}
    </div>
  );
}

export function ResponsiveContainerGutters() {
  return (
    <ResponsiveContainer
      gutter="lg"
      className="rounded-md border bg-muted/20 py-2 text-xs"
    >
      Wider gutters on larger screens.
    </ResponsiveContainer>
  );
}

export function ResponsiveContainerFluid() {
  return (
    <ResponsiveContainer
      fluid
      maxWidth="full"
      className="rounded-md border bg-muted/20 px-3 py-2 text-xs"
    >
      Fluid width, no centering.
    </ResponsiveContainer>
  );
}
