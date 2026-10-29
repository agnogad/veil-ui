import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { UserMenuBasic } from "./demo";

describe("User Menu", () => {
  it("renders the basic example", () => {
    const { container } = render(<UserMenuBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<UserMenuBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
