import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { AuthLayoutBasic } from "./demo";

describe("Auth Layout", () => {
  it("renders the basic example", () => {
    const { container } = render(<AuthLayoutBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AuthLayoutBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
