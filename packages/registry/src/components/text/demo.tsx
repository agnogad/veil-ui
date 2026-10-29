import { Text } from "./index";

export function TextBasic() {
  return <Text>Ship a polished interface without a component wrapper library.</Text>;
}

export function TextTones() {
  return (
    <div className="grid gap-2">
      <Text tone="default">Default body text</Text>
      <Text tone="muted">Muted supporting text</Text>
      <Text tone="destructive">Destructive status text</Text>
      <Text weight="semibold">Semibold emphasis</Text>
    </div>
  );
}

export function TextTruncate() {
  return (
    <div className="max-w-56 rounded-md border p-3">
      <Text truncate>
        A long single line that gets clipped with an ellipsis instead of wrapping
        onto the next line.
      </Text>
    </div>
  );
}
