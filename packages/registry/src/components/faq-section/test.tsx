import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FaqSectionBasic } from "./demo";

describe("FAQ Section", () => {
  it("renders the basic example", () => {
    const { container } = render(<FaqSectionBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<FaqSectionBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
