import * as React from "react";

export interface TooltipRootProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
  delayDuration: number;
}
