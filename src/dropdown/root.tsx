import * as React from "react";
import { DropdownContext } from "./context";
import type { DropdownRootProps } from "./types";

let dropdownIdCounter = 0;

export function Root({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: DropdownRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const [ids] = React.useState(() => {
    const id = ++dropdownIdCounter;
    return {
      triggerId: `dropdown-trigger-${id}`,
      contentId: `dropdown-content-${id}`,
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
    <DropdownContext.Provider value={{ open, setOpen, ...ids }}>
      <div style={{ position: "relative", display: "inline-block" }}>{children}</div>
    </DropdownContext.Provider>
  );
}

Root.displayName = "Dropdown.Root";
