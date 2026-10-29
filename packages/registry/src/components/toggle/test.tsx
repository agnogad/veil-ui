import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Toggle } from "./index";

describe("Toggle", () => {
  it("starts unpressed", () => {
    render(<Toggle aria-label="Bookmark">B</Toggle>);
    expect(screen.getByRole("button", { name: "Bookmark" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("toggles on click", async () => {
    render(<Toggle aria-label="Bookmark">B</Toggle>);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("respects the pressed prop", () => {
    render(
      <Toggle pressed aria-label="Bookmark">
        B
      </Toggle>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Toggle aria-label="Bookmark">B</Toggle>);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
