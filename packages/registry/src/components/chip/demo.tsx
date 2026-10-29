import { Chip } from "./index";

export function ChipBasic() {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip variant="muted">React</Chip>
      <Chip variant="muted">TypeScript</Chip>
      <Chip variant="muted">Tailwind</Chip>
    </div>
  );
}
