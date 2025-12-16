import * as React from "react";
import { useModalContext } from "./context";
import { Slot } from "../utils/slot";
import type { ModalCloseProps } from "./types";

export const Close = React.forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const ctx = useModalContext();
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.setOpen(false);
      onClick?.(e);
    };

    return <Comp ref={ref} onClick={handleClick} {...props} />;
  }
);

Close.displayName = "Modal.Close";
