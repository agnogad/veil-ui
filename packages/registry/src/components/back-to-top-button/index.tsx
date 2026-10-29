"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "../button/index";

interface BackToTopButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
  /** Scroll distance in pixels before the button appears. */
  threshold?: number;
  label?: string;
  /** Control visibility yourself instead of tracking window scroll. */
  visible?: boolean;
  onScrollToTop?: () => void;
}

function BackToTopButton({
  threshold = 400,
  label = "Back to top",
  visible,
  onScrollToTop,
  ...props
}: BackToTopButtonProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (visible !== undefined) return;

    const handleScroll = () => setScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, visible]);

  const shown = visible ?? scrolled;
  if (!shown) return null;

  return (
    <Button
      data-slot="back-to-top-button"
      aria-label={label}
      onClick={() => {
        onScrollToTop?.();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      {...props}
    >
      <ArrowUp aria-hidden />
    </Button>
  );
}

export { BackToTopButton };
