import * as React from "react";
import { useProgressContext } from "./context";
import type { ProgressIndicatorProps } from "./types";

export const Indicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ style, ...props }, ref) => {
    const ctx = useProgressContext();
    const percentage = ctx.value != null ? (ctx.value / ctx.max) * 100 : null;
    const state =
      ctx.value == null
        ? "indeterminate"
        : ctx.value >= ctx.max
        ? "complete"
        : "loading";

    return (
      <div
        ref={ref}
        data-state={state}
        data-value={ctx.value ?? undefined}
        data-max={ctx.max}
        style={{
          ...style,
          transform:
            percentage != null ? `translateX(-${100 - percentage}%)` : undefined,
        }}
        {...props}
      />
    );
  }
);

Indicator.displayName = "Progress.Indicator";
