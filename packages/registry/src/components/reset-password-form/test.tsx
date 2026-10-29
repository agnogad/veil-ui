import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ResetPasswordFormBasic } from "./demo";

describe("Reset Password Form", () => {
  it("renders the basic example", () => {
    const { container } = render(<ResetPasswordFormBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ResetPasswordFormBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
