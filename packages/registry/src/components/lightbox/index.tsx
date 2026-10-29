"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Element that opens the lightbox. */
  trigger?: React.ReactNode;
  /** Accessible name for the dialog. */
  label?: string;
  className?: string;
}

function Lightbox({
  images,
  index,
  defaultIndex = 0,
  onIndexChange,
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  label = "Image viewer",
  className,
}: LightboxProps) {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const current = Math.min(index ?? internalIndex, Math.max(images.length - 1, 0));
  const image = images[current];

  function setIndex(next: number) {
    const total = images.length;
    if (total === 0) return;
    const wrapped = ((next % total) + total) % total;
    if (index === undefined) setInternalIndex(wrapped);
    onIndexChange?.(wrapped);
  }

  return (
    <DialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger ? (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      ) : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          aria-label={label}
          data-slot="lightbox"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              setIndex(current - 1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              setIndex(current + 1);
            }
          }}
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/90 p-6 outline-none",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
            className,
          )}
        >
          {image ? (
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[80vh] max-w-full rounded-md object-contain"
            />
          ) : (
            <p className="text-sm text-white/70">No images to show.</p>
          )}

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous image"
              className="size-9 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              onClick={() => setIndex(current - 1)}
            >
              <ChevronLeft aria-hidden />
            </Button>
            <p
              aria-live="polite"
              className="min-w-16 text-center text-sm tabular-nums text-white/80"
            >
              {images.length === 0 ? "0 / 0" : `${current + 1} / ${images.length}`}
            </p>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next image"
              className="size-9 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              onClick={() => setIndex(current + 1)}
            >
              <ChevronRight aria-hidden />
            </Button>
          </div>

          <DialogPrimitive.Close
            aria-label="Close lightbox"
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <X className="size-4" aria-hidden />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export { Lightbox, type LightboxImage };
