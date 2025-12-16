import * as React from "react";
import { useTooltipContext } from "./context";
import { Slot } from "../utils/slot";
import type { TooltipTriggerProps } from "./types";

export const Trigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ asChild, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const ctx = useTooltipContext();
    const Comp = asChild ? Slot : "span";
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      timeoutRef.current = setTimeout(() => ctx.setOpen(true), ctx.delayDuration);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      clearTimeout(timeoutRef.current);
      ctx.setOpen(false);
      onMouseLeave?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
      ctx.setOpen(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
      ctx.setOpen(false);
      onBlur?.(e);
    };

    React.useEffect(() => {
      return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
      <Comp
        ref={ref as React.Ref<HTMLSpanElement>}
        id={ctx.triggerId}
        aria-describedby={ctx.open ? ctx.contentId : undefined}
        data-state={ctx.open ? "open" : "closed"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

Trigger.displayName = "Tooltip.Trigger";
