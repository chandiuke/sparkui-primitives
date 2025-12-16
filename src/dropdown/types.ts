import * as React from "react";

export interface DropdownRootProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DropdownTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  avoidCollisions?: boolean;
}

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  onSelect?: () => void;
  asChild?: boolean;
}

export interface DropdownGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
}
