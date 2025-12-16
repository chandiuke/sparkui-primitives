import * as React from "react";
import type { CollapsibleContextValue } from "./types";

export const CollapsibleContext =
  React.createContext<CollapsibleContextValue | null>(null);

export function useCollapsibleContext() {
  const ctx = React.useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error(
      "Collapsible components must be used within a Collapsible.Root"
    );
  }
  return ctx;
}
