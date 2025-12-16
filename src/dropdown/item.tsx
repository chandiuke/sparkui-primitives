import * as React from "react";
import { useDropdownContext } from "./context";
import { Slot } from "../utils/slot";
import type { DropdownItemProps } from "./types";

export const Item = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ asChild, disabled, onSelect, onClick, onKeyDown, ...props }, ref) => {
    const ctx = useDropdownContext();
    const Comp = asChild ? Slot : "div";

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onSelect?.();
      ctx.setOpen(false);
      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect?.();
        ctx.setOpen(false);
      }
      onKeyDown?.(e);
    };

    return (
      <Comp
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);

Item.displayName = "Dropdown.Item";
