import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { AccountSettingsBasic } from "./demo";

describe("Account Settings", () => {
  it("renders the basic example", () => {
    const { container } = render(<AccountSettingsBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AccountSettingsBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
