import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { Fab } from "./index";

describe("Fab", () => {
  it("renders a fixed icon button", () => {
    render(<Fab aria-label="Create">+</Fab>);
    const button = screen.getByRole("button", { name: "Create" });
    expect(button).toHaveClass("fixed", "size-12", "rounded-full");
    expect(button).toHaveAttribute("type", "button");
  });

  it("supports an extended label", () => {
    render(
      <Fab label="New project" aria-label="New project">
        +
      </Fab>,
    );
    expect(screen.getByText("New project")).toBeInTheDocument();
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(
      <Fab aria-label="Create" onClick={onClick}>
        +
      </Fab>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Fab aria-label="Create">+</Fab>);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
