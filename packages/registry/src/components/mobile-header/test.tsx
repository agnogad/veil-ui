import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobileHeaderBasic } from "./demo";

describe("Mobile Header", () => {
  it("renders the basic example", () => {
    const { container } = render(<MobileHeaderBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobileHeaderBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
