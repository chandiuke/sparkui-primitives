import * as React from "react";
import type { SelectGroupProps, SelectLabelProps, SelectSeparatorProps } from "./types";

export const Group = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} role="group" {...props}>
        {children}
      </div>
    );
  }
);

Group.displayName = "Select.Group";

export const Label = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Label.displayName = "Select.Label";

export const Separator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  (props, ref) => {
    return <div ref={ref} role="separator" aria-orientation="horizontal" {...props} />;
  }
);

Separator.displayName = "Select.Separator";
