import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SparklineBasic } from "./demo";

describe("Sparkline", () => {
  it("renders the basic example", () => {
    const { container } = render(<SparklineBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SparklineBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
