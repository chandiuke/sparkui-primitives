import * as React from "react";
import { usePopoverContext } from "./context";
import { Slot } from "../utils/slot";
import type { PopoverCloseProps } from "./types";

export const Close = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const ctx = usePopoverContext();
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.setOpen(false);
      onClick?.(e);
    };

    return <Comp ref={ref} onClick={handleClick} {...props} />;
  }
);

Close.displayName = "Popover.Close";
