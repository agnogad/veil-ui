import { Badge } from "../badge/index";
import { Button } from "../button/index";
import { HStack } from "./index";

export function HstackBasic() {
  return (
    <HStack gap="sm">
      <Badge>React</Badge>
      <Badge variant="outline">Tailwind</Badge>
      <Badge variant="muted">Radix UI</Badge>
    </HStack>
  );
}

export function HstackToolbar() {
  return (
    <HStack justify="between" className="w-full rounded-md border p-3">
      <span className="text-sm font-medium">Filters</span>
      <HStack gap="sm">
        <Button size="sm" variant="ghost">
          Clear
        </Button>
        <Button size="sm">Apply</Button>
      </HStack>
    </HStack>
  );
}

export function HstackWrap() {
  return (
    <HStack gap="xs" wrap className="max-w-sm">
      {["design", "docs", "registry", "tokens", "cli", "a11y"].map((tag) => (
        <span
          key={tag}
          className="rounded-md border bg-muted/40 px-2 py-1 text-xs"
        >
          {tag}
        </span>
      ))}
    </HStack>
  );
}
