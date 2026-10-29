import { Button } from "../button/index";
import { Spacer } from "./index";

export function SpacerFlexible() {
  return (
    <div className="flex items-center rounded-md border p-3">
      <span className="text-sm font-medium">Left</span>
      <Spacer />
      <span className="text-sm text-muted-foreground">Right</span>
    </div>
  );
}

export function SpacerFixed() {
  return (
    <div className="flex items-center rounded-md border p-3 text-sm">
      <span className="size-8 rounded-md bg-muted" aria-hidden />
      <Spacer size="md" />
      <span className="size-8 rounded-md bg-muted" aria-hidden />
      <Spacer size="lg" />
      <span className="size-8 rounded-md bg-muted" aria-hidden />
    </div>
  );
}

export function SpacerToolbar() {
  return (
    <div className="flex items-center rounded-md border p-2">
      <Button size="sm" variant="ghost">
        Cancel
      </Button>
      <Spacer />
      <Button size="sm">Save</Button>
    </div>
  );
}
