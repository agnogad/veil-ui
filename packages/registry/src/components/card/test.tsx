import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./index";

describe("Card", () => {
  it("renders all slots", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Title")).toHaveAttribute("data-slot", "card-title");
    expect(screen.getByText("Description")).toHaveAttribute(
      "data-slot",
      "card-description",
    );
    expect(screen.getByText("Content")).toHaveAttribute(
      "data-slot",
      "card-content",
    );
    expect(screen.getByText("Footer")).toHaveAttribute(
      "data-slot",
      "card-footer",
    );
  });

  it("forwards native props", () => {
    render(<Card aria-label="Stats" data-testid="card" />);
    expect(screen.getByTestId("card")).toHaveAttribute("aria-label", "Stats");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Deployment settings</CardTitle>
          <CardDescription>Configure your project.</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    );

    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
