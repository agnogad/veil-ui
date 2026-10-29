import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { CodeBlock } from "./index";

describe("CodeBlock", () => {
  it("renders the code and language label", () => {
    render(<CodeBlock code="const x = 1;" language="ts" />);
    expect(screen.getByText("ts")).toBeInTheDocument();
    expect(screen.getByText("const x = 1;")).toBeInTheDocument();
  });

  it("copies the code to the clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<CodeBlock code="copy me" />);
    await userEvent.click(screen.getByRole("button", { name: "Copy code" }));

    expect(writeText).toHaveBeenCalledWith("copy me");
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Copied" }),
      ).toBeInTheDocument(),
    );
  });

  it("renders line numbers when requested", () => {
    const { container } = render(
      <CodeBlock code={"a\nb"} showLineNumbers />,
    );
    expect(container.querySelectorAll("pre [aria-hidden='true']")).toHaveLength(
      2,
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CodeBlock code="npm install" filename="terminal" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
