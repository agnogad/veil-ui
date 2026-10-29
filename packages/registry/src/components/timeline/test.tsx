import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { TimelineBasic } from "./demo";

describe("Timeline", () => {
  it("renders the basic example", () => {
    const { container } = render(<TimelineBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TimelineBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
