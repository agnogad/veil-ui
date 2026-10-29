import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { UserCardBasic } from "./demo";

describe("User Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<UserCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<UserCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
