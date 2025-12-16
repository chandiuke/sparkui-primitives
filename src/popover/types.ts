import * as React from "react";

export interface PopoverRootProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  onEscapeKeyDown?: (e: KeyboardEvent) => void;
  onPointerDownOutside?: (e: MouseEvent) => void;
}

export interface PopoverCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
}
