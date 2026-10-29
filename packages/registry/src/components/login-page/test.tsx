import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { LoginPageBasic } from "./demo";

describe("Login Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<LoginPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<LoginPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
