import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Alert, AlertDescription, AlertTitle } from "./index";

describe("Alert", () => {
  it("renders an alert with a title and description", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something important.</AlertDescription>
      </Alert>,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-variant", "default");
    expect(screen.getByText("Heads up")).toHaveAttribute(
      "data-slot",
      "alert-title",
    );
    expect(screen.getByText("Something important.")).toHaveAttribute(
      "data-slot",
      "alert-description",
    );
  });

  it("supports the destructive variant", () => {
    render(<Alert variant="destructive">Failed</Alert>);
    expect(screen.getByRole("alert")).toHaveAttribute(
      "data-variant",
      "destructive",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something important.</AlertDescription>
      </Alert>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
