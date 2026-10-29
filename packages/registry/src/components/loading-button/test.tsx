import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { LoadingButton } from "./index";

describe("LoadingButton", () => {
  it("renders a normal button when idle", () => {
    render(<LoadingButton>Save</LoadingButton>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute("aria-busy", "false");
  });

  it("shows a spinner and disables while loading", () => {
    render(
      <LoadingButton loading loadingLabel="Saving">
        Save
      </LoadingButton>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Saving");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<LoadingButton>Save</LoadingButton>);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
