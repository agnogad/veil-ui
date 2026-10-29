import { fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { RichText } from "./index";

describe("RichText", () => {
  it("renders a labelled editor with a formatting toolbar", () => {
    render(<RichText />);
    expect(screen.getByRole("toolbar", { name: "Text formatting" })).toBeInTheDocument();
    const editor = screen.getByRole("textbox", { name: "Rich text editor" });
    expect(editor).toHaveAttribute("contenteditable", "true");
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Italic" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Underline" })).toBeInTheDocument();
  });

  it("reports html changes", () => {
    const onChange = vi.fn();
    render(<RichText onChange={onChange} />);
    const editor = screen.getByRole("textbox", { name: "Rich text editor" });
    editor.textContent = "Hello";
    fireEvent.input(editor);
    expect(onChange).toHaveBeenCalledWith("Hello");
  });

  it("disables editing when disabled", () => {
    render(<RichText disabled />);
    expect(
      screen.getByRole("textbox", { name: "Rich text editor" }),
    ).toHaveAttribute("contenteditable", "false");
    expect(screen.getByRole("button", { name: "Bold" })).toBeDisabled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<RichText defaultValue="<p>Content</p>" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
