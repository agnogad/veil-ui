import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { TableCellBasic } from "./demo";

describe("Table Cell", () => {
  it("renders the basic example", () => {
    const { container } = render(<TableCellBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TableCellBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
