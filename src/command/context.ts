import * as React from "react";
import type { CommandContextValue } from "./types";

export const CommandContext = React.createContext<CommandContextValue | null>(null);

export function useCommandContext() {
  const ctx = React.useContext(CommandContext);
  if (!ctx) {
    throw new Error("Command components must be used within a Command.Root");
  }
  return ctx;
}
