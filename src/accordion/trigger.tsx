import * as React from "react";
import { useAccordionContext, useAccordionItemContext } from "./context";
import { Slot } from "../utils/slot";
import type { AccordionTriggerProps } from "./types";

export const Trigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const ctx = useAccordionContext();
    const itemCtx = useAccordionItemContext();
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (itemCtx.disabled) return;
      ctx.onItemToggle(itemCtx.value);
      onClick?.(e);
    };

    return (
      <Comp
        ref={ref}
        id={itemCtx.triggerId}
        aria-expanded={itemCtx.open}
        aria-controls={itemCtx.contentId}
        aria-disabled={itemCtx.disabled}
        data-state={itemCtx.open ? "open" : "closed"}
        data-disabled={itemCtx.disabled ? "" : undefined}
        disabled={itemCtx.disabled}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

Trigger.displayName = "Accordion.Trigger";
