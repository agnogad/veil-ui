import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { DownloadButton } from "./index";

describe("DownloadButton", () => {
  it("renders a download link", () => {
    render(<DownloadButton href="/files/report.pdf">Report</DownloadButton>);
    const link = screen.getByRole("link", { name: "Report" });
    expect(link).toHaveAttribute("href", "/files/report.pdf");
    expect(link).toHaveAttribute("download");
    expect(link).toHaveAttribute("data-slot", "download-button");
  });

  it("accepts a suggested file name", () => {
    render(
      <DownloadButton href="/export.csv" download="export.csv">
        Export
      </DownloadButton>,
    );
    expect(screen.getByRole("link", { name: "Export" })).toHaveAttribute(
      "download",
      "export.csv",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <DownloadButton href="/files/report.pdf" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
