import * as React from "react";

export interface UseTypeaheadOptions {
  items: { value: string; textValue?: string; disabled?: boolean }[];
  onMatch?: (value: string) => void;
  timeout?: number;
}

export function useTypeahead(options: UseTypeaheadOptions) {
  const { items, onMatch, timeout = 1000 } = options;
  const searchRef = React.useRef("");
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  const handleTypeahead = React.useCallback(
    (key: string) => {
      // Only handle single printable characters
      if (key.length !== 1) return;

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Append to search string
      searchRef.current += key.toLowerCase();

      // Find matching item
      const match = items.find((item) => {
        if (item.disabled) return false;
        const text = (item.textValue || item.value).toLowerCase();
        return text.startsWith(searchRef.current);
      });

      if (match) {
        onMatch?.(match.value);
      }

      // Reset search after timeout
      timeoutRef.current = setTimeout(() => {
        searchRef.current = "";
      }, timeout);
    },
    [items, onMatch, timeout]
  );

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { handleTypeahead };
}
