import * as React from "react";
import { useTabsContext } from "./context";
import type { TabsListProps } from "./types";

export const List = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ ...props }, ref) => {
    const ctx = useTabsContext();

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={ctx.orientation}
        data-orientation={ctx.orientation}
        {...props}
      />
    );
  }
);

List.displayName = "Tabs.List";
