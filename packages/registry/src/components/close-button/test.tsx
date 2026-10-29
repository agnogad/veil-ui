import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { CloseButton } from "./index";

describe("CloseButton", () => {
  it("is named Close by default", () => {
    render(<CloseButton />);
    const button = screen.getByRole("button", { name: "Close" });
    expect(button).toHaveAttribute("data-slot", "close-button");
  });

  it("accepts a custom label", () => {
    render(<CloseButton label="Dismiss banner" />);
    expect(
      screen.getByRole("button", { name: "Dismiss banner" }),
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CloseButton />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
