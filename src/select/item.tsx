import * as React from "react";
import { useSelectContext } from "./context";
import { Slot } from "../utils";
import type { SelectItemProps } from "./types";

interface SelectItemPropsExtended extends SelectItemProps {
  textValue?: string;
}

export const Item = React.forwardRef<HTMLButtonElement, SelectItemPropsExtended>(
  ({ value, disabled = false, asChild, textValue, children, onClick, onMouseEnter, onMouseLeave, onFocus, ...props }, ref) => {
    const ctx = useSelectContext();
    const Comp = asChild ? Slot : "button";
    const isSelected = ctx.value === value;
    const isHighlighted = ctx.highlightedValue === value;
    const itemRef = React.useRef<HTMLButtonElement>(null);

    // Register item for typeahead
    React.useEffect(() => {
      const text = textValue || (typeof children === "string" ? children : value);
      ctx.registerItem(value, text, disabled);
      return () => ctx.unregisterItem(value);
    }, [value, textValue, disabled, children, ctx.registerItem, ctx.unregisterItem]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      ctx.onValueChange(value);
      ctx.setOpen(false);
      onClick?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        ctx.setHighlightedValue(value);
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.setHighlightedValue(null);
      onMouseLeave?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (!disabled) {
        ctx.setHighlightedValue(value);
      }
      onFocus?.(e);
    };

    return (
      <Comp
        ref={ref}
        role="option"
        tabIndex={disabled ? -1 : 0}
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-state={isSelected ? "checked" : "unchecked"}
        data-highlighted={isHighlighted ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        data-value={value}
        disabled={disabled}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Item.displayName = "Select.Item";

// ItemText - for displaying text that becomes the selected value
export const ItemText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ctx = useSelectContext();
  const textRef = React.useRef<HTMLSpanElement>(null);
  const itemRef = React.useRef<HTMLElement | null>(null);

  // Find parent item to get value
  React.useEffect(() => {
    if (textRef.current) {
      itemRef.current = textRef.current.closest("[data-value]");
      const value = itemRef.current?.getAttribute("data-value");
      if (value && ctx.value === value && textRef.current.textContent) {
        ctx.setDisplayValue(textRef.current.textContent);
      }
    }
  }, [ctx.value]);

  return <span ref={textRef}>{children}</span>;
};

ItemText.displayName = "Select.ItemText";

// ItemIndicator - shows when item is selected
export const ItemIndicator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ctx = useSelectContext();
  const itemRef = React.useRef<HTMLSpanElement>(null);
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    if (itemRef.current) {
      const item = itemRef.current.closest("[data-value]");
      const value = item?.getAttribute("data-value");
      setIsSelected(value === ctx.value);
    }
  }, [ctx.value]);

  if (!isSelected) return null;

  return <span ref={itemRef}>{children}</span>;
};

ItemIndicator.displayName = "Select.ItemIndicator";
