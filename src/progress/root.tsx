import * as React from "react";
import { ProgressContext } from "./context";
import type { ProgressRootProps } from "./types";

const defaultGetValueLabel = (value: number, max: number) =>
  `${Math.round((value / max) * 100)}%`;

export const Root = React.forwardRef<HTMLDivElement, ProgressRootProps>(
  (
    {
      value = null,
      max = 100,
      getValueLabel = defaultGetValueLabel,
      children,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo(
      () => ({ value, max, getValueLabel }),
      [value, max, getValueLabel]
    );

    const percentage = value != null ? Math.round((value / max) * 100) : null;
    const state =
      value == null ? "indeterminate" : value >= max ? "complete" : "loading";

    return (
      <ProgressContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value ?? undefined}
          aria-valuetext={value != null ? getValueLabel(value, max) : undefined}
          data-state={state}
          data-value={value ?? undefined}
          data-max={max}
          {...props}
        >
          {children}
        </div>
      </ProgressContext.Provider>
    );
  }
);

Root.displayName = "Progress.Root";
