import * as React from "react";
import { useDropdownContext } from "./context";
import { Slot } from "../utils/slot";
import type { DropdownTriggerProps } from "./types";

export const Trigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const ctx = useDropdownContext();
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.setOpen(!ctx.open);
      onClick?.(e);
    };

    return (
      <Comp
        ref={ref}
        id={ctx.triggerId}
        aria-haspopup="menu"
        aria-expanded={ctx.open}
        aria-controls={ctx.open ? ctx.contentId : undefined}
        data-state={ctx.open ? "open" : "closed"}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

Trigger.displayName = "Dropdown.Trigger";
