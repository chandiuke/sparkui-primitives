import * as React from "react";
import { CheckboxContext } from "./root";
import type { CheckboxIndicatorProps } from "./types";

export const Indicator = React.forwardRef<HTMLSpanElement, CheckboxIndicatorProps>(
  ({ forceMount, children, ...props }, ref) => {
    const ctx = React.useContext(CheckboxContext);
    if (!ctx) {
      throw new Error("Checkbox.Indicator must be used within a Checkbox.Root");
    }

    const isChecked = ctx.checked === true || ctx.checked === "indeterminate";

    if (!forceMount && !isChecked) return null;

    return (
      <span
        ref={ref}
        data-state={ctx.checked === "indeterminate" ? "indeterminate" : ctx.checked ? "checked" : "unchecked"}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Indicator.displayName = "Checkbox.Indicator";
