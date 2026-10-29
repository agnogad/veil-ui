import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { ShareButton } from "./index";

describe("ShareButton", () => {
  it("falls back to copying the url", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<ShareButton url="https://example.com/page" />);
    fireEvent.click(screen.getByRole("button", { name: "Share" }));

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith("https://example.com/page"),
    );
  });

  it("uses the native share sheet when available", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { share });

    render(<ShareButton title="Veil UI" url="https://veil-ui.dev" />);
    fireEvent.click(screen.getByRole("button", { name: "Share" }));

    await waitFor(() =>
      expect(share).toHaveBeenCalledWith({
        title: "Veil UI",
        text: undefined,
        url: "https://veil-ui.dev",
      }),
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ShareButton />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
