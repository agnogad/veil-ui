import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { IconButton } from "./index";

describe("IconButton", () => {
  it("renders with an accessible name", () => {
    render(<IconButton aria-label="Add item">+</IconButton>);
    const button = screen.getByRole("button", { name: "Add item" });
    expect(button).toHaveAttribute("data-size", "default");
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(
      <IconButton aria-label="Add" onClick={onClick}>
        +
      </IconButton>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("supports asChild", () => {
    render(
      <IconButton asChild aria-label="Docs">
        <a href="/docs">D</a>
      </IconButton>,
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "data-slot",
      "icon-button",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<IconButton aria-label="Add">+</IconButton>);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
