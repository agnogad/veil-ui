import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { UploadButton } from "./index";

describe("UploadButton", () => {
  it("opens the hidden file input", () => {
    const click = vi
      .spyOn(HTMLInputElement.prototype, "click")
      .mockImplementation(() => {});
    const { container } = render(<UploadButton />);

    fireEvent.click(screen.getByRole("button", { name: "Upload" }));

    expect(click).toHaveBeenCalledTimes(1);
    expect(container.querySelector("input[type=file]")).toBeInTheDocument();
  });

  it("reports selected files", async () => {
    const onFiles = vi.fn();
    const { container } = render(<UploadButton onFiles={onFiles} />);
    const input = container.querySelector("input[type=file]") as HTMLInputElement;
    const file = new File(["hello"], "hello.txt", { type: "text/plain" });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(onFiles).toHaveBeenCalledTimes(1));
    const files = onFiles.mock.calls[0]?.[0] as File[];
    expect(files[0]).toBe(file);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<UploadButton />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
