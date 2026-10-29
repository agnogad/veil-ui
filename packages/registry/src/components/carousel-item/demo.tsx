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

export function CarouselItemTwoUp() {
  return (
    <div className="flex max-w-sm overflow-hidden rounded-lg border bg-card">
      {["Design", "Engineering"].map((label) => (
        <CarouselItem key={label} className="basis-1/2 p-3">
          <div className="flex h-32 items-center justify-center rounded-md border bg-muted/30 text-sm font-medium">
            {label}
          </div>
        </CarouselItem>
      ))}
    </div>
  );
}
