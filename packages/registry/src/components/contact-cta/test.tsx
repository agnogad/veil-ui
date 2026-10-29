import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ContactCtaBasic } from "./demo";

describe("Contact CTA", () => {
  it("renders the basic example", () => {
    const { container } = render(<ContactCtaBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ContactCtaBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
