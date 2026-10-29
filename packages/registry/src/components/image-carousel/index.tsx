import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel/index";

interface ImageCarouselItem {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageCarouselProps {
  images: ImageCarouselItem[];
  className?: string;
  label?: string;
}

function ImageCarousel({
  images,
  className,
  label = "Image carousel",
}: ImageCarouselProps) {
  return (
    <Carousel
      opts={{ loop: true }}
      aria-label={label}
      className={className}
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.src}>
            <figure>
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="aspect-video w-full rounded-lg object-cover"
              />
              {image.caption ? (
                <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export { ImageCarousel, type ImageCarouselItem };
