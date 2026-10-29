import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { AspectRatio } from "./index";

describe("AspectRatio", () => {
  it("defaults to 16 / 9", () => {
    render(<AspectRatio data-testid="ratio" />);
    expect(screen.getByTestId("ratio").style.aspectRatio).toBe(
      String(16 / 9),
    );
  });

  it("accepts a custom ratio", () => {
    render(<AspectRatio ratio={1} data-testid="ratio" />);
    expect(screen.getByTestId("ratio").style.aspectRatio).toBe("1");
  });

  it("merges custom styles", () => {
    render(<AspectRatio ratio={4 / 3} style={{ maxWidth: 320 }} data-testid="ratio" />);
    const element = screen.getByTestId("ratio");
    expect(element.style.aspectRatio).toBe(String(4 / 3));
    expect(element.style.maxWidth).toBe("320px");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AspectRatio>
        <p>Media</p>
      </AspectRatio>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
