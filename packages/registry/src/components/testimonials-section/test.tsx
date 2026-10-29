import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { TestimonialsSectionBasic } from "./demo";

describe("Testimonials Section", () => {
  it("renders the basic example", () => {
    const { container } = render(<TestimonialsSectionBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TestimonialsSectionBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
