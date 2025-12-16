import * as React from "react";
import { Slot } from "../utils/slot";
import type { SwitchRootProps } from "./types";

export const SwitchContext = React.createContext<{ checked: boolean } | null>(null);

export const Root = React.forwardRef<HTMLButtonElement, SwitchRootProps>(
  ({ checked: controlledChecked, defaultChecked = false, onCheckedChange, required, asChild, onClick, ...props }, ref) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newChecked = !checked;
      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
      onClick?.(e);
    };

    return (
      <SwitchContext.Provider value={{ checked }}>
        <Comp
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-required={required}
          data-state={checked ? "checked" : "unchecked"}
          onClick={handleClick}
          {...props}
        />
      </SwitchContext.Provider>
    );
  }
);

Root.displayName = "Switch.Root";
