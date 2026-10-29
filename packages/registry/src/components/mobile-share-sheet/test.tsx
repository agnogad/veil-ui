import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobileShareSheetBasic } from "./demo";

describe("Mobile Share Sheet", () => {
  it("renders the basic example", () => {
    const { container } = render(<MobileShareSheetBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobileShareSheetBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
