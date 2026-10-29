import { fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import type { CarouselApi } from "./index";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./index";

function Example({ setApi }: { setApi?: (api: CarouselApi) => void }) {
  return (
    <Carousel aria-label="Gallery" setApi={setApi}>
      <CarouselContent>
        <CarouselItem>One</CarouselItem>
        <CarouselItem>Two</CarouselItem>
        <CarouselItem>Three</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

describe("Carousel", () => {
  it("renders slides and controls", () => {
    render(<Example />);

    expect(
      screen.getByRole("region", { name: "Gallery" }),
    ).toHaveAttribute("aria-roledescription", "carousel");
    expect(screen.getAllByRole("group")).toHaveLength(3);
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next slide" }),
    ).toBeInTheDocument();
  });

  it("scrolls with the arrow keys", () => {
    let api: CarouselApi = undefined;
    const onScrollNext = vi.fn();
    const onScrollPrev = vi.fn();

    render(
      <Example
        setApi={(instance) => {
          api = instance;
          if (instance) {
            instance.scrollNext = onScrollNext;
            instance.scrollPrev = onScrollPrev;
          }
        }}
      />,
    );

    const region = screen.getByRole("region", { name: "Gallery" });
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(onScrollNext).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(onScrollPrev).toHaveBeenCalledTimes(1);
    expect(api).toBeDefined();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
