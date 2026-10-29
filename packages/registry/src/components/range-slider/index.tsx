"use client";

import type * as React from "react";

import { Slider } from "../slider/index";

function RangeSlider(props: React.ComponentProps<typeof Slider>) {
  return <Slider minStepsBetweenThumbs={1} {...props} />;
}

export { RangeSlider };
