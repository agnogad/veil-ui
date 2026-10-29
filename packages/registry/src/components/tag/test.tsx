import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Tag } from "./index";

describe("Tag", () => {
  it("re-exports Badge as Tag", () => {
    render(<Tag variant="secondary">Beta</Tag>);
    const tag = screen.getByText("Beta");
    expect(tag).toHaveAttribute("data-slot", "badge");
    expect(tag).toHaveAttribute("data-variant", "secondary");
  });
});
