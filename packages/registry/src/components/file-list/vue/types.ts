export type FileListKind =
  | "pdf"
  | "image"
  | "sheet"
  | "archive"
  | "text"
  | "other";

export interface FileListItem {
  id: string;
  name: string;
  size?: string;
  kind?: FileListKind;
  url?: string;
}
