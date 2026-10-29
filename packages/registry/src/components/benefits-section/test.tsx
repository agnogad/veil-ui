import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { BenefitsSectionBasic } from "./demo";

describe("Benefits Section", () => {
  it("renders the basic example", () => {
    const { container } = render(<BenefitsSectionBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BenefitsSectionBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
