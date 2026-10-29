import { SafeAreaView } from "./index";

export function SafeAreaViewBasic() {
  return (
    <SafeAreaView
      data-testid="safe-area"
      className="w-full max-w-sm border-y border-dashed bg-muted/30 p-4 text-sm text-muted-foreground"
    >
      Content respects all device insets.
    </SafeAreaView>
  );
}

export function SafeAreaViewBottomOnly() {
  return (
    <SafeAreaView
      edges={["bottom"]}
      className="w-full max-w-sm rounded-lg border bg-background p-4 text-sm"
    >
      <p className="font-medium">Sticky footer content</p>
      <p className="text-xs text-muted-foreground">
        Only the bottom inset is applied.
      </p>
    </SafeAreaView>
  );
}
