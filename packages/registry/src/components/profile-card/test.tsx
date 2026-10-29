import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ProfileCardBasic } from "./demo";

describe("Profile Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<ProfileCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProfileCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
