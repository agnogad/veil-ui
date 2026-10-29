import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { PasswordInput } from "./index";

describe("PasswordInput", () => {
  it("renders a password field", () => {
    render(<PasswordInput aria-label="Password" />);
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
  });

  it("reveals the password", async () => {
    render(<PasswordInput aria-label="Password" defaultValue="secret" />);
    const field = screen.getByLabelText("Password");

    await userEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(field).toHaveAttribute("type", "text");

    await userEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(field).toHaveAttribute("type", "password");
  });

  it("exposes the pressed state", async () => {
    render(<PasswordInput aria-label="Password" />);
    const button = screen.getByRole("button", { name: "Show password" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <label htmlFor="password">Password</label>
        <PasswordInput id="password" />
      </>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
