import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { PullToRefreshBasic } from "./demo";

describe("Pull to Refresh", () => {
  it("renders the basic example", () => {
    const { container } = render(<PullToRefreshBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<PullToRefreshBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
