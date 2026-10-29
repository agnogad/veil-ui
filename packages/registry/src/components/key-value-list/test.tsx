import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { KeyValueListBasic } from "./demo";

describe("Key Value List", () => {
  it("renders the basic example", () => {
    const { container } = render(<KeyValueListBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<KeyValueListBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
