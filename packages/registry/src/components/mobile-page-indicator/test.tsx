import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobilePageIndicatorBasic } from "./demo";

describe("Mobile Page Indicator", () => {
  it("renders the basic example", () => {
    const { container } = render(<MobilePageIndicatorBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobilePageIndicatorBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
