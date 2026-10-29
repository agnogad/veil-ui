import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ListItemBasic } from "./demo";

describe("List Item", () => {
  it("renders the basic example", () => {
    const { container } = render(<ListItemBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ListItemBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
