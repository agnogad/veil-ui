import { Box } from "./index";

export function BoxBasic() {
  return (
    <Box className="rounded-lg border p-4 text-sm">
      A generic layout primitive.
    </Box>
  );
}

export function BoxPadding() {
  return (
    <div className="grid gap-2">
      {(["sm", "md", "lg"] as const).map((padding) => (
        <Box
          key={padding}
          padding={padding}
          className="rounded-md border bg-muted/20 text-sm"
        >
          <span className="text-muted-foreground">padding=&quot;{padding}&quot;</span>
        </Box>
      ))}
    </div>
  );
}

export function BoxAsChild() {
  return (
    <Box
      asChild
      padding="md"
      className="inline-block rounded-md border underline-offset-4 hover:underline"
    >
      <a href="#box">Rendered as an anchor</a>
    </Box>
  );
}
