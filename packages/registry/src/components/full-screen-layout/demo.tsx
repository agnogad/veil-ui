import { Button } from "../button/index";
import { FullScreenLayout } from "./index";

export function FullScreenLayoutCentered() {
  return (
    <div className="h-72 overflow-hidden rounded-md border">
      <FullScreenLayout centered className="min-h-0">
        <div className="w-64 rounded-lg border bg-background p-6 text-center shadow-sm">
          <p className="text-sm font-semibold">Sign in</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Use the centered variant for auth screens.
          </p>
          <Button size="sm" className="mt-4 w-full">
            Continue
          </Button>
        </div>
      </FullScreenLayout>
    </div>
  );
}

export function FullScreenLayoutApp() {
  return (
    <div className="h-64 overflow-hidden rounded-md border">
      <FullScreenLayout
        className="min-h-0"
        header={<span className="text-sm font-medium">Workspace</span>}
        footer={
          <span className="text-xs text-muted-foreground">Status: online</span>
        }
      >
        <div className="p-4 text-sm text-muted-foreground">
          Main area fills the remaining height.
        </div>
      </FullScreenLayout>
    </div>
  );
}

export function FullScreenLayoutPadded() {
  return (
    <div className="h-64 overflow-hidden rounded-md border">
      <FullScreenLayout padded className="min-h-0">
        <div className="size-full rounded-md border border-dashed p-3 text-sm text-muted-foreground">
          Padding is applied to the main region.
        </div>
      </FullScreenLayout>
    </div>
  );
}
