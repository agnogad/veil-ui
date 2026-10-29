import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { ActionMenuButton } from "./index";

describe("ActionMenuButton", () => {
  it("opens a menu with the provided actions", async () => {
    const user = userEvent.setup();
    render(<ActionMenuButton items={[{ label: "Edit" }, { label: "Delete" }]} />);

    await user.click(screen.getByRole("button", { name: "Open actions" }));

    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Delete" })).toBeInTheDocument();
  });

  it("calls onSelect and closes the menu", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ActionMenuButton items={[{ label: "Edit", onSelect }]} />);

    await user.click(screen.getByRole("button", { name: "Open actions" }));
    await user.click(await screen.findByRole("menuitem", { name: "Edit" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ActionMenuButton items={[{ label: "Edit" }]} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
