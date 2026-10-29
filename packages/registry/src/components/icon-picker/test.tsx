import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { IconPicker } from "./index";

describe("IconPicker", () => {
  it("renders the default icon grid", () => {
    render(<IconPicker />);
    expect(screen.getByRole("button", { name: "Star" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Trash" })).toBeInTheDocument();
  });

  it("filters icons by name", async () => {
    render(<IconPicker />);
    await userEvent.type(
      screen.getByRole("searchbox", { name: "Search icons" }),
      "set",
    );
    expect(
      screen.getByRole("button", { name: "Settings" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Star" })).toBeNull();
  });

  it("reports selections", async () => {
    const onSelect = vi.fn();
    render(<IconPicker onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("button", { name: "Heart" }));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Heart" }),
    );
  });

  it("shows a selected state", () => {
    render(<IconPicker value="Star" />);
    expect(screen.getByRole("button", { name: "Star" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<IconPicker />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
