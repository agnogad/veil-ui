import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Error404PageBasic } from "./demo";

describe("404 Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<Error404PageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Error404PageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
