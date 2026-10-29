"use client";

import { useState } from "react";

import { UploadButton } from "./index";

export function UploadButtonBasic() {
  return <UploadButton />;
}

export function UploadButtonImages() {
  const [names, setNames] = useState<string[]>([]);

  return (
    <div className="grid gap-2">
      <UploadButton
        accept="image/*"
        multiple
        label="Upload images"
        onFiles={(files) => setNames(Array.from(files, (file) => file.name))}
      />
      {names.length > 0 ? (
        <p className="text-xs text-muted-foreground">
          Selected: {names.join(", ")}
        </p>
      ) : null}
    </div>
  );
}

export function UploadButtonOutline() {
  return (
    <UploadButton variant="outline" accept=".pdf,.doc,.docx">
      Upload document
    </UploadButton>
  );
}
