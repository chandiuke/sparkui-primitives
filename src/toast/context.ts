import * as React from "react";
import type { ToastContextValue } from "./types";

export const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToastContext() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("Toast components must be used within a Toast.Provider");
  }
  return ctx;
}

// Hook for adding toasts from anywhere
export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a Toast.Provider");
  }
  
  return {
    toast: ctx.addToast,
    dismiss: ctx.removeToast,
    update: ctx.updateToast,
    toasts: ctx.toasts,
  };
}
