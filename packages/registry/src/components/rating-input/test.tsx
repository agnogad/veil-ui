import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { RatingInput } from "./index";

describe("RatingInput", () => {
  it("selects a rating on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RatingInput onValueChange={onValueChange} />);

    await user.click(screen.getByRole("radio", { name: "3 stars" }));

    expect(onValueChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole("radio", { name: "3 stars" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("clears when the selected star is clicked again", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RatingInput defaultValue={4} onValueChange={onValueChange} />);

    await user.click(screen.getByRole("radio", { name: "4 stars" }));

    expect(onValueChange).toHaveBeenCalledWith(0);
  });

  it("moves the selection with the keyboard", async () => {
    const user = userEvent.setup();
    render(<RatingInput defaultValue={3} />);

    screen.getByRole("radio", { name: "3 stars" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("radio", { name: "4 stars" })).toHaveAttribute(
      "aria-checked",
      "true",
    );

    await user.keyboard("{Home}");
    expect(screen.getByRole("radio", { name: "1 star" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("does not change in read-only mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RatingInput defaultValue={2} readOnly onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("radio", { name: "5 stars" }));

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole("radio", { name: "2 stars" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<RatingInput defaultValue={3} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
