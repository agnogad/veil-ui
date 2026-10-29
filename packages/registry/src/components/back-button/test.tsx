import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { BackButton } from "./index";

describe("BackButton", () => {
  it("returns through history by default", async () => {
    const back = vi.spyOn(window.history, "back").mockImplementation(() => {});
    render(<BackButton />);

    await userEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(back).toHaveBeenCalledTimes(1);
  });

  it("prefers a custom click handler", async () => {
    const onClick = vi.fn();
    render(<BackButton onClick={onClick} label="Return" />);

    await userEvent.click(screen.getByRole("button", { name: "Return" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BackButton fallbackHref="#top" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
