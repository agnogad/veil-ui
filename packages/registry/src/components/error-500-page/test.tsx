import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Error500PageBasic } from "./demo";

describe("500 Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<Error500PageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Error500PageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
