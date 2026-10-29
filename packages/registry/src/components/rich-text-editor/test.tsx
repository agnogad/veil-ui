import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { RichTextEditor } from "./index";

describe("RichTextEditor", () => {
  it("renders the editor with the toolbar", () => {
    render(<RichTextEditor defaultValue="<p>Hello</p>" />);

    expect(
      screen.getByRole("textbox", { name: "Rich text editor" }),
    ).toHaveAttribute("contenteditable", "true");
    expect(
      screen.getByRole("toolbar", { name: "Text formatting" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<RichTextEditor defaultValue="<p>Hello</p>" disabled />);
    expect(
      screen.getByRole("textbox", { name: "Rich text editor" }),
    ).toHaveAttribute("contenteditable", "false");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<RichTextEditor defaultValue="<p>Hello</p>" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
