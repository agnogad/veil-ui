import type * as React from "react";

import { Stack } from "../stack/index";

type StackProps = React.ComponentProps<typeof Stack>;

type HStackProps = Omit<StackProps, "direction">;

function HStack({ align = "center", ...props }: HStackProps) {
  return <Stack data-slot="h-stack" direction="row" align={align} {...props} />;
}

export { HStack };
