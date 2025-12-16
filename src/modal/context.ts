import * as React from "react";
import type { ModalContextValue } from "./types";

export const ModalContext = React.createContext<ModalContextValue | null>(null);

export function useModalContext() {
  const ctx = React.useContext(ModalContext);
  if (!ctx) {
    throw new Error("Modal components must be used within a Modal.Root");
  }
  return ctx;
}
