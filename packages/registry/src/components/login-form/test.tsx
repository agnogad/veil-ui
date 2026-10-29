import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { LoginFormBasic } from "./demo";

describe("Login Form", () => {
  it("renders the basic example", () => {
    const { container } = render(<LoginFormBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<LoginFormBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
