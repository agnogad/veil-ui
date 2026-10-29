import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SaasLandingPageBasic } from "./demo";

describe("SaaS Landing Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<SaasLandingPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SaasLandingPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
