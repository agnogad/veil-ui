import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { InteractiveCardBasic } from "./demo";

describe("Interactive Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<InteractiveCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<InteractiveCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
