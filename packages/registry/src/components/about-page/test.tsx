import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { AboutPageBasic } from "./demo";

describe("About Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<AboutPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AboutPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
