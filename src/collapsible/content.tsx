import * as React from "react";
import { useCollapsibleContext } from "./context";
import type { CollapsibleContentProps } from "./types";

export const Content = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ children, forceMount, style, ...props }, ref) => {
    const ctx = useCollapsibleContext();

    if (!forceMount && !ctx.open) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={ctx.contentId}
        role="region"
        aria-labelledby={ctx.triggerId}
        hidden={!ctx.open}
        data-state={ctx.open ? "open" : "closed"}
        data-disabled={ctx.disabled ? "" : undefined}
        style={{
          ...style,
          display: ctx.open ? undefined : "none",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Content.displayName = "Collapsible.Content";
