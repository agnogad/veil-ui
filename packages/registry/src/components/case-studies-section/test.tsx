import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { CaseStudiesSectionBasic } from "./demo";

describe("Case Studies Section", () => {
  it("renders the basic example", () => {
    const { container } = render(<CaseStudiesSectionBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CaseStudiesSectionBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
