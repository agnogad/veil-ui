import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ImageCardBasic } from "./demo";

describe("Image Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<ImageCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ImageCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
