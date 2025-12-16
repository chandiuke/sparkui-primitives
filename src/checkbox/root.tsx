import * as React from "react";
import { Slot } from "../utils/slot";
import type { CheckboxRootProps, CheckedState } from "./types";

export const CheckboxContext = React.createContext<{ checked: CheckedState } | null>(null);

export const Root = React.forwardRef<HTMLButtonElement, CheckboxRootProps>(
  ({ checked: controlledChecked, defaultChecked = false, onCheckedChange, required, asChild, onClick, ...props }, ref) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<CheckedState>(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newChecked = checked === "indeterminate" ? true : !checked;
      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
      onClick?.(e);
    };

    return (
      <CheckboxContext.Provider value={{ checked }}>
        <Comp
          ref={ref}
          type="button"
          role="checkbox"
          aria-checked={checked === "indeterminate" ? "mixed" : checked}
          aria-required={required}
          data-state={checked === "indeterminate" ? "indeterminate" : checked ? "checked" : "unchecked"}
          onClick={handleClick}
          {...props}
        />
      </CheckboxContext.Provider>
    );
  }
);

Root.displayName = "Checkbox.Root";
