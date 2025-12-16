import * as React from "react";

export type CheckedState = boolean | "indeterminate";

export interface CheckboxRootProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "defaultChecked"> {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
  required?: boolean;
  asChild?: boolean;
}

export interface CheckboxIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  forceMount?: boolean;
}

export interface CheckboxContextValue {
  checked: CheckedState;
}
