import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Slider } from "./index";

describe("Slider", () => {
  it("renders a labelled slider with its value", () => {
    render(<Slider defaultValue={[30]} aria-label="Volume" />);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAttribute("data-slot", "slider-thumb");
    expect(slider).toHaveAttribute("aria-valuenow", "30");
  });

  it("renders one thumb per value", () => {
    const { container } = render(
      <Slider defaultValue={[20, 80]} aria-label="Price range" />,
    );
    expect(
      container.querySelectorAll('[data-slot="slider-thumb"]'),
    ).toHaveLength(2);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Slider defaultValue={[30]} aria-label="Volume" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
