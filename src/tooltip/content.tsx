import * as React from "react";
import { useTooltipContext } from "./context";
import type { TooltipContentProps } from "./types";

export const Content = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, side = "top", sideOffset = 4, align = "center", style, ...props }, ref) => {
    const ctx = useTooltipContext();

    if (!ctx.open) return null;

    const positionStyles: React.CSSProperties = {
      position: "absolute",
      zIndex: 50,
      ...(side === "top" ? { bottom: `calc(100% + ${sideOffset}px)` } : {}),
      ...(side === "bottom" ? { top: `calc(100% + ${sideOffset}px)` } : {}),
      ...(side === "left" ? { right: `calc(100% + ${sideOffset}px)`, top: "50%", transform: "translateY(-50%)" } : {}),
      ...(side === "right" ? { left: `calc(100% + ${sideOffset}px)`, top: "50%", transform: "translateY(-50%)" } : {}),
      ...(side === "top" || side === "bottom"
        ? align === "start"
          ? { left: 0 }
          : align === "end"
          ? { right: 0 }
          : { left: "50%", transform: "translateX(-50%)" }
        : {}),
    };

    return (
      <div
        ref={ref}
        role="tooltip"
        id={ctx.contentId}
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

Content.displayName = "Tooltip.Content";
