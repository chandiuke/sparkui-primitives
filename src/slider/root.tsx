import * as React from "react";
import { SliderContext } from "./context";
import type { SliderRootProps } from "./types";

export const Root = React.forwardRef<HTMLDivElement, SliderRootProps>(
  (
    {
      value: controlledValue,
      defaultValue = [0],
      onValueChange,
      onValueCommit,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      orientation = "horizontal",
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = React.useCallback(
      (newValue: number[]) => {
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange]
    );

    const handleValueCommit = React.useCallback(
      (newValue: number[]) => {
        onValueCommit?.(newValue);
      },
      [onValueCommit]
    );

    return (
      <SliderContext.Provider
        value={{
          value,
          min,
          max,
          step,
          disabled,
          orientation,
          onValueChange: handleValueChange,
          onValueCommit: handleValueCommit,
        }}
      >
        <div
          ref={ref}
          role="group"
          aria-disabled={disabled}
          data-disabled={disabled ? "" : undefined}
          data-orientation={orientation}
          {...props}
        />
      </SliderContext.Provider>
    );
  }
);

Root.displayName = "Slider.Root";
