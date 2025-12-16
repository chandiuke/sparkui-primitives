import * as React from "react";
import { RadioGroupContext } from "./context";
import type { RadioGroupRootProps } from "./types";

export const Root = React.forwardRef<HTMLDivElement, RadioGroupRootProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      disabled = false,
      required = false,
      orientation = "vertical",
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange]
    );

    return (
      <RadioGroupContext.Provider value={{ value, onValueChange: handleValueChange, disabled, required }}>
        <div
          ref={ref}
          role="radiogroup"
          aria-required={required}
          aria-orientation={orientation}
          data-disabled={disabled ? "" : undefined}
          data-orientation={orientation}
          {...props}
        />
      </RadioGroupContext.Provider>
    );
  }
);

Root.displayName = "RadioGroup.Root";
