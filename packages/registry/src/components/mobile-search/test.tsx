import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobileSearchBasic } from "./demo";

describe("Mobile Search", () => {
  it("renders the basic example", () => {
    const { container } = render(<MobileSearchBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobileSearchBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
