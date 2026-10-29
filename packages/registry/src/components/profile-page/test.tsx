import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ProfilePageBasic } from "./demo";

describe("Profile Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<ProfilePageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProfilePageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
