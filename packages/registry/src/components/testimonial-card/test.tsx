import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { TestimonialCardBasic } from "./demo";

describe("Testimonial Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<TestimonialCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TestimonialCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
