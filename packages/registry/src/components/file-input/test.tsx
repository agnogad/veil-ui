import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { FileInput } from "./index";

describe("FileInput", () => {
  it("lists the selected file", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    render(
      <FileInput label="Upload document" onFilesChange={onFilesChange} />,
    );

    const file = new File(["hello"], "notes.txt", { type: "text/plain" });
    await user.upload(screen.getByLabelText("Upload document"), file);

    expect(onFilesChange).toHaveBeenCalledTimes(1);
    expect(screen.getByText("notes.txt")).toBeInTheDocument();
  });

  it("clears the selection", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    render(
      <FileInput label="Upload document" onFilesChange={onFilesChange} />,
    );

    const file = new File(["hello"], "notes.txt", { type: "text/plain" });
    await user.upload(screen.getByLabelText("Upload document"), file);
    await user.click(screen.getByRole("button", { name: /clear selection/i }));

    expect(onFilesChange).toHaveBeenLastCalledWith(null);
    expect(screen.queryByText("notes.txt")).not.toBeInTheDocument();
  });

  it("links the error message to the input", () => {
    render(<FileInput label="Avatar" error="File is too large" />);
    expect(screen.getByLabelText("Avatar")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("alert")).toHaveTextContent("File is too large");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FileInput label="Resume" hint="PDF only" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
