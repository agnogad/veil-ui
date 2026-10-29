import { LoadingOverlay } from "./index";

export function LoadingOverlayBasic() {
  return (
    <div className="relative h-40 overflow-hidden rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">Recent activity</p>
      <LoadingOverlay />
    </div>
  );
}

export function LoadingOverlayCustomLabel() {
  return (
    <div className="relative h-40 overflow-hidden rounded-lg border bg-muted/20 p-4">
      <p className="text-sm text-muted-foreground">Syncing records…</p>
      <LoadingOverlay label="Syncing records" />
    </div>
  );
}
