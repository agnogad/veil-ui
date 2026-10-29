import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ComingSoonPageBasic } from "./demo";

describe("Coming Soon Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<ComingSoonPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ComingSoonPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
