import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobileDrawerBasic } from "./demo";

describe("Mobile Drawer", () => {
  it("renders the basic example", () => {
    const { container } = render(<MobileDrawerBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobileDrawerBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
