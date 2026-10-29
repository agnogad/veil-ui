import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Button } from "../button/index";
import { Lightbox, type LightboxImage } from "./index";

const pixel =
  "data:image/gif;base64,R0lGODlhAQABAAAAACw=";

const images: LightboxImage[] = [
  { src: pixel, alt: "First image" },
  { src: pixel, alt: "Second image" },
];

function Example() {
  return (
    <Lightbox
      images={images}
      trigger={<Button>Open gallery</Button>}
    />
  );
}

describe("Lightbox", () => {
  it("opens and navigates", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Open gallery" }));

    expect(
      screen.getByRole("dialog", { name: "Image viewer" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("First image")).toBeInTheDocument();
    expect(screen.getByText("1 / 2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next image" }));
    expect(screen.getByAltText("Second image")).toBeInTheDocument();
    expect(screen.getByText("2 / 2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next image" }));
    expect(screen.getByAltText("First image")).toBeInTheDocument();
  });

  it("closes with the close button and Escape", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Open gallery" }));
    await user.click(screen.getByRole("button", { name: "Close lightbox" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open gallery" }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Open gallery" }));

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
