import * as React from "react";
import { TabsContext } from "./context";
import type { TabsRootProps } from "./types";

export const Root = React.forwardRef<HTMLDivElement, TabsRootProps>(
  ({ value: controlledValue, defaultValue = "", onValueChange, orientation = "horizontal", children, ...props }, ref) => {
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
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange, orientation }}>
        <div ref={ref} data-orientation={orientation} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Root.displayName = "Tabs.Root";
