import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobileDialogBasic } from "./demo";

describe("Mobile Dialog", () => {
  it("renders the basic example", () => {
    const { container } = render(<MobileDialogBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobileDialogBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
