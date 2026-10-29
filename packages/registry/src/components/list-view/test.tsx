import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ListViewBasic } from "./demo";

describe("List View", () => {
  it("renders the basic example", () => {
    const { container } = render(<ListViewBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ListViewBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
