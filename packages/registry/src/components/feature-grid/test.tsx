import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FeatureGridBasic } from "./demo";

describe("Feature Grid", () => {
  it("renders the basic example", () => {
    const { container } = render(<FeatureGridBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<FeatureGridBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
