import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./index";

function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

describe("Breadcrumb", () => {
  it("renders a labeled navigation landmark", () => {
    render(<Example />);
    expect(
      screen.getByRole("navigation", { name: "breadcrumb" }),
    ).toBeInTheDocument();
  });

  it("marks the current page", () => {
    render(<Example />);
    expect(screen.getByText("Components")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("renders links", () => {
    render(<Example />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
