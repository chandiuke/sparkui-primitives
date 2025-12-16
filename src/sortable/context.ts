import * as React from "react";
import type { SortableContextValue } from "./types";

export const SortableContext = React.createContext<SortableContextValue | null>(null);

export function useSortableContext() {
  const ctx = React.useContext(SortableContext);
  if (!ctx) {
    throw new Error("Sortable components must be used within a Sortable.Root");
  }
  return ctx;
}

// Item-level context for handle
export const SortableItemContext = React.createContext<{
  id: string;
  isDragging: boolean;
  attributes: Record<string, any>;
  listeners: Record<string, any>;
} | null>(null);

export function useSortableItemContext() {
  const ctx = React.useContext(SortableItemContext);
  if (!ctx) {
    throw new Error("Sortable.Handle must be used within a Sortable.Item");
  }
  return ctx;
}
