import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { TruncatedText } from "./index";

describe("TruncatedText", () => {
  it("clamps to two lines by default", () => {
    render(<TruncatedText>Long content</TruncatedText>);
    const text = screen.getByText("Long content");
    expect(text).toHaveClass("line-clamp-2");
    expect(text).toHaveAttribute("data-lines", "2");
  });

  it("supports custom line counts", () => {
    render(<TruncatedText lines={4}>Long content</TruncatedText>);
    expect(screen.getByText("Long content")).toHaveClass("line-clamp-4");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <TruncatedText lines={3}>Some preview text</TruncatedText>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
