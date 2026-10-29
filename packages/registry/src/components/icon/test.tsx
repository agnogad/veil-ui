import { render, screen } from "@testing-library/react";
import { ArrowRight } from "lucide-react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Icon } from "./index";

describe("Icon", () => {
  it("is decorative by default", () => {
    const { container } = render(<Icon icon={ArrowRight} />);
    const icon = container.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveAttribute("data-slot", "icon");
  });

  it("exposes a label when provided", () => {
    render(<Icon icon={ArrowRight} label="Next" />);
    expect(screen.getByRole("img", { name: "Next" })).toBeInTheDocument();
  });

  it("applies size presets", () => {
    const { container } = render(<Icon icon={ArrowRight} size="lg" />);
    expect(container.querySelector("svg")).toHaveClass("size-6");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Icon icon={ArrowRight} label="Continue" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
