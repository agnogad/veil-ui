import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { HowItWorksSectionBasic } from "./demo";

describe("How It Works Section", () => {
  it("renders the basic example", () => {
    const { container } = render(<HowItWorksSectionBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<HowItWorksSectionBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
