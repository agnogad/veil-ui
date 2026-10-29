import { ImageGallery } from "./index";

const images = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=60",
    alt: "Mountains at sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393798-382c30c0f0cc?auto=format&fit=crop&w=600&q=60",
    alt: "Snowy mountain peak",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=60",
    alt: "Cabin beside a lake",
  },
];

export function ImageGalleryBasic() {
  return <ImageGallery images={images} className="max-w-xl" />;
}

export function ImageGalleryTwoColumns() {
  return (
    <ImageGallery
      images={images}
      columns={2}
      label="Trip photos"
      className="max-w-md"
    />
  );
}
