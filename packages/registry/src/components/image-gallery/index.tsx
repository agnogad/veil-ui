"use client";

import { useState } from "react";

import { cn } from "@veil-ui/utils";

import { Lightbox, type LightboxImage } from "../lightbox/index";

interface ImageGalleryProps {
  images: LightboxImage[];
  columns?: 2 | 3 | 4;
  className?: string;
  label?: string;
}

const columnsClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

function ImageGallery({
  images,
  columns = 3,
  className,
  label = "Image gallery",
}: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div data-slot="image-gallery" className={cn("w-full", className)}>
      <ul
        aria-label={label}
        className={cn("grid grid-cols-2 gap-2", columnsClass[columns])}
      >
        {images.map((image, imageIndex) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => {
                setIndex(imageIndex);
                setOpen(true);
              }}
              aria-label={`Open ${image.alt}`}
              className="group block w-full overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        images={images}
        index={index}
        onIndexChange={setIndex}
        open={open}
        onOpenChange={setOpen}
        label={label}
      />
    </div>
  );
}

export { ImageGallery };
