import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { afterEach, describe, expect, it } from "vitest";

import { ThemeToggle } from "./index";

afterEach(() => {
  document.documentElement.classList.remove("dark");
  localStorage.clear();
});

describe("ThemeToggle", () => {
  it("switches the document to dark mode", async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", {
      name: "Switch to dark theme",
    });

    await userEvent.click(button);

    expect(document.documentElement).toHaveClass("dark");
    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(localStorage.getItem("veil-theme")).toBe("dark");
  });

  it("switches back to light mode", async () => {
    document.documentElement.classList.add("dark");
    render(<ThemeToggle />);

    await userEvent.click(
      screen.getByRole("button", { name: "Switch to light theme" }),
    );

    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("veil-theme")).toBe("light");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ThemeToggle />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
