"use client";

import { Copy, Plus, Trash2 } from "lucide-react";

import { Button } from "../button/index";
import { Kbd } from "../kbd/index";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./index";

export function TooltipBasic() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Add this component to your project</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function TooltipSides() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-2">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm" className="capitalize">
                {side}
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

export function TooltipWithKbd() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Copy">
              <Copy />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="flex items-center gap-2">
            Copy <Kbd>⌘C</Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" aria-label="New project">
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>New project</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" aria-label="Delete">
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete project</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
