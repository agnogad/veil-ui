import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SignupFormBasic } from "./demo";

describe("Signup Form", () => {
  it("renders the basic example", () => {
    const { container } = render(<SignupFormBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SignupFormBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
