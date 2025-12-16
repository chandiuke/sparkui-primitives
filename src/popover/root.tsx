import * as React from "react";
import { PopoverContext } from "./context";
import type { PopoverRootProps } from "./types";

let popoverIdCounter = 0;

export function Root({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: PopoverRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const [ids] = React.useState(() => {
    const id = ++popoverIdCounter;
    return {
      triggerId: `popover-trigger-${id}`,
      contentId: `popover-content-${id}`,
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
    <PopoverContext.Provider value={{ open, setOpen, ...ids }}>
      <div style={{ position: "relative", display: "inline-block" }}>{children}</div>
    </PopoverContext.Provider>
  );
}

Root.displayName = "Popover.Root";
