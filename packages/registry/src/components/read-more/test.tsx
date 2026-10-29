import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ReadMore } from "./index";

describe("ReadMore", () => {
  it("clamps content until expanded", async () => {
    const { container } = render(
      <ReadMore lines={2}>Long article content</ReadMore>,
    );
    const toggle = screen.getByRole("button", { name: "Read more" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(container.querySelector(".line-clamp-2")).not.toBeNull();

    await userEvent.click(toggle);

    expect(
      screen.getByRole("button", { name: "Show less" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(container.querySelector(".line-clamp-2")).toBeNull();
  });

  it("starts expanded when defaultExpanded is set", () => {
    render(
      <ReadMore defaultExpanded>Visible content</ReadMore>,
    );
    expect(
      screen.getByRole("button", { name: "Show less" }),
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ReadMore lines={2}>Preview text for the article.</ReadMore>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
