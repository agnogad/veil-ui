import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ProfileEditorBasic } from "./demo";

describe("Profile Editor", () => {
  it("renders the basic example", () => {
    const { container } = render(<ProfileEditorBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProfileEditorBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
