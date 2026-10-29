import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { LandingPageBasic } from "./demo";

describe("Landing Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<LandingPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<LandingPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
