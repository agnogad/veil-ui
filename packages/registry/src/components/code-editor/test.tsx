import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { CodeEditor } from "./index";

describe("CodeEditor", () => {
  it("renders the language and line count", () => {
    render(<CodeEditor language="ts" defaultValue={"a\nb\nc"} />);

    expect(screen.getByText("ts")).toBeInTheDocument();
    expect(screen.getByText(/3 lines/)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Code editor" })).toHaveValue(
      "a\nb\nc",
    );
  });

  it("reports typed content", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<CodeEditor onValueChange={onValueChange} />);

    await user.type(
      screen.getByRole("textbox", { name: "Code editor" }),
      "const x = 1;",
    );

    expect(onValueChange).toHaveBeenLastCalledWith("const x = 1;");
  });

  it("inserts two spaces for Tab", async () => {
    const user = userEvent.setup();
    render(<CodeEditor defaultValue="ab" />);

    const area = screen.getByRole("textbox", {
      name: "Code editor",
    }) as HTMLTextAreaElement;
    await user.click(area);
    area.setSelectionRange(1, 1);
    await user.keyboard("{Tab}");

    expect(area).toHaveValue("a  b");
  });

  it("can be read-only", () => {
    render(<CodeEditor readOnly defaultValue="locked" />);
    expect(screen.getByRole("textbox", { name: "Code editor" })).toHaveAttribute(
      "readonly",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CodeEditor defaultValue={"a\nb"} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
