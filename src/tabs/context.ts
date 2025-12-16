import * as React from "react";
import type { TabsContextValue } from "./types";

export const TabsContext = React.createContext<TabsContextValue | null>(null);

export function useTabsContext() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) {
    throw new Error("Tabs components must be used within a Tabs.Root");
  }
  return ctx;
}
