"use client";

import { FileText, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Dropzone } from "../dropzone/index";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  /** Maximum size per file in bytes. */
  maxSize?: number;
  /** Maximum number of files kept in the list. */
  maxFiles?: number;
  disabled?: boolean;
  onUpload?: (files: File[]) => void;
  onFilesChange?: (files: File[]) => void;
  /** Heading inside the dropzone. */
  label?: string;
  className?: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileUpload({
  accept,
  multiple = true,
  maxSize,
  maxFiles,
  disabled = false,
  onUpload,
  onFilesChange,
  label = "Drag and drop files here",
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  function update(next: File[]) {
    setFiles(next);
    onFilesChange?.(next);
  }

  function addFiles(incoming: File[]) {
    setError(null);
    const accepted = maxSize
      ? incoming.filter((file) => file.size <= maxSize)
      : incoming;

    if (accepted.length < incoming.length) {
      setError(
        `Some files were skipped. Each file must be ${formatBytes(maxSize ?? 0)} or smaller.`,
      );
    }

    const merged = [...files];
    for (const file of accepted) {
      const exists = merged.some(
        (item) =>
          item.name === file.name &&
          item.size === file.size &&
          item.lastModified === file.lastModified,
      );
      if (!exists) merged.push(file);
    }

    const limited =
      maxFiles !== undefined ? merged.slice(0, maxFiles) : merged;

    if (maxFiles !== undefined && merged.length > maxFiles) {
      setError(`Only the first ${maxFiles} files are kept.`);
    }

    update(limited);
  }

  function remove(file: File) {
    setError(null);
    update(files.filter((item) => item !== file));
  }

  return (
    <div data-slot="file-upload" className={cn("flex flex-col gap-3", className)}>
      <Dropzone
        onFiles={addFiles}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        title={label}
        description={[
          maxSize ? `Max ${formatBytes(maxSize)} per file` : null,
          maxFiles ? `up to ${maxFiles} files` : null,
        ]
          .filter(Boolean)
          .join(" · ") || undefined}
      />

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((file) => (
            <li
              key={`${file.name}-${file.size}-${file.lastModified}`}
              className="flex items-center gap-3 rounded-md border px-3 py-2"
            >
              <FileText
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(file.size)}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove ${file.name}`}
                disabled={disabled}
                onClick={() => remove(file)}
              >
                <X aria-hidden />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {files.length} file{files.length === 1 ? "" : "s"} ready
          </p>
          <Button
            type="button"
            disabled={disabled}
            onClick={() => onUpload?.(files)}
          >
            Upload {files.length} file{files.length === 1 ? "" : "s"}
          </Button>
        </div>
      )}
    </div>
  );
}

export { FileUpload };
