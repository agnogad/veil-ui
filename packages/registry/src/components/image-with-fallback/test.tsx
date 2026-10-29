import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ImageWithFallbackBasic } from "./demo";

describe("Image with Fallback", () => {
  it("renders the basic example", () => {
    const { container } = render(<ImageWithFallbackBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ImageWithFallbackBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
