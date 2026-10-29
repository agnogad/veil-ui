import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProgressBar } from "./index";

describe("ProgressBar", () => {
  it("re-exports Progress as ProgressBar", () => {
    render(<ProgressBar value={40} aria-label="Upload progress" />);
    const bar = screen.getByRole("progressbar", { name: "Upload progress" });
    expect(bar).toHaveAttribute("data-slot", "progress");
  });
});
