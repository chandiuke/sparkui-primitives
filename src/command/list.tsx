import * as React from "react";
import { useCommandContext } from "./context";
import type { CommandListProps, CommandEmptyProps, CommandGroupProps, CommandSeparatorProps, CommandLoadingProps } from "./types";

export const List = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="listbox"
        id="command-list"
        data-command-list=""
        {...props}
      >
        {children}
      </div>
    );
  }
);

List.displayName = "Command.List";

export const Empty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ children, ...props }, ref) => {
    const ctx = useCommandContext();

    if (ctx.filteredItems.size > 0) return null;

    return (
      <div ref={ref} role="presentation" data-command-empty="" {...props}>
        {children}
      </div>
    );
  }
);

Empty.displayName = "Command.Empty";

export const Group = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ heading, children, ...props }, ref) => {
    const ctx = useCommandContext();
    const groupRef = React.useRef<HTMLDivElement>(null);
    const [hasVisibleItems, setHasVisibleItems] = React.useState(true);

    // Check if group has any visible items
    React.useEffect(() => {
      if (groupRef.current) {
        const items = groupRef.current.querySelectorAll("[data-command-item]");
        const visible = Array.from(items).some(
          (item) => !item.hasAttribute("data-hidden")
        );
        setHasVisibleItems(visible);
      }
    }, [ctx.filteredItems]);

    if (!hasVisibleItems) return null;

    return (
      <div ref={ref} role="group" data-command-group="" {...props}>
        {heading && (
          <div aria-hidden="true" data-command-group-heading="">
            {heading}
          </div>
        )}
        <div ref={groupRef} role="group">
          {children}
        </div>
      </div>
    );
  }
);

Group.displayName = "Command.Group";

export const Separator = React.forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} role="separator" data-command-separator="" {...props} />;
  }
);

Separator.displayName = "Command.Separator";

export const Loading = React.forwardRef<HTMLDivElement, CommandLoadingProps>(
  ({ progress, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading..."
        data-command-loading=""
        {...props}
      >
        {children}
      </div>
    );
  }
);

Loading.displayName = "Command.Loading";
