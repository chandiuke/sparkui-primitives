import * as React from "react";
import { createPortal } from "react-dom";
import { useToastContext } from "./context";
import type { ToastViewportProps } from "./types";

const positionStyles: Record<string, React.CSSProperties> = {
  "top-left": { top: 0, left: 0 },
  "top-center": { top: 0, left: "50%", transform: "translateX(-50%)" },
  "top-right": { top: 0, right: 0 },
  "bottom-left": { bottom: 0, left: 0 },
  "bottom-center": { bottom: 0, left: "50%", transform: "translateX(-50%)" },
  "bottom-right": { bottom: 0, right: 0 },
};

export const Viewport = React.forwardRef<HTMLOListElement, ToastViewportProps>(
  ({ hotkey = ["F8"], label = "Notifications", style, children, ...props }, ref) => {
    const ctx = useToastContext();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Hotkey to focus viewport
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (hotkey.includes(e.key)) {
          const viewport = document.querySelector("[data-toast-viewport]") as HTMLElement;
          viewport?.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [hotkey]);

    if (!mounted) return null;

    const viewportContent = (
      <ol
        ref={ref}
        role="region"
        aria-label={label}
        aria-live="polite"
        data-toast-viewport=""
        data-position={ctx.position}
        tabIndex={-1}
        style={{
          position: "fixed",
          zIndex: 9999,
          display: "flex",
          flexDirection: ctx.position.startsWith("top") ? "column" : "column-reverse",
          gap: 8,
          padding: 16,
          margin: 0,
          listStyle: "none",
          outline: "none",
          pointerEvents: "none",
          ...positionStyles[ctx.position],
          ...style,
        }}
        {...props}
      >
        {children}
      </ol>
    );

    return createPortal(viewportContent, document.body);
  }
);

Viewport.displayName = "Toast.Viewport";
