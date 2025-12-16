import * as React from "react";
import { SelectContext } from "./context";
import type { SelectRootProps, SelectOption } from "./types";

// Default filter function for searchable select
const defaultFilterFn = (value: string, search: string, textValue?: string) => {
  const searchLower = search.toLowerCase();
  return (
    value.toLowerCase().includes(searchLower) ||
    (textValue?.toLowerCase().includes(searchLower) ?? false)
  );
};

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
      searchable = false,
      filterFn = defaultFilterFn,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const [displayValue, setDisplayValue] = React.useState("");
    const [highlightedValue, setHighlightedValue] = React.useState<string | null>(null);
    const [items, setItems] = React.useState<Map<string, SelectOption>>(new Map());
    const [searchQuery, setSearchQuery] = React.useState("");

    const triggerRef = React.useRef<HTMLButtonElement>(null);
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

    // Register/unregister items for typeahead
    const registerItem = React.useCallback((itemValue: string, textValue?: string, itemDisabled?: boolean) => {
      setItems((prev) => {
        const next = new Map(prev);
        next.set(itemValue, { value: itemValue, label: textValue || itemValue, textValue, disabled: itemDisabled });
        return next;
      });
    }, []);

    const unregisterItem = React.useCallback((itemValue: string) => {
      setItems((prev) => {
        const next = new Map(prev);
        next.delete(itemValue);
        return next;
      });
    }, []);

    // Close on escape
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && open) {
          handleOpenChange(false);
          triggerRef.current?.focus();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, handleOpenChange]);

    // Clear search when closing
    React.useEffect(() => {
      if (!open) {
        setSearchQuery("");
      }
    }, [open]);

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
        triggerRef,
        registerItem,
        unregisterItem,
        items,
        searchable,
        searchQuery,
        setSearchQuery,
        filterFn,
      }),
      [open, handleOpenChange, value, handleValueChange, displayValue, disabled, required, highlightedValue, contentId, triggerId, registerItem, unregisterItem, items, searchable, searchQuery, filterFn]
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
