import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Chip } from "./index";

describe("Chip", () => {
  it("re-exports Badge as Chip", () => {
    render(<Chip variant="muted">React</Chip>);
    const chip = screen.getByText("React");
    expect(chip).toHaveAttribute("data-slot", "badge");
    expect(chip).toHaveAttribute("data-variant", "muted");
  });
});
