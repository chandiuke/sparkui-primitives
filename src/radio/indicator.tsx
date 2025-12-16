import * as React from "react";
import { useRadioItemContext } from "./context";
import type { RadioGroupIndicatorProps } from "./types";

export const Indicator = React.forwardRef<HTMLSpanElement, RadioGroupIndicatorProps>(
  ({ forceMount, children, ...props }, ref) => {
    const ctx = useRadioItemContext();

    if (!forceMount && !ctx.checked) return null;

    return (
      <span
        ref={ref}
        data-state={ctx.checked ? "checked" : "unchecked"}
        data-disabled={ctx.disabled ? "" : undefined}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Indicator.displayName = "RadioGroup.Indicator";
