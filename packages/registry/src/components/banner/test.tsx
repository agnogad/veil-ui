import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { Banner, BannerClose, BannerDescription, BannerTitle } from "./index";

describe("Banner", () => {
  it("renders as a status region", () => {
    render(
      <Banner>
        <BannerTitle>Heads up</BannerTitle>
        <BannerDescription>Something changed.</BannerDescription>
      </Banner>,
    );
    expect(screen.getByRole("status")).toHaveAttribute("data-slot", "banner");
  });

  it("supports alert and destructive variants", () => {
    render(
      <Banner role="alert" variant="destructive">
        Failed
      </Banner>,
    );
    const banner = screen.getByRole("alert");
    expect(banner).toHaveAttribute("data-variant", "destructive");
  });

  it("dismisses", async () => {
    const onDismiss = vi.fn();
    render(
      <Banner>
        Message
        <BannerClose onClick={onDismiss} />
      </Banner>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Dismiss banner" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Banner>
        <BannerTitle>Update available</BannerTitle>
        <BannerDescription>Reload to apply it.</BannerDescription>
      </Banner>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
