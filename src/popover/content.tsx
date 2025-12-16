import * as React from "react";
import { usePopoverContext } from "./context";
import { useComposedRefs } from "../utils/compose-refs";
import type { PopoverContentProps } from "./types";

export const Content = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, side = "bottom", sideOffset = 4, align = "center", onEscapeKeyDown, onPointerDownOutside, style, ...props }, ref) => {
    const ctx = usePopoverContext();
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
        const trigger = document.getElementById(ctx.triggerId);
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node) &&
          trigger &&
          !trigger.contains(e.target as Node)
        ) {
          onPointerDownOutside?.(e);
          if (!e.defaultPrevented) {
            ctx.setOpen(false);
          }
        }
      };

      document.addEventListener("mousedown", handlePointerDown);
      return () => document.removeEventListener("mousedown", handlePointerDown);
    }, [ctx.open, ctx.setOpen, ctx.triggerId, onPointerDownOutside]);

    if (!ctx.open) return null;

    const positionStyles: React.CSSProperties = {
      position: "absolute",
      zIndex: 50,
      ...(side === "bottom" ? { top: `calc(100% + ${sideOffset}px)` } : {}),
      ...(side === "top" ? { bottom: `calc(100% + ${sideOffset}px)` } : {}),
      ...(side === "left" ? { right: `calc(100% + ${sideOffset}px)` } : {}),
      ...(side === "right" ? { left: `calc(100% + ${sideOffset}px)` } : {}),
      ...(align === "start" ? { left: 0 } : align === "end" ? { right: 0 } : { left: "50%", transform: "translateX(-50%)" }),
    };

    return (
      <div
        ref={composedRef}
        role="dialog"
        id={ctx.contentId}
        aria-labelledby={ctx.triggerId}
        data-state={ctx.open ? "open" : "closed"}
        data-side={side}
        data-align={align}
        style={{ ...positionStyles, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Content.displayName = "Popover.Content";
