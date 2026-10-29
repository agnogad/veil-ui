import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SwipeToDismissBasic } from "./demo";

describe("Swipe to Dismiss", () => {
  it("renders the basic example", () => {
    const { container } = render(<SwipeToDismissBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SwipeToDismissBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
