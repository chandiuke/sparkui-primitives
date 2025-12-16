import * as React from "react";
import { usePopoverContext } from "./context";
import { Slot } from "../utils/slot";
import type { PopoverTriggerProps } from "./types";

export const Trigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const ctx = usePopoverContext();
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.setOpen(!ctx.open);
      onClick?.(e);
    };

    return (
      <Comp
        ref={ref}
        id={ctx.triggerId}
        aria-haspopup="dialog"
        aria-expanded={ctx.open}
        aria-controls={ctx.open ? ctx.contentId : undefined}
        data-state={ctx.open ? "open" : "closed"}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

Trigger.displayName = "Popover.Trigger";
