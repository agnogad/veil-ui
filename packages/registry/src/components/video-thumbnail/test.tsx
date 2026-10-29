import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { VideoThumbnailBasic } from "./demo";

describe("Video Thumbnail", () => {
  it("renders the basic example", () => {
    const { container } = render(<VideoThumbnailBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<VideoThumbnailBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
