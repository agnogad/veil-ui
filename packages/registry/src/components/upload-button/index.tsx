"use client";

import { Upload } from "lucide-react";
import type * as React from "react";
import { useRef } from "react";

import { Button } from "../button/index";

interface UploadButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: FileList) => void;
  label?: string;
}

function UploadButton({
  accept,
  multiple,
  onFiles,
  label = "Upload",
  children,
  ...props
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        aria-hidden
        tabIndex={-1}
        className="sr-only"
        onChange={(event) => {
          const files = event.target.files;
          if (files && files.length > 0) onFiles?.(files);
          event.target.value = "";
        }}
      />
      <Button
        data-slot="upload-button"
        onClick={() => inputRef.current?.click()}
        {...props}
      >
        <Upload aria-hidden />
        {children ?? label}
      </Button>
    </>
  );
}

export { UploadButton };
