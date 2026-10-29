import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { DocumentationPageBasic } from "./demo";

describe("Documentation Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<DocumentationPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<DocumentationPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
