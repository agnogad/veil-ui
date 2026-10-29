import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CopyButton } from "./index";

const writeText = vi.fn<(text: string) => Promise<void>>();

beforeEach(() => {
  writeText.mockReset();
  writeText.mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
});

describe("CopyButton", () => {
  it("writes the value to the clipboard", async () => {
    render(<CopyButton value="npm install" />);

    await userEvent.click(screen.getByRole("button", { name: "Copy" }));

    expect(writeText).toHaveBeenCalledWith("npm install");
    expect(
      screen.getByRole("button", { name: "Copied" }),
    ).toBeInTheDocument();
  });

  it("uses custom labels", async () => {
    render(
      <CopyButton
        value="secret"
        label="Copy key"
        copiedLabel="Key copied"
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Copy key" }));
    expect(
      screen.getByRole("button", { name: "Key copied" }),
    ).toBeInTheDocument();
  });

  it("announces the result politely", async () => {
    render(<CopyButton value="x" />);
    await userEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(screen.getByText("Copied")).toHaveAttribute("aria-live", "polite");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CopyButton value="x" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
