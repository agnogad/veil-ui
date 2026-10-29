import { Blockquote } from "./index";

export function BlockquoteBasic() {
  return (
    <Blockquote>
      <p>Components are added as source files, not hidden behind a runtime.</p>
    </Blockquote>
  );
}

export function BlockquoteWithCitation() {
  return (
    <Blockquote cite="Veil UI docs">
      <p>The same code you would write yourself.</p>
    </Blockquote>
  );
}
