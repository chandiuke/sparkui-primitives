import * as React from "react";
import type { DropdownContextValue } from "./types";

export const DropdownContext = React.createContext<DropdownContextValue | null>(null);

export function useDropdownContext() {
  const ctx = React.useContext(DropdownContext);
  if (!ctx) {
    throw new Error("Dropdown components must be used within a Dropdown.Root");
  }
  return ctx;
}
