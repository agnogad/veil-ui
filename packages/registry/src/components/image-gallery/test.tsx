import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ImageGalleryBasic } from "./demo";

describe("Image Gallery", () => {
  it("renders the basic example", () => {
    const { container } = render(<ImageGalleryBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ImageGalleryBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
