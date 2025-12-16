import * as React from "react";
import { useSelectContext } from "./context";
import { useComposedRefs } from "../utils/compose-refs";
import type { SelectContentProps } from "./types";

export const Content = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, position = "popper", side = "bottom", sideOffset = 4, align = "start", style, ...props }, ref) => {
    const ctx = useSelectContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(contentRef, ref);

    // Close on click outside
    React.useEffect(() => {
      if (!ctx.open) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        const trigger = document.getElementById(ctx.triggerId);
        
        if (
          contentRef.current &&
          !contentRef.current.contains(target) &&
          trigger &&
          !trigger.contains(target)
        ) {
          ctx.setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ctx.open, ctx.triggerId, ctx.setOpen]);

    if (!ctx.open) return null;

    const positionStyles: React.CSSProperties = {
      position: "absolute",
      zIndex: 50,
      minWidth: "100%",
      ...(side === "bottom" ? { top: `calc(100% + ${sideOffset}px)` } : { bottom: `calc(100% + ${sideOffset}px)` }),
      ...(align === "start" ? { left: 0 } : align === "end" ? { right: 0 } : { left: "50%", transform: "translateX(-50%)" }),
    };

    return (
      <div
        ref={composedRef}
        role="listbox"
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

Content.displayName = "Select.Content";
