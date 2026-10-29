import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { SearchInput } from "./index";

describe("SearchInput", () => {
  it("renders a search field", () => {
    render(<SearchInput aria-label="Search" />);
    const input = screen.getByRole("searchbox", { name: "Search" });
    expect(input).toHaveAttribute("type", "search");
  });

  it("shows a clear button only when there is a value", async () => {
    render(<SearchInput aria-label="Search" defaultValue="button" />);
    expect(screen.getByRole("button", { name: "Clear search" })).toBeVisible();

    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).not.toBeInTheDocument();
  });

  it("calls onClear", async () => {
    const onClear = vi.fn();
    render(<SearchInput aria-label="Search" defaultValue="x" onClear={onClear} />);
    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SearchInput aria-label="Search" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
