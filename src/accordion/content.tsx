import * as React from "react";
import { useAccordionItemContext } from "./context";
import type { AccordionContentProps } from "./types";

export const Content = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, style, ...props }, ref) => {
    const itemCtx = useAccordionItemContext();

    return (
      <div
        ref={ref}
        id={itemCtx.contentId}
        role="region"
        aria-labelledby={itemCtx.triggerId}
        data-state={itemCtx.open ? "open" : "closed"}
        data-disabled={itemCtx.disabled ? "" : undefined}
        hidden={!itemCtx.open}
        style={{
          ...style,
          display: itemCtx.open ? undefined : "none",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Content.displayName = "Accordion.Content";
