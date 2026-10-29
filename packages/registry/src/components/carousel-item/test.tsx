import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { CarouselItem } from "./index";

describe("CarouselItem", () => {
  it("renders as a slide", () => {
    render(<CarouselItem>Slide content</CarouselItem>);

    const slide = screen.getByRole("group");
    expect(slide).toHaveAttribute("aria-roledescription", "slide");
    expect(slide).toHaveClass("basis-full");
    expect(slide).toHaveTextContent("Slide content");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <CarouselItem>Slide content</CarouselItem>
      </div>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
