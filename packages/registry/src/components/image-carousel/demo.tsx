import { ImageCarousel } from "./index";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=60",
    alt: "Mountains at sunrise",
    caption: "Dolomites, Italy",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=60",
    alt: "Cabin beside a lake",
    caption: "Lake Bled, Slovenia",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393798-382c30c0f0cc?auto=format&fit=crop&w=900&q=60",
    alt: "Snowy mountain peak",
    caption: "Swiss Alps",
  },
];

export function ImageCarouselBasic() {
  return <ImageCarousel images={photos} className="mx-auto max-w-xl" />;
}

export function ImageCarouselCompact() {
  return (
    <ImageCarousel
      images={photos}
      label="Featured photos"
      className="mx-auto max-w-sm"
    />
  );
}
