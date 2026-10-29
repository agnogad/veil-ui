import type * as React from "react";

import { Grid } from "../grid/index";
import { GridItem } from "./index";

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border bg-muted/20 p-4 text-sm">{children}</div>
  );
}

export function GridItemBasic() {
  return (
    <Grid cols={12}>
      <GridItem colSpan={8}>
        <Tile>Main</Tile>
      </GridItem>
      <GridItem colSpan={4}>
        <Tile>Aside</Tile>
      </GridItem>
    </Grid>
  );
}

export function GridItemSpans() {
  return (
    <Grid cols={12}>
      <GridItem colSpan={12}>
        <Tile>Full width</Tile>
      </GridItem>
      <GridItem colSpan={6}>
        <Tile>Half</Tile>
      </GridItem>
      <GridItem colSpan={6}>
        <Tile>Half</Tile>
      </GridItem>
    </Grid>
  );
}

export function GridItemDashboard() {
  return (
    <Grid cols={12}>
      <GridItem colSpan={3} rowSpan={2}>
        <Tile>Sidebar</Tile>
      </GridItem>
      <GridItem colSpan={9}>
        <Tile>Header</Tile>
      </GridItem>
      <GridItem colSpan={9}>
        <Tile>Content</Tile>
      </GridItem>
    </Grid>
  );
}
