import * as React from "react";
import { useTabsContext } from "./context";
import { Slot } from "../utils/slot";
import type { TabsTriggerProps } from "./types";

export const Trigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled, asChild, onClick, ...props }, ref) => {
    const ctx = useTabsContext();
    const Comp = asChild ? Slot : "button";
    const isSelected = ctx.value === value;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      ctx.onValueChange(value);
      onClick?.(e);
    };

    return (
      <Comp
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`tabpanel-${value}`}
        data-state={isSelected ? "active" : "inactive"}
        data-disabled={disabled ? "" : undefined}
        data-orientation={ctx.orientation}
        disabled={disabled}
        tabIndex={isSelected ? 0 : -1}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

Trigger.displayName = "Tabs.Trigger";
