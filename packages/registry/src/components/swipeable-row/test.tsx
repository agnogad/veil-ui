import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SwipeableRowBasic } from "./demo";

describe("Swipeable Row", () => {
  it("renders the basic example", () => {
    const { container } = render(<SwipeableRowBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SwipeableRowBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
