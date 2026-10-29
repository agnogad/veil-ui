import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { TrustBarBasic } from "./demo";

describe("Trust Bar", () => {
  it("renders the basic example", () => {
    const { container } = render(<TrustBarBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TrustBarBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
