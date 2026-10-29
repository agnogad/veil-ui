import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { EmojiPickerBasic } from "./demo";

describe("Emoji Picker", () => {
  it("renders the basic example", () => {
    const { container } = render(<EmojiPickerBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<EmojiPickerBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
