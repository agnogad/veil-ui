import { X } from "lucide-react";

import { IconButton, type IconButtonProps } from "../icon-button/index";

interface CloseButtonProps
  extends Omit<IconButtonProps, "aria-label" | "children"> {
  label?: string;
}

function CloseButton({ label = "Close", ...props }: CloseButtonProps) {
  return (
    <IconButton data-slot="close-button" aria-label={label} {...props}>
      <X aria-hidden />
    </IconButton>
  );
}

export { CloseButton };
