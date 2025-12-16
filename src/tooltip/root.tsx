import * as React from "react";
import { TooltipContext } from "./context";
import type { TooltipRootProps } from "./types";

let tooltipIdCounter = 0;

export function Root({ children, open: controlledOpen, defaultOpen = false, onOpenChange, delayDuration = 700 }: TooltipRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const [ids] = React.useState(() => {
    const id = ++tooltipIdCounter;
    return {
      triggerId: `tooltip-trigger-${id}`,
      contentId: `tooltip-content-${id}`,
    };
  });

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <TooltipContext.Provider value={{ open, setOpen, delayDuration, ...ids }}>
      <span style={{ position: "relative", display: "inline-block" }}>{children}</span>
    </TooltipContext.Provider>
  );
}

Root.displayName = "Tooltip.Root";
