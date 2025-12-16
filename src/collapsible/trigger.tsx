import * as React from "react";
import { useCollapsibleContext } from "./context";
import type { CollapsibleTriggerProps } from "./types";

export const Trigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ children, onClick, ...props }, ref) => {
  const ctx = useCollapsibleContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ctx.disabled) {
      ctx.setOpen(!ctx.open);
    }
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      id={ctx.triggerId}
      aria-expanded={ctx.open}
      aria-controls={ctx.contentId}
      disabled={ctx.disabled}
      onClick={handleClick}
      data-state={ctx.open ? "open" : "closed"}
      data-disabled={ctx.disabled ? "" : undefined}
      {...props}
    >
      {children}
    </button>
  );
});

Trigger.displayName = "Collapsible.Trigger";
