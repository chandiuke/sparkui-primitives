import * as React from "react";
import { useRadioGroupContext, RadioItemContext } from "./context";
import { Slot } from "../utils/slot";
import type { RadioGroupItemProps } from "./types";

export const Item = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ value, disabled: itemDisabled, asChild, onClick, ...props }, ref) => {
    const ctx = useRadioGroupContext();
    const Comp = asChild ? Slot : "button";
    const disabled = itemDisabled ?? ctx.disabled;
    const checked = ctx.value === value;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      ctx.onValueChange(value);
      onClick?.(e);
    };

    return (
      <RadioItemContext.Provider value={{ checked, disabled }}>
        <Comp
          ref={ref}
          type="button"
          role="radio"
          aria-checked={checked}
          aria-disabled={disabled}
          data-state={checked ? "checked" : "unchecked"}
          data-disabled={disabled ? "" : undefined}
          disabled={disabled}
          onClick={handleClick}
          {...props}
        />
      </RadioItemContext.Provider>
    );
  }
);

Item.displayName = "RadioGroup.Item";
