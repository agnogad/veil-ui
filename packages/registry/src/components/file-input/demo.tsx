"use client";

import { useState } from "react";

import { FileInput } from "./index";

export function FileInputBasic() {
  return (
    <FileInput
      label="Resume"
      accept=".pdf,.doc,.docx"
      hint="PDF or Word document, up to 5 MB."
      className="max-w-sm"
    />
  );
}

export function FileInputMultiple() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex max-w-sm flex-col gap-3">
      <FileInput
        label="Attachments"
        multiple
        onFilesChange={(files) => setCount(files?.length ?? 0)}
      />
      <p className="text-sm text-muted-foreground">
        {count} file{count === 1 ? "" : "s"} selected
      </p>
    </div>
  );
}

export function FileInputError() {
  return (
    <FileInput
      label="Avatar"
      accept="image/*"
      error="Please choose an image smaller than 2 MB."
      className="max-w-sm"
    />
  );
}
