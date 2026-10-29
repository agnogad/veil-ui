import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Logo } from "./index";

describe("Logo", () => {
  it("renders the name and mark", () => {
    const { container } = render(
      <Logo name="Veil UI" mark={<span data-testid="mark">V</span>} />,
    );
    expect(screen.getByText("Veil UI")).toHaveAttribute("data-slot", "logo-name");
    expect(screen.getByTestId("mark")).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="logo-mark"]'),
    ).toBeInTheDocument();
  });

  it("wraps the lockup in a link when href is set", () => {
    render(<Logo name="Veil UI" href="/" />);
    expect(screen.getByRole("link", { name: "Veil UI" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Logo name="Veil UI" href="/" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
