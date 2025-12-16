import * as React from "react";
import type { ScrollAreaContextValue } from "./types";

export const ScrollAreaContext =
  React.createContext<ScrollAreaContextValue | null>(null);

export function useScrollAreaContext() {
  const ctx = React.useContext(ScrollAreaContext);
  if (!ctx) {
    throw new Error(
      "ScrollArea components must be used within a ScrollArea.Root"
    );
  }
  return ctx;
}

// Scrollbar context for thumb
export interface ScrollbarContextValue {
  orientation: "horizontal" | "vertical";
  hasThumb: boolean;
  onThumbChange: (thumb: HTMLDivElement | null) => void;
  onThumbPointerDown: (pointerPos: { x: number; y: number }) => void;
  onThumbPointerUp: () => void;
}

export const ScrollbarContext =
  React.createContext<ScrollbarContextValue | null>(null);

export function useScrollbarContext() {
  const ctx = React.useContext(ScrollbarContext);
  if (!ctx) {
    throw new Error(
      "ScrollArea.Thumb must be used within a ScrollArea.Scrollbar"
    );
  }
  return ctx;
}
