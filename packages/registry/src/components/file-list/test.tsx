import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FileListBasic } from "./demo";

describe("File List", () => {
  it("renders the basic example", () => {
    const { container } = render(<FileListBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<FileListBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
