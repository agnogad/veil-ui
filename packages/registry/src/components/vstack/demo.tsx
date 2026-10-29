import { Input } from "../input/index";
import { Label } from "../label/index";
import { VStack } from "./index";

export function VstackBasic() {
  return (
    <VStack gap="sm" className="w-full max-w-sm">
      <div className="rounded-md border p-3 text-sm">First item</div>
      <div className="rounded-md border p-3 text-sm">Second item</div>
      <div className="rounded-md border p-3 text-sm">Third item</div>
    </VStack>
  );
}

export function VstackForm() {
  return (
    <VStack gap="md" className="w-full max-w-sm">
      <VStack gap="xs">
        <Label htmlFor="vstack-email">Email</Label>
        <Input id="vstack-email" placeholder="you@example.com" />
      </VStack>
      <VStack gap="xs">
        <Label htmlFor="vstack-name">Name</Label>
        <Input id="vstack-name" placeholder="Ada Lovelace" />
      </VStack>
    </VStack>
  );
}

export function VstackCentered() {
  return (
    <VStack align="center" gap="sm">
      <span className="size-10 rounded-full bg-muted" aria-hidden />
      <p className="text-sm font-medium">Ada Lovelace</p>
      <p className="text-xs text-muted-foreground">Engineer</p>
    </VStack>
  );
}
