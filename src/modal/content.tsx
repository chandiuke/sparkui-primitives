import * as React from "react";
import { useModalContext } from "./context";
import { useComposedRefs } from "../utils/compose-refs";
import type { ModalContentProps } from "./types";

export const Content = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, onEscapeKeyDown, onPointerDownOutside, style, ...props }, ref) => {
    const ctx = useModalContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(contentRef, ref);

    // Handle escape key
    React.useEffect(() => {
      if (!ctx.open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onEscapeKeyDown?.(e);
          if (!e.defaultPrevented) {
            ctx.setOpen(false);
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [ctx.open, ctx.setOpen, onEscapeKeyDown]);

    // Handle click outside
    React.useEffect(() => {
      if (!ctx.open) return;

      const handlePointerDown = (e: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
          onPointerDownOutside?.(e);
          if (!e.defaultPrevented) {
            ctx.setOpen(false);
          }
        }
      };

      document.addEventListener("mousedown", handlePointerDown);
      return () => document.removeEventListener("mousedown", handlePointerDown);
    }, [ctx.open, ctx.setOpen, onPointerDownOutside]);

    if (!ctx.open) return null;

    return (
      <div
        ref={composedRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ctx.titleId}
        aria-describedby={ctx.descriptionId}
        id={ctx.contentId}
        data-state={ctx.open ? "open" : "closed"}
        tabIndex={-1}
        style={{
          position: "fixed",
          zIndex: 50,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Content.displayName = "Modal.Content";
