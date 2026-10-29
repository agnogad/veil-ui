import { CarouselItem } from "../carousel-item/index";

export function CarouselItemBasic() {
  return (
    <div className="flex max-w-sm overflow-hidden rounded-lg border bg-card">
      <CarouselItem>
        <div className="flex h-40 items-center justify-center p-6 text-sm text-muted-foreground">
          One slide of content
        </div>
      </CarouselItem>
    </div>
  );
}
