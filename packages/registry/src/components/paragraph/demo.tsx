import { Paragraph } from "./index";

export function ParagraphBasic() {
  return (
    <Paragraph>
      Components are added as source files. Edit them, delete them, shape them
      around your product.
    </Paragraph>
  );
}

export function ParagraphMuted() {
  return (
    <Paragraph tone="muted">
      The CLI resolves dependencies, writes the files and installs what is
      missing.
    </Paragraph>
  );
}

export function ParagraphLead() {
  return (
    <Paragraph size="lg" className="max-w-prose">
      A monochrome component collection for React. Built on Radix UI and
      Tailwind CSS v4, copied into your project with one command.
    </Paragraph>
  );
}
