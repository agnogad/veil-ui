import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobileToolbarBasic } from "./demo";

describe("Mobile Toolbar", () => {
  it("renders the basic example", () => {
    const { container } = render(<MobileToolbarBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobileToolbarBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
