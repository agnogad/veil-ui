import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SearchResultsPageBasic } from "./demo";

describe("Search Results Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<SearchResultsPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SearchResultsPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
