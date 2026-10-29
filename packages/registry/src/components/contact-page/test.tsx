import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ContactPageBasic } from "./demo";

describe("Contact Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<ContactPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ContactPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
