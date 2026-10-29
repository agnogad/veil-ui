import { Heading } from "./index";

export function HeadingBasic() {
  return <Heading>Own your interface.</Heading>;
}

export function HeadingLevels() {
  return (
    <div className="grid gap-2">
      <Heading level={1}>Level one</Heading>
      <Heading level={3}>Level three</Heading>
      <Heading level={6} tone="muted">
        Level six
      </Heading>
    </div>
  );
}

export function HeadingVisualOverride() {
  return (
    <div className="grid gap-2">
      <Heading level={2} size={5} weight="medium" tone="muted">
        A small h2 with a quiet tone
      </Heading>
      <Heading level={6} size={2}>
        A large h6 for visual emphasis
      </Heading>
    </div>
  );
}
