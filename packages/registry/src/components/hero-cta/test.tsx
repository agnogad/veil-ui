import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { HeroCtaBasic } from "./demo";

describe("Hero CTA", () => {
  it("renders the basic example", () => {
    const { container } = render(<HeroCtaBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<HeroCtaBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
