"use client";

import { useState } from "react";

import { CodeEditor } from "./index";

const sample = `export function greet(name: string) {
  return \`Hello, \${name}!\`;
}`;

export function CodeEditorBasic() {
  return (
    <div className="max-w-xl">
      <CodeEditor language="typescript" defaultValue={sample} label="Function source" />
    </div>
  );
}

export function CodeEditorControlled() {
  const [code, setCode] = useState("const total = 42;\n");

  return (
    <div className="flex max-w-xl flex-col gap-3">
      <CodeEditor
        language="javascript"
        value={code}
        onValueChange={setCode}
        label="Snippet"
      />
      <p className="text-sm text-muted-foreground">{code.length} characters</p>
    </div>
  );
}

export function CodeEditorReadonly() {
  return (
    <div className="max-w-xl">
      <CodeEditor
        language="json"
        readOnly
        label="Configuration"
        defaultValue={'{\n  "theme": "dark",\n  "strict": true\n}'}
      />
    </div>
  );
}
