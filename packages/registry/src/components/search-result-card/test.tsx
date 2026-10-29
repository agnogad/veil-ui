import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SearchResultCardBasic } from "./demo";

describe("Search Result Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<SearchResultCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SearchResultCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
