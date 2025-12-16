import * as React from "react";
import { useCommandContext } from "./context";
import type { CommandItemProps, CommandShortcutProps } from "./types";

export const Item = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ value, keywords, disabled, onSelect, onClick, children, ...props }, ref) => {
    const ctx = useCommandContext();
    const isSelected = ctx.selectedValue === value;
    const isFiltered = ctx.filteredItems.has(value);

    // Register item
    React.useEffect(() => {
      ctx.registerItem(value, keywords);
      return () => ctx.unregisterItem(value);
    }, [value, keywords, ctx.registerItem, ctx.unregisterItem]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      ctx.setSelectedValue(value);
      onSelect?.();
      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "Enter") {
        e.preventDefault();
        onSelect?.();
      }
    };

    if (!isFiltered) {
      return (
        <div
          ref={ref}
          data-command-item=""
          data-hidden=""
          data-value={value}
          style={{ display: "none" }}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-command-item=""
        data-value={value}
        data-selected={isSelected ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Item.displayName = "Command.Item";

export const Shortcut = React.forwardRef<HTMLSpanElement, CommandShortcutProps>(
  ({ ...props }, ref) => {
    return <span ref={ref} data-command-shortcut="" {...props} />;
  }
);

Shortcut.displayName = "Command.Shortcut";
