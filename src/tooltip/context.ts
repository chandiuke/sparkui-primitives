import * as React from "react";
import type { TooltipContextValue } from "./types";

export const TooltipContext = React.createContext<TooltipContextValue | null>(null);

export function useTooltipContext() {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) {
    throw new Error("Tooltip components must be used within a Tooltip.Root");
  }
  return ctx;
}
