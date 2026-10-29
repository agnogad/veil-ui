import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobileBottomBarBasic } from "./demo";

describe("Mobile Bottom Bar", () => {
  it("renders the basic example", () => {
    const { container } = render(<MobileBottomBarBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobileBottomBarBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
