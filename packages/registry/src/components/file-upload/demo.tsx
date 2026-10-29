"use client";

import { useState } from "react";

import { FileUpload } from "./index";

export function FileUploadBasic() {
  const [uploaded, setUploaded] = useState(0);

  return (
    <div className="flex max-w-lg flex-col gap-3">
      <FileUpload
        onUpload={(files) => {
          setUploaded((count) => count + files.length);
        }}
      />
      <p className="text-sm text-muted-foreground">
        {uploaded} file{uploaded === 1 ? "" : "s"} uploaded in this session
      </p>
    </div>
  );
}

export function FileUploadLimits() {
  return (
    <FileUpload
      className="max-w-lg"
      label="Drop your receipts"
      accept="image/png,image/jpeg,.pdf"
      maxSize={2 * 1024 * 1024}
      maxFiles={3}
      onUpload={() => {}}
    />
  );
}

export function FileUploadDisabled() {
  return (
    <FileUpload
      className="max-w-lg"
      label="Uploads are paused"
      disabled
      onUpload={() => {}}
    />
  );
}
