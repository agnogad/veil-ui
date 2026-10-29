import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { UserProfileBasic } from "./demo";

describe("User Profile", () => {
  it("renders the basic example", () => {
    const { container } = render(<UserProfileBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<UserProfileBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
