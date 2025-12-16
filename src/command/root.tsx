import * as React from "react";
import { CommandContext } from "./context";
import type { CommandRootProps } from "./types";

// Default filter function
const defaultFilter = (value: string, search: string, keywords?: string[]) => {
  const searchLower = search.toLowerCase();
  if (value.toLowerCase().includes(searchLower)) return true;
  if (keywords?.some((k) => k.toLowerCase().includes(searchLower))) return true;
  return false;
};

export const Root = React.forwardRef<HTMLDivElement, CommandRootProps>(
  ({ value, onValueChange, filter = defaultFilter, loop = true, children, onKeyDown, ...props }, ref) => {
    const [search, setSearch] = React.useState("");
    const [selectedValue, setSelectedValue] = React.useState(value || "");
    const [items, setItems] = React.useState<Map<string, string[]>>(new Map());
    const listRef = React.useRef<HTMLDivElement>(null);

    // Filter items based on search
    const filteredItems = React.useMemo(() => {
      const filtered = new Set<string>();
      items.forEach((keywords, itemValue) => {
        if (!search || filter(itemValue, search, keywords)) {
          filtered.add(itemValue);
        }
      });
      return filtered;
    }, [items, search, filter]);

    // Register/unregister items
    const registerItem = React.useCallback((itemValue: string, keywords?: string[]) => {
      setItems((prev) => {
        const next = new Map(prev);
        next.set(itemValue, keywords || []);
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

    // Handle value change
    const handleValueChange = React.useCallback(
      (newValue: string) => {
        setSelectedValue(newValue);
        onValueChange?.(newValue);
      },
      [onValueChange]
    );

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const filteredArray = Array.from(filteredItems);
      const currentIndex = filteredArray.indexOf(selectedValue);

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          let nextIndex = currentIndex + 1;
          if (nextIndex >= filteredArray.length) {
            nextIndex = loop ? 0 : filteredArray.length - 1;
          }
          handleValueChange(filteredArray[nextIndex] || "");
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          let prevIndex = currentIndex - 1;
          if (prevIndex < 0) {
            prevIndex = loop ? filteredArray.length - 1 : 0;
          }
          handleValueChange(filteredArray[prevIndex] || "");
          break;
        }
        case "Home": {
          e.preventDefault();
          handleValueChange(filteredArray[0] || "");
          break;
        }
        case "End": {
          e.preventDefault();
          handleValueChange(filteredArray[filteredArray.length - 1] || "");
          break;
        }
      }

      onKeyDown?.(e);
    };

    // Auto-select first item when search changes
    React.useEffect(() => {
      const filteredArray = Array.from(filteredItems);
      if (filteredArray.length > 0 && !filteredItems.has(selectedValue)) {
        handleValueChange(filteredArray[0]);
      }
    }, [filteredItems, selectedValue, handleValueChange]);

    const contextValue = React.useMemo(
      () => ({
        search,
        setSearch,
        selectedValue,
        setSelectedValue: handleValueChange,
        filteredItems,
        registerItem,
        unregisterItem,
      }),
      [search, selectedValue, handleValueChange, filteredItems, registerItem, unregisterItem]
    );

    return (
      <CommandContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="listbox"
          aria-label="Command menu"
          data-command-root=""
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </CommandContext.Provider>
    );
  }
);

Root.displayName = "Command.Root";
