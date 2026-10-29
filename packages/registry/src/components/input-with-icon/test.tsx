import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { Mail } from "lucide-react";
import { describe, expect, it } from "vitest";

import { InputWithIcon } from "./index";

describe("InputWithIcon", () => {
  it("renders a labelled input with extra padding", () => {
    render(
      <InputWithIcon icon={Mail} aria-label="Email" placeholder="Email" />,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveClass("pl-9");
    expect(input.closest('[data-slot="input-with-icon"]')).not.toBeNull();
  });

  it("supports a trailing icon", () => {
    render(<InputWithIcon icon={Mail} position="right" aria-label="Email" />);
    expect(screen.getByRole("textbox")).toHaveClass("pr-9");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <InputWithIcon icon={Mail} aria-label="Email" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
