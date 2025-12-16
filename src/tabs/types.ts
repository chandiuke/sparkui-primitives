import * as React from "react";

export interface TabsRootProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  asChild?: boolean;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
}

export interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: "horizontal" | "vertical";
}
