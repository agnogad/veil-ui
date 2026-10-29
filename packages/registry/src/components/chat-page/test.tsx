import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ChatPageBasic } from "./demo";

describe("Chat Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<ChatPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ChatPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
