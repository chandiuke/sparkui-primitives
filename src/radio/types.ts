import * as React from "react";

export interface RadioGroupRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  orientation?: "horizontal" | "vertical";
}

export interface RadioGroupItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  value: string;
  disabled?: boolean;
  asChild?: boolean;
}

export interface RadioGroupIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  forceMount?: boolean;
}

export interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
  required: boolean;
}

export interface RadioItemContextValue {
  checked: boolean;
  disabled: boolean;
}
