import * as React from "react";
import { ToastContext } from "./context";
import type { ToastProviderProps, ToastData } from "./types";

let toastIdCounter = 0;

export function Provider({
  children,
  position = "bottom-right",
  duration = 5000,
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const addToast = React.useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = `toast-${++toastIdCounter}`;
      const newToast: ToastData = { ...toast, id };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Limit max toasts
        if (updated.length > maxToasts) {
          return updated.slice(-maxToasts);
        }
        return updated;
      });

      // Auto dismiss
      const toastDuration = toast.duration ?? duration;
      if (toastDuration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, toastDuration);
      }

      return id;
    },
    [duration, maxToasts]
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => {
      const toast = prev.find((t) => t.id === id);
      toast?.onClose?.();
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  const updateToast = React.useCallback((id: string, updates: Partial<ToastData>) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const contextValue = React.useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      updateToast,
      position,
      duration,
    }),
    [toasts, addToast, removeToast, updateToast, position, duration]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

Provider.displayName = "Toast.Provider";
