import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { SplitButton } from "./index";

const items = [
  { label: "Deploy to production", onSelect: () => {} },
  { label: "Deploy to preview", onSelect: () => {} },
];

describe("SplitButton", () => {
  it("runs the primary action", async () => {
    const onClick = vi.fn();
    render(<SplitButton label="Deploy" onClick={onClick} items={items} />);

    await userEvent.click(screen.getByRole("button", { name: "Deploy" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("opens the menu and selects an item", async () => {
    const onSelect = vi.fn();
    render(
      <SplitButton
        label="Deploy"
        items={[{ label: "Deploy to preview", onSelect }]}
      />,
    );

    const trigger = screen.getByRole("button", {
      name: "More Deploy options",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu", { name: "Deploy options" })).toBeVisible();

    await userEvent.click(
      screen.getByRole("menuitem", { name: "Deploy to preview" }),
    );
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    render(<SplitButton label="Deploy" items={items} />);
    const trigger = screen.getByRole("button", {
      name: "More Deploy options",
    });

    await userEvent.click(trigger);
    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SplitButton label="Deploy" items={items} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
