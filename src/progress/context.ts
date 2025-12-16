import * as React from "react";
import type { ProgressContextValue } from "./types";

export const ProgressContext =
  React.createContext<ProgressContextValue | null>(null);

export function useProgressContext() {
  const ctx = React.useContext(ProgressContext);
  if (!ctx) {
    throw new Error("Progress components must be used within a Progress.Root");
  }
  return ctx;
}
