import { FilePreview } from "./index";

export function FilePreviewBasic() {
  return (
    <FilePreview
      name="release-notes.md"
      size="12 KB"
      type="text/markdown"
      text={"# Release 2.4\n\n- Added data table sorting\n- Improved focus rings"}
    />
  );
}

export function FilePreviewImage() {
  return (
    <FilePreview
      name="hero-banner.png"
      size="860 KB"
      type="image/png"
      url="https://images.unsplash.com/photo-1519681393798-382c30c0f0cc?auto=format&fit=crop&w=800&q=60"
    />
  );
}
