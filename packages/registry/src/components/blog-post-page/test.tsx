import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { BlogPostPageBasic } from "./demo";

describe("Blog Post Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<BlogPostPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlogPostPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
