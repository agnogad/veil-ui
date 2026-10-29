import { CodeBlock } from "./index";

const snippet = `import { Button } from "@/components/ui/button";

export function SaveButton() {
  return <Button>Save changes</Button>;
}`;

export function CodeBlockBasic() {
  return <CodeBlock code={snippet} language="tsx" className="max-w-lg" />;
}

export function CodeBlockFilename() {
  return (
    <CodeBlock
      code={snippet}
      language="tsx"
      filename="save-button.tsx"
      className="max-w-lg"
    />
  );
}

export function CodeBlockLineNumbers() {
  return (
    <CodeBlock
      code={snippet}
      filename="save-button.tsx"
      showLineNumbers
      className="max-w-lg"
    />
  );
}
