"use client";

import { ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";

import { Button } from "../button/index";
import { ButtonGroup } from "./index";

export function ButtonGroupBasic() {
  return (
    <ButtonGroup aria-label="Pagination">
      <Button variant="outline">Previous</Button>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
  );
}

export function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Layout">
      <Button variant="outline" size="sm">
        Day
      </Button>
      <Button variant="outline" size="sm">
        Week
      </Button>
      <Button variant="outline" size="sm">
        Month
      </Button>
    </ButtonGroup>
  );
}

export function ButtonGroupWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ButtonGroup aria-label="View mode">
        <Button variant="outline" size="sm">
          <LayoutGrid /> Grid
        </Button>
        <Button variant="outline" size="sm">
          <List /> List
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Navigate">
        <Button variant="outline" size="icon" aria-label="Previous page">
          <ChevronLeft />
        </Button>
        <Button variant="outline" size="icon" aria-label="Next page">
          <ChevronRight />
        </Button>
      </ButtonGroup>
    </div>
  );
}
