import * as React from "react";
import type { PopoverContextValue } from "./types";

export const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export function usePopoverContext() {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) {
    throw new Error("Popover components must be used within a Popover.Root");
  }
  return ctx;
}
