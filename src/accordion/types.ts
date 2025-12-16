import * as React from "react";

export interface AccordionSingleProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
}

export interface AccordionMultipleProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type AccordionRootProps = (AccordionSingleProps | AccordionMultipleProps) & {
  children: React.ReactNode;
  disabled?: boolean;
};

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface AccordionContextValue {
  value: string[];
  onItemToggle: (itemValue: string) => void;
  disabled?: boolean;
}

export interface AccordionItemContextValue {
  value: string;
  triggerId: string;
  contentId: string;
  open: boolean;
  disabled?: boolean;
}
