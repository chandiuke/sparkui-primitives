import * as React from "react";
import { useSelectContext } from "./context";

export interface SelectSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Placeholder text */
  placeholder?: string;
}

export const Search = React.forwardRef<HTMLInputElement, SelectSearchProps>(
  ({ placeholder = "Search...", onChange, ...props }, ref) => {
    const ctx = useSelectContext();
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Focus input when dropdown opens
    React.useEffect(() => {
      if (ctx.open && inputRef.current) {
        inputRef.current.focus();
      }
    }, [ctx.open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      ctx.setSearchQuery?.(e.target.value);
      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Prevent closing on space
      if (e.key === " ") {
        e.stopPropagation();
      }
      // Allow arrow navigation to pass through
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
      }
    };

    return (
      <input
        ref={ref || inputRef}
        type="text"
        role="searchbox"
        aria-label="Search options"
        aria-controls={ctx.contentId}
        placeholder={placeholder}
        value={ctx.searchQuery || ""}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        data-select-search=""
        {...props}
      />
    );
  }
);

Search.displayName = "Select.Search";
