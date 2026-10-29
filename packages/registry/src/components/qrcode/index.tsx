import QRCode from "react-qr-code";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface QRCodeCardProps extends React.ComponentProps<"figure"> {
  value: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  label?: string;
  caption?: React.ReactNode;
  bgColor?: string;
  fgColor?: string;
}

function QRCodeCard({
  className,
  value,
  size = 160,
  level = "M",
  label,
  caption,
  bgColor = "#ffffff",
  fgColor = "#000000",
  ...props
}: QRCodeCardProps) {
  return (
    <figure
      data-slot="qrcode"
      className={cn("flex w-fit flex-col items-center gap-2", className)}
      {...props}
    >
      <div
        role="img"
        aria-label={label ?? `QR code for ${value}`}
        className="w-fit rounded-lg bg-white p-3 shadow-sm"
      >
        <QRCode
          value={value}
          size={size}
          level={level}
          bgColor={bgColor}
          fgColor={fgColor}
        />
      </div>
      {caption ? (
        <figcaption className="max-w-[16rem] text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export { QRCodeCard as QRCode };
