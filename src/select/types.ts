export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  onValueChange: (value: string) => void;
  displayValue: string;
  setDisplayValue: (value: string) => void;
  disabled: boolean;
  required: boolean;
  highlightedValue: string | null;
  setHighlightedValue: (value: string | null) => void;
  contentId: string;
  triggerId: string;
}

export interface SelectRootProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface SelectValueProps {
  placeholder?: string;
  children?: React.ReactNode;
}

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "popper" | "item-aligned";
  side?: "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  asChild?: boolean;
}

export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SelectSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}
