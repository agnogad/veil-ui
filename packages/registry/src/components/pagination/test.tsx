import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./index";

describe("Pagination", () => {
  it("marks the current page", () => {
    render(<Pagination page={5} totalPages={20} />);
    expect(
      screen.getByRole("button", { name: "Go to page 5" }),
    ).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Previous page" })).toBeEnabled();
  });

  it("calls onPageChange for a page button", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={5} totalPages={20} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Go to page 6" }));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("disables previous on the first page", () => {
    render(<Pagination page={1} totalPages={3} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Pagination page={5} totalPages={20} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
