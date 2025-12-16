import * as React from "react";
import { useSelectContext } from "./context";
import { Slot } from "../utils";
import type { SelectTriggerProps } from "./types";

export const Trigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ asChild, children, onClick, onKeyDown, ...props }, ref) => {
    const ctx = useSelectContext();
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ctx.disabled) return;
      ctx.setOpen(!ctx.open);
      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (ctx.disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
        case "ArrowDown":
        case "ArrowUp":
          e.preventDefault();
          ctx.setOpen(true);
          break;
      }
      onKeyDown?.(e);
    };

    return (
      <Comp
        ref={ref}
        type="button"
        role="combobox"
        id={ctx.triggerId}
        aria-expanded={ctx.open}
        aria-haspopup="listbox"
        aria-controls={ctx.contentId}
        aria-required={ctx.required}
        aria-disabled={ctx.disabled}
        disabled={ctx.disabled}
        data-state={ctx.open ? "open" : "closed"}
        data-disabled={ctx.disabled ? "" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Trigger.displayName = "Select.Trigger";
