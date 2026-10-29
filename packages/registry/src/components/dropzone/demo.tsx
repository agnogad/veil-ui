"use client";

import { FileUp } from "lucide-react";
import { useState } from "react";

import { Dropzone } from "./index";

export function DropzoneBasic() {
  const [names, setNames] = useState<string[]>([]);

  return (
    <div className="flex max-w-md flex-col gap-3">
      <Dropzone
        onFiles={(files) => setNames(files.map((file) => file.name))}
        description="PNG, JPG or PDF up to 10 MB"
      />
      {names.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Added: {names.join(", ")}
        </p>
      )}
    </div>
  );
}

export function DropzoneCustom() {
  return (
    <Dropzone
      className="max-w-md"
      icon={FileUp}
      title="Drop your invoices"
      description="Each file must be smaller than 5 MB"
      accept=".pdf"
      multiple
      onFiles={() => {}}
    />
  );
}

export function DropzoneDisabled() {
  return (
    <Dropzone
      className="max-w-md"
      title="Uploads are paused"
      description="Contact your administrator to enable uploads"
      disabled
      onFiles={() => {}}
    />
  );
}
