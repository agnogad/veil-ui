import { Download } from "lucide-react";
import type * as React from "react";

import { Button, type ButtonProps } from "../button/index";

interface DownloadButtonProps
  extends Omit<React.ComponentProps<"a">, "color">,
    Pick<ButtonProps, "variant" | "size"> {
  label?: string;
}

function DownloadButton({
  className,
  label = "Download",
  children,
  variant,
  size,
  ...props
}: DownloadButtonProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      data-slot="download-button"
      className={className}
    >
      <a {...props} download={props.download ?? ""}>
        <Download aria-hidden />
        {children ?? label}
      </a>
    </Button>
  );
}

export { DownloadButton };
