import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ImageBasic } from "./demo";

describe("Image", () => {
  it("renders the basic example", () => {
    const { container } = render(<ImageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ImageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
