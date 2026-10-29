import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ForgotPasswordFormBasic } from "./demo";

describe("Forgot Password Form", () => {
  it("renders the basic example", () => {
    const { container } = render(<ForgotPasswordFormBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ForgotPasswordFormBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
