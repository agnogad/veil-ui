import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobileFilterSheetBasic } from "./demo";

describe("Mobile Filter Sheet", () => {
  it("renders the basic example", () => {
    const { container } = render(<MobileFilterSheetBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobileFilterSheetBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
