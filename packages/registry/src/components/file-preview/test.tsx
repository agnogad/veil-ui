import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FilePreviewBasic } from "./demo";

describe("File Preview", () => {
  it("renders the basic example", () => {
    const { container } = render(<FilePreviewBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<FilePreviewBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
