import * as React from "react";
import { useTabsContext } from "./context";
import type { TabsContentProps } from "./types";

export const Content = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, forceMount, children, ...props }, ref) => {
    const ctx = useTabsContext();
    const isSelected = ctx.value === value;

    if (!forceMount && !isSelected) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        data-state={isSelected ? "active" : "inactive"}
        data-orientation={ctx.orientation}
        tabIndex={0}
        hidden={!isSelected}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Content.displayName = "Tabs.Content";
