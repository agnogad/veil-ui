import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { SocialButton, SocialButtonGroup } from "./index";

describe("SocialButton", () => {
  it("renders a full-width outline button", () => {
    render(<SocialButton icon={<span aria-hidden>G</span>}>Continue</SocialButton>);
    const button = screen.getByRole("button", { name: "Continue" });
    expect(button).toHaveAttribute("data-slot", "social-button");
    expect(button).toHaveClass("w-full");
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<SocialButton onClick={onClick}>Continue</SocialButton>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("groups buttons", () => {
    render(
      <SocialButtonGroup data-testid="group">
        <SocialButton>One</SocialButton>
        <SocialButton>Two</SocialButton>
      </SocialButtonGroup>,
    );
    expect(screen.getByTestId("group")).toHaveClass("grid", "gap-2");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <SocialButtonGroup>
        <SocialButton icon={<span aria-hidden>G</span>}>
          Continue with GitHub
        </SocialButton>
        <SocialButton>Continue with email</SocialButton>
      </SocialButtonGroup>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
