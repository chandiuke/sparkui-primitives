import * as React from "react";

export interface SwitchRootProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  required?: boolean;
  asChild?: boolean;
}

export interface SwitchThumbProps extends React.HTMLAttributes<HTMLSpanElement> {}

export interface SwitchContextValue {
  checked: boolean;
}
