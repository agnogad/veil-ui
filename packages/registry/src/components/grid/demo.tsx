"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../card/index";
import { Grid } from "./index";

function Tile({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{body}</CardContent>
    </Card>
  );
}

export function GridBasic() {
  return (
    <Grid cols={3} className="w-full">
      <Tile title="Tokens" body="Colors, radius and typography." />
      <Tile title="Components" body="Accessible building blocks." />
      <Tile title="Blocks" body="Composed page sections." />
    </Grid>
  );
}

export function GridTwoColumns() {
  return (
    <Grid cols={2} gap="lg" className="w-full">
      <Tile title="Preview" body="Live component examples." />
      <Tile title="Code" body="The exact source that ships." />
    </Grid>
  );
}

export function GridDashboard() {
  return (
    <Grid cols={4} gap="sm" className="w-full">
      {["Requests", "Errors", "Latency", "Uptime"].map((label) => (
        <div key={label} className="rounded-md border p-3">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 text-lg font-semibold tracking-tight">99.9%</p>
        </div>
      ))}
    </Grid>
  );
}
