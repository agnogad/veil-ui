import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { BlogPageBasic } from "./demo";

describe("Blog Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<BlogPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlogPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
