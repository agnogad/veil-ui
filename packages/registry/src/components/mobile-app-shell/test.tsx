import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobileAppShellBasic } from "./demo";

describe("Mobile App Shell", () => {
  it("renders the basic example", () => {
    const { container } = render(<MobileAppShellBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobileAppShellBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
