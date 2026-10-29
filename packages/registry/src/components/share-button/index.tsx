"use client";

import { Check, Share2 } from "lucide-react";
import type * as React from "react";
import { useState } from "react";

import { Button } from "../button/index";

interface ShareButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
  /** Share sheet title. */
  title?: string;
  text?: string;
  /** URL to share; defaults to the current location. */
  url?: string;
  label?: string;
  copiedLabel?: string;
}

function ShareButton({
  title,
  text,
  url,
  label = "Share",
  copiedLabel = "Link copied",
  ...props
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareUrl = url ?? window.location.href;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch {
        return;
      }
    }

    await navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
  }

  return (
    <Button data-slot="share-button" onClick={handleShare} {...props}>
      {copied ? <Check aria-hidden /> : <Share2 aria-hidden />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </Button>
  );
}

export { ShareButton };
