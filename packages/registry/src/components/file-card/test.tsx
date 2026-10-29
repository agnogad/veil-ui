import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FileCardBasic } from "./demo";

describe("File Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<FileCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<FileCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
