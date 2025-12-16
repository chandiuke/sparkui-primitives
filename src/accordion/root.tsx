import * as React from "react";
import { AccordionContext } from "./context";
import type { AccordionRootProps } from "./types";

export function Root(props: AccordionRootProps) {
  const { children, disabled, type } = props;

  // Single mode
  if (type === "single") {
    const { value: controlledValue, defaultValue = "", onValueChange, collapsible = false } = props;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const onItemToggle = React.useCallback(
      (itemValue: string) => {
        const newValue = value === itemValue && collapsible ? "" : itemValue;
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [value, collapsible, isControlled, onValueChange]
    );

    return (
      <AccordionContext.Provider value={{ value: value ? [value] : [], onItemToggle, disabled }}>
        <div data-orientation="vertical">{children}</div>
      </AccordionContext.Provider>
    );
  }

  // Multiple mode
  const { value: controlledValue, defaultValue = [], onValueChange } = props;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const onItemToggle = React.useCallback(
    (itemValue: string) => {
      const newValue = value.includes(itemValue)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue];
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [value, isControlled, onValueChange]
  );

  return (
    <AccordionContext.Provider value={{ value, onItemToggle, disabled }}>
      <div data-orientation="vertical">{children}</div>
    </AccordionContext.Provider>
  );
}

Root.displayName = "Accordion.Root";
