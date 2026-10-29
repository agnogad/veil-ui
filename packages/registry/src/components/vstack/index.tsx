import type * as React from "react";

import { Stack } from "../stack/index";

type StackProps = React.ComponentProps<typeof Stack>;

type VStackProps = Omit<StackProps, "direction">;

function VStack(props: VStackProps) {
  return <Stack data-slot="v-stack" direction="column" {...props} />;
}

export { VStack };
