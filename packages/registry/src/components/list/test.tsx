import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { List, ListItem } from "./index";

describe("List", () => {
  it("renders an unordered list with disc markers", () => {
    render(
      <List>
        <ListItem>One</ListItem>
      </List>,
    );
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("list-disc");
    expect(screen.getByText("One")).toHaveAttribute("data-slot", "list-item");
  });

  it("renders ordered lists", () => {
    render(
      <List as="ol" variant="decimal">
        <ListItem>One</ListItem>
      </List>,
    );
    expect(screen.getByRole("list").tagName).toBe("OL");
    expect(screen.getByRole("list")).toHaveClass("list-decimal");
  });

  it("removes markers when unstyled", () => {
    render(
      <List variant="none">
        <ListItem>One</ListItem>
      </List>,
    );
    expect(screen.getByRole("list")).toHaveClass("list-none", "pl-0");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <List>
        <ListItem>One</ListItem>
        <ListItem>Two</ListItem>
      </List>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
