import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobileTabBarBasic } from "./demo";

describe("Mobile Tab Bar", () => {
  it("renders the basic example", () => {
    const { container } = render(<MobileTabBarBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobileTabBarBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
