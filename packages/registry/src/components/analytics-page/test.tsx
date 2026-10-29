import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { AnalyticsPageBasic } from "./demo";

describe("Analytics Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<AnalyticsPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AnalyticsPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
