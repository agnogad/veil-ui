import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ActivityFeedBasic } from "./demo";

describe("Activity Feed", () => {
  it("renders the basic example", () => {
    const { container } = render(<ActivityFeedBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ActivityFeedBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
