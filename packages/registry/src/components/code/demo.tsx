import { Code } from "./index";

export function CodeBasic() {
  return <Code>pnpm dlx veil-ui init</Code>;
}

export function CodeInSentence() {
  return (
    <p className="text-sm leading-relaxed">
      Run <Code>npx veil-ui@latest add button</Code> to copy the button into your
      project.
    </p>
  );
}
