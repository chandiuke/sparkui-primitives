import * as React from "react";
import type { SelectContextValue } from "./types";

export const SelectContext = React.createContext<SelectContextValue | null>(null);

export function useSelectContext() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select.Root");
  }
  return context;
}
