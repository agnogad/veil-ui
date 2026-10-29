import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RangeSlider } from "./index";

describe("RangeSlider", () => {
  it("renders two thumbs with their values", () => {
    render(<RangeSlider defaultValue={[20, 80]} aria-label="Price range" />);
    const thumbs = screen.getAllByRole("slider");
    expect(thumbs).toHaveLength(2);
    expect(thumbs[0]).toHaveAttribute("aria-valuenow", "20");
    expect(thumbs[1]).toHaveAttribute("aria-valuenow", "80");
  });
});
