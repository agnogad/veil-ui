import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./index";

const slides = [
  { title: "Design tokens", copy: "A single source of truth for color, spacing and type." },
  { title: "Registry", copy: "Copy-paste components that live in your codebase." },
  { title: "CLI", copy: "Add any component with a single command." },
  { title: "Docs", copy: "Examples, API tables and accessibility notes." },
];

export function CarouselBasic() {
  return (
    <Carousel aria-label="Product features" className="mx-auto w-full max-w-md">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.title}>
            <div className="flex h-44 flex-col justify-end rounded-lg border bg-muted/30 p-6">
              <p className="text-sm font-semibold">{slide.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{slide.copy}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function CarouselVertical() {
  return (
    <Carousel
      orientation="vertical"
      aria-label="Changelog"
      className="mx-auto h-48 w-full max-w-md"
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.title}>
            <div className="rounded-lg border bg-card p-4 text-sm">
              {slide.title} — {slide.copy}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function CarouselLoop() {
  return (
    <Carousel
      opts={{ loop: true, align: "start" }}
      aria-label="Testimonials"
      className="mx-auto w-full max-w-md"
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.title}>
            <blockquote className="rounded-lg border bg-card p-6 text-sm">
              “{slide.copy}”
            </blockquote>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
