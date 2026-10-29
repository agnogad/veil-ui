import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SafeAreaViewBasic } from "./demo";

describe("Safe Area View", () => {
  it("renders the basic example", () => {
    const { container } = render(<SafeAreaViewBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SafeAreaViewBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
