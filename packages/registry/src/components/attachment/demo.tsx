"use client";

import { useState } from "react";

import { Attachment } from "./index";

export function AttachmentBasic() {
  return <Attachment name="quarterly-report.pdf" size="2.4 MB" />;
}

export function AttachmentRemovable() {
  const [files, setFiles] = useState([
    { name: "brief.docx", size: "44 KB" },
    { name: "logo.svg", size: "8 KB" },
  ]);

  return (
    <div className="flex flex-wrap gap-2">
      {files.map((file) => (
        <Attachment
          key={file.name}
          name={file.name}
          size={file.size}
          onRemove={() => setFiles((current) => current.filter((item) => item.name !== file.name))}
        />
      ))}
      {files.length === 0 ? (
        <span className="text-sm text-muted-foreground">No attachments.</span>
      ) : null}
    </div>
  );
}
