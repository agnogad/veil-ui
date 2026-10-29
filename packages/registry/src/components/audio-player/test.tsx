import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { AudioPlayerBasic } from "./demo";

describe("Audio Player", () => {
  it("renders the basic example", () => {
    const { container } = render(<AudioPlayerBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AudioPlayerBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
