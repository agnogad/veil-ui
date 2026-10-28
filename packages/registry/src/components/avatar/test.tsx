import { render, screen, waitFor } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Avatar, AvatarFallback, AvatarImage } from "./index";

describe("Avatar", () => {
  it("renders the fallback when no image is available", async () => {
    render(
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>,
    );

    await waitFor(() => {
      expect(screen.getByText("AL")).toBeInTheDocument();
    });
  });

  it("applies the size variant", () => {
    render(
      <Avatar size="lg" data-testid="avatar">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "lg");
  });

  it("shows the fallback while the image loads", () => {
    render(
      <Avatar>
        <AvatarImage src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="Ada" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
