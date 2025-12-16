import * as React from "react";
import { useScrollAreaContext } from "./context";
import type { ScrollAreaViewportProps } from "./types";

export const Viewport = React.forwardRef<HTMLDivElement, ScrollAreaViewportProps>(
  ({ children, style, ...props }, ref) => {
    const ctx = useScrollAreaContext();

    return (
      <div
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          (ctx.viewportRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        data-scroll-area-viewport=""
        style={{
          overflowX: ctx.scrollbarXEnabled ? "scroll" : "hidden",
          overflowY: ctx.scrollbarYEnabled ? "scroll" : "hidden",
          width: "100%",
          height: "100%",
          // Hide native scrollbars
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          ...style,
        }}
        {...props}
      >
        <div style={{ minWidth: "100%", display: "table" }}>{children}</div>
      </div>
    );
  }
);

Viewport.displayName = "ScrollArea.Viewport";
