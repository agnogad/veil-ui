import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { NewsletterSectionBasic } from "./demo";

describe("Newsletter Section", () => {
  it("renders the basic example", () => {
    const { container } = render(<NewsletterSectionBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<NewsletterSectionBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
