import * as React from "react";
import { useModalContext } from "./context";
import { Slot } from "../utils/slot";
import type { ModalTriggerProps } from "./types";

export const Trigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const ctx = useModalContext();
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.setOpen(true);
      onClick?.(e);
    };

    return (
      <Comp
        ref={ref}
        aria-haspopup="dialog"
        aria-expanded={ctx.open}
        data-state={ctx.open ? "open" : "closed"}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

Trigger.displayName = "Modal.Trigger";
