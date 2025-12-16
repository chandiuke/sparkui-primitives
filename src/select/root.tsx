import * as React from "react";
import { SelectContext } from "./context";
import type { SelectRootProps } from "./types";

export const Root = React.forwardRef<HTMLDivElement, SelectRootProps & React.HTMLAttributes<HTMLDivElement>>(
  (
    {
      children,
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      required = false,
      name,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const [displayValue, setDisplayValue] = React.useState("");
    const [highlightedValue, setHighlightedValue] = React.useState<string | null>(null);

    const triggerId = React.useId();
    const contentId = React.useId();

    const isValueControlled = controlledValue !== undefined;
    const isOpenControlled = controlledOpen !== undefined;

    const value = isValueControlled ? controlledValue : internalValue;
    const open = isOpenControlled ? controlledOpen : internalOpen;

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (!isValueControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isValueControlled, onValueChange]
    );

    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        if (!isOpenControlled) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
        if (!newOpen) {
          setHighlightedValue(null);
        }
      },
      [isOpenControlled, onOpenChange]
    );

    // Close on escape
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && open) {
          handleOpenChange(false);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, handleOpenChange]);

    const contextValue = React.useMemo(
      () => ({
        open,
        setOpen: handleOpenChange,
        value,
        onValueChange: handleValueChange,
        displayValue,
        setDisplayValue,
        disabled,
        required,
        highlightedValue,
        setHighlightedValue,
        contentId,
        triggerId,
      }),
      [open, handleOpenChange, value, handleValueChange, displayValue, disabled, required, highlightedValue, contentId, triggerId]
    );

    return (
      <SelectContext.Provider value={contextValue}>
        <div ref={ref} style={{ position: "relative" }} {...props}>
          {name && <input type="hidden" name={name} value={value} />}
          {children}
        </div>
      </SelectContext.Provider>
    );
  }
);

Root.displayName = "Select.Root";
