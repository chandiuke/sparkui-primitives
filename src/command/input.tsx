import * as React from "react";
import { useCommandContext } from "./context";
import type { CommandInputProps } from "./types";

export const Input = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ onChange, ...props }, ref) => {
    const ctx = useCommandContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      ctx.setSearch(e.target.value);
      onChange?.(e);
    };

    return (
      <input
        ref={ref}
        type="text"
        role="combobox"
        aria-expanded="true"
        aria-controls="command-list"
        aria-autocomplete="list"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        data-command-input=""
        value={ctx.search}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Input.displayName = "Command.Input";
