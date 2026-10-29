import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { AvatarGroupBasic } from "./demo";

describe("Avatar Group", () => {
  it("renders the basic example", () => {
    const { container } = render(<AvatarGroupBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AvatarGroupBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
