import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { UseCasesSectionBasic } from "./demo";

describe("Use Cases Section", () => {
  it("renders the basic example", () => {
    const { container } = render(<UseCasesSectionBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<UseCasesSectionBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
