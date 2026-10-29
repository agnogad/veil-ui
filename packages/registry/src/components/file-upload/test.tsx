import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { FileUpload } from "./index";

function fileInput(container: HTMLElement) {
  return container.querySelector<HTMLInputElement>('input[type="file"]')!;
}

describe("FileUpload", () => {
  it("lists picked files and uploads them", async () => {
    const user = userEvent.setup();
    const onUpload = vi.fn();
    const { container } = render(<FileUpload onUpload={onUpload} />);

    const file = new File(["hello world"], "notes.txt", {
      type: "text/plain",
    });
    await user.upload(fileInput(container), file);

    expect(screen.getByText("notes.txt")).toBeInTheDocument();
    expect(screen.getByText("1 file ready")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Upload 1 file" }));

    expect(onUpload).toHaveBeenCalledTimes(1);
    expect(onUpload.mock.calls[0]![0][0].name).toBe("notes.txt");
  });

  it("removes a file from the list", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUpload onFilesChange={onFilesChange} />,
    );

    await user.upload(
      fileInput(container),
      new File(["hello"], "notes.txt", { type: "text/plain" }),
    );
    await user.click(screen.getByRole("button", { name: "Remove notes.txt" }));

    expect(screen.queryByText("notes.txt")).not.toBeInTheDocument();
    expect(onFilesChange).toHaveBeenLastCalledWith([]);
  });

  it("rejects files above the size limit", async () => {
    const user = userEvent.setup();
    const { container } = render(<FileUpload maxSize={4} />);

    await user.upload(
      fileInput(container),
      new File(["this content is too large"], "big.txt", {
        type: "text/plain",
      }),
    );

    expect(screen.getByRole("alert")).toHaveTextContent(/skipped/i);
    expect(screen.queryByText("big.txt")).not.toBeInTheDocument();
  });

  it("keeps only the allowed number of files", async () => {
    const user = userEvent.setup();
    const { container } = render(<FileUpload maxFiles={1} />);

    await user.upload(fileInput(container), [
      new File(["a"], "one.txt", { type: "text/plain" }),
      new File(["b"], "two.txt", { type: "text/plain" }),
    ]);

    expect(screen.getByText("one.txt")).toBeInTheDocument();
    expect(screen.queryByText("two.txt")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(/first 1 files/i);
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    const { container } = render(<FileUpload />);
    await user.upload(
      fileInput(container),
      new File(["hello"], "notes.txt", { type: "text/plain" }),
    );

    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
