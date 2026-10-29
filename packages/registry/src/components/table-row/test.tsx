import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { TableRowBasic } from "./demo";

describe("Table Row", () => {
  it("renders the basic example", () => {
    const { container } = render(<TableRowBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TableRowBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
