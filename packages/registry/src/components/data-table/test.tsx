import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { DataTableBasic } from "./demo";

describe("Data Table", () => {
  it("renders the basic example", () => {
    const { container } = render(<DataTableBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<DataTableBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
