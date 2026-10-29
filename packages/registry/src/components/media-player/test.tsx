import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MediaPlayerBasic } from "./demo";

describe("Media Player", () => {
  it("renders the basic example", () => {
    const { container } = render(<MediaPlayerBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MediaPlayerBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
