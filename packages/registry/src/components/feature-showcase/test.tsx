import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FeatureShowcaseBasic } from "./demo";

describe("Feature Showcase", () => {
  it("renders the basic example", () => {
    const { container } = render(<FeatureShowcaseBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<FeatureShowcaseBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
