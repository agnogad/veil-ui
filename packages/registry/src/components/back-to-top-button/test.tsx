import { fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BackToTopButton } from "./index";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("BackToTopButton", () => {
  it("stays hidden until scrolled", () => {
    render(<BackToTopButton />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("can be controlled through the visible prop", () => {
    render(<BackToTopButton visible />);
    expect(
      screen.getByRole("button", { name: "Back to top" }),
    ).toBeInTheDocument();
  });

  it("scrolls to the top when pressed", () => {
    const scrollTo = vi.fn();
    vi.spyOn(window, "scrollTo").mockImplementation(scrollTo);
    const onScrollToTop = vi.fn();

    render(<BackToTopButton visible onScrollToTop={onScrollToTop} />);
    fireEvent.click(screen.getByRole("button", { name: "Back to top" }));

    expect(onScrollToTop).toHaveBeenCalledTimes(1);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BackToTopButton visible />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
