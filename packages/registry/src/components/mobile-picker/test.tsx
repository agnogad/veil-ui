import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobilePickerBasic } from "./demo";

describe("Mobile Picker", () => {
  it("renders the basic example", () => {
    const { container } = render(<MobilePickerBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobilePickerBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
