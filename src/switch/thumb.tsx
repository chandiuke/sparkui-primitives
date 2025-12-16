import * as React from "react";
import { SwitchContext } from "./root";
import type { SwitchThumbProps } from "./types";

export const Thumb = React.forwardRef<HTMLSpanElement, SwitchThumbProps>(
  ({ ...props }, ref) => {
    const ctx = React.useContext(SwitchContext);
    if (!ctx) {
      throw new Error("Switch.Thumb must be used within a Switch.Root");
    }

    return (
      <span
        ref={ref}
        data-state={ctx.checked ? "checked" : "unchecked"}
        {...props}
      />
    );
  }
);

Thumb.displayName = "Switch.Thumb";
