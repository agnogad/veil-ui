import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Input } from "./index";

describe("Input", () => {
  it("renders and accepts text", async () => {
    render(<Input placeholder="Email" aria-label="Email" />);

    const input = screen.getByRole("textbox", { name: "Email" });
    await userEvent.type(input, "hi@veil.dev");
    expect(input).toHaveValue("hi@veil.dev");
  });

  it("exposes the invalid state", () => {
    render(<Input aria-label="Email" aria-invalid />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not accept input when disabled", async () => {
    render(<Input aria-label="Email" disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    await userEvent.type(input, "x");
    expect(input).toHaveValue("");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <label htmlFor="email">Email</label>
        <Input id="email" placeholder="you@example.com" />
      </>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
