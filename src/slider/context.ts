import * as React from "react";
import type { SliderContextValue } from "./types";

export const SliderContext = React.createContext<SliderContextValue | null>(null);

export function useSliderContext() {
  const ctx = React.useContext(SliderContext);
  if (!ctx) {
    throw new Error("Slider components must be used within a Slider.Root");
  }
  return ctx;
}
