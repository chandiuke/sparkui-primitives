export interface DatePickerContextValue {
  value: Date | null;
  onValueChange: (date: Date | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  viewDate: Date;
  setViewDate: (date: Date) => void;
  view: "days" | "months" | "years";
  setView: (view: "days" | "months" | "years") => void;
  disabled: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  isDateDisabled: (date: Date) => boolean;
  locale: string;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  triggerId: string;
  contentId: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

export interface DatePickerRootProps {
  children: React.ReactNode;
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date | null) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface DatePickerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface DatePickerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
}

export interface DatePickerCalendarProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DatePickerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DatePickerPrevProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface DatePickerNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface DatePickerTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DatePickerGridProps extends React.HTMLAttributes<HTMLTableElement> {}

export interface DatePickerHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface DatePickerHeadCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  day: number;
}

export interface DatePickerBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface DatePickerRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export interface DatePickerCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  date: Date;
}

export interface DatePickerDayProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  date: Date;
}
