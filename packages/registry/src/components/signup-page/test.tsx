import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SignupPageBasic } from "./demo";

describe("Signup Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<SignupPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SignupPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
