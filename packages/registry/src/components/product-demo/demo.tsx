import { BarChart3, LayoutDashboard, Settings } from "lucide-react";

import { ProductDemo } from "./index";

export function ProductDemoBasic() {
  return (
    <ProductDemo
      className="w-full max-w-3xl"
      title="app.veil-ui.dev/dashboard"
      caption="A dashboard composed from registry blocks."
    >
      <div className="grid size-full grid-cols-[80px_1fr]">
        <div className="flex flex-col items-center gap-4 border-r bg-background/60 py-4">
          <LayoutDashboard className="size-4 text-primary" aria-hidden />
          <BarChart3 className="size-4 text-muted-foreground" aria-hidden />
          <Settings className="size-4 text-muted-foreground" aria-hidden />
        </div>
        <div className="grid grid-cols-2 gap-3 p-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="rounded-lg border bg-background/80 p-3">
              <div className="h-2 w-12 rounded bg-muted" />
              <div className="mt-2 h-6 w-20 rounded bg-primary/20" />
            </div>
          ))}
        </div>
      </div>
    </ProductDemo>
  );
}

export function ProductDemoImage() {
  return (
    <ProductDemo
      className="w-full max-w-2xl"
      url="veil-ui.dev"
      caption="Marketing site preview."
    >
      <div className="grid size-full place-items-center bg-gradient-to-br from-primary/15 via-background to-muted">
        <span className="rounded-lg border bg-background px-4 py-2 text-sm shadow-sm">
          Landing page preview
        </span>
      </div>
    </ProductDemo>
  );
}
