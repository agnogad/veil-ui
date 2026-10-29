import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { TableBasic } from "./demo";

describe("Table", () => {
  it("renders the basic example", () => {
    const { container } = render(<TableBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TableBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
