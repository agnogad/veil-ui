import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ImageCarouselBasic } from "./demo";

describe("Image Carousel", () => {
  it("renders the basic example", () => {
    const { container } = render(<ImageCarouselBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ImageCarouselBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
