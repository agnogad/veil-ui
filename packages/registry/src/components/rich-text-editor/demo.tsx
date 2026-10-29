import { RichTextEditor } from "./index";

export function RichTextEditorBasic() {
  return (
    <div className="max-w-xl">
      <RichTextEditor defaultValue="<p>Tell us about <strong>your project</strong>.</p>" />
    </div>
  );
}

export function RichTextEditorDisabled() {
  return (
    <div className="max-w-xl">
      <RichTextEditor defaultValue="<p>This content is locked.</p>" disabled />
    </div>
  );
}
