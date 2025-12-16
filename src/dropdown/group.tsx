import * as React from "react";
import type { DropdownGroupProps, DropdownLabelProps, DropdownSeparatorProps } from "./types";

export const Group = React.forwardRef<HTMLDivElement, DropdownGroupProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} role="group" {...props} />;
  }
);

Group.displayName = "Dropdown.Group";

export const Label = React.forwardRef<HTMLDivElement, DropdownLabelProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} {...props} />;
  }
);

Label.displayName = "Dropdown.Label";

export const Separator = React.forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} role="separator" {...props} />;
  }
);

Separator.displayName = "Dropdown.Separator";
