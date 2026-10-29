import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FeatureCardBasic } from "./demo";

describe("Feature Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<FeatureCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<FeatureCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
