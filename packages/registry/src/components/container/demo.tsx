"use client";

import { Container } from "./index";

export function ContainerSizes() {
  return (
    <div className="w-full space-y-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Container
          key={size}
          size={size}
          className="rounded-md border border-dashed px-4 py-2 text-xs text-muted-foreground"
        >
          max-w-{size}
        </Container>
      ))}
    </div>
  );
}

export function ContainerPage() {
  return (
    <div className="w-full rounded-md border bg-muted/20 py-6">
      <Container size="md">
        <div className="rounded-md border bg-background p-4">
          <p className="text-sm font-medium">Page section</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Content is centered with 16px gutters on mobile and 24px above the
            small breakpoint.
          </p>
        </div>
      </Container>
    </div>
  );
}
