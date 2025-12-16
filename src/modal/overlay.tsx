import * as React from "react";
import { useModalContext } from "./context";
import type { ModalOverlayProps } from "./types";

export const Overlay = React.forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ style, ...props }, ref) => {
    const ctx = useModalContext();

    if (!ctx.open) return null;

    return (
      <div
        ref={ref}
        data-state={ctx.open ? "open" : "closed"}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Overlay.displayName = "Modal.Overlay";
