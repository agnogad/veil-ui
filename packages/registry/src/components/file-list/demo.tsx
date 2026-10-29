import { FileList } from "./index";

export function FileListBasic() {
  return (
    <FileList
      className="max-w-md"
      label="Project files"
      items={[
        { id: "1", name: "brand-guide.pdf", size: "4.2 MB", kind: "pdf" },
        { id: "2", name: "hero.png", size: "860 KB", kind: "image" },
        { id: "3", name: "budget.xlsx", size: "120 KB", kind: "sheet" },
        { id: "4", name: "assets.zip", size: "18 MB", kind: "archive" },
      ]}
    />
  );
}

export function FileListLinked() {
  return (
    <FileList
      className="max-w-xs"
      label="Downloads"
      items={[
        {
          id: "1",
          name: "release-notes.md",
          size: "12 KB",
          kind: "text",
          url: "#",
        },
        { id: "2", name: "logo.svg", size: "8 KB", kind: "image", url: "#" },
      ]}
    />
  );
}
