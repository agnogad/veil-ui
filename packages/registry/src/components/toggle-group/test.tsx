import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ToggleGroup, ToggleGroupItem } from "./index";

function Single() {
  return (
    <ToggleGroup type="single" defaultValue="left" aria-label="Alignment">
      <ToggleGroupItem value="left" aria-label="Left">
        L
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right">
        R
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

describe("ToggleGroup", () => {
  it("marks the default item as pressed", () => {
    render(<Single />);
    expect(screen.getByRole("radio", { name: "Left" })).toHaveAttribute(
      "data-state",
      "on",
    );
  });

  it("switches selection in single mode", async () => {
    render(<Single />);
    await userEvent.click(screen.getByRole("radio", { name: "Right" }));
    expect(screen.getByRole("radio", { name: "Right" })).toHaveAttribute(
      "data-state",
      "on",
    );
    expect(screen.getByRole("radio", { name: "Left" })).toHaveAttribute(
      "data-state",
      "off",
    );
  });

  it("renders a labeled group", () => {
    render(<Single />);
    expect(screen.getByRole("radiogroup", { name: "Alignment" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Single />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
