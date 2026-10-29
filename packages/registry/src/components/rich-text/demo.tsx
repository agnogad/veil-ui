import { RichText } from "./index";

export function RichTextBasic() {
  return (
    <RichText
      className="max-w-lg"
      defaultValue="<p>Select text and use <strong>bold</strong>, <em>italic</em> or <u>underline</u>.</p>"
    />
  );
}

export function RichTextDisabled() {
  return (
    <RichText
      className="max-w-lg"
      disabled
      defaultValue="<p>Read-only content rendered with the same editor shell.</p>"
    />
  );
}
