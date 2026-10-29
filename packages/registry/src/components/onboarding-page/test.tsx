import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { OnboardingPageBasic } from "./demo";

describe("Onboarding Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<OnboardingPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<OnboardingPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
