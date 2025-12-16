import * as React from "react";
import { useDatePickerContext } from "./context";
import type { DatePickerTriggerProps } from "./types";

export const Trigger = React.forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  ({ children, onClick, ...props }, ref) => {
    const ctx = useDatePickerContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ctx.disabled) {
        ctx.setOpen(!ctx.open);
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref || ctx.triggerRef}
        type="button"
        id={ctx.triggerId}
        aria-haspopup="dialog"
        aria-expanded={ctx.open}
        aria-controls={ctx.open ? ctx.contentId : undefined}
        disabled={ctx.disabled}
        onClick={handleClick}
        data-state={ctx.open ? "open" : "closed"}
        data-disabled={ctx.disabled ? "" : undefined}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Trigger.displayName = "DatePicker.Trigger";

// Value display component
export interface DatePickerValueProps {
  placeholder?: string;
  formatFn?: (date: Date, locale: string) => string;
}

const defaultFormat = (date: Date, locale: string) =>
  date.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });

export const Value: React.FC<DatePickerValueProps> = ({
  placeholder = "Select date",
  formatFn = defaultFormat,
}) => {
  const ctx = useDatePickerContext();

  if (!ctx.value) {
    return <span data-placeholder="">{placeholder}</span>;
  }

  return <span>{formatFn(ctx.value, ctx.locale)}</span>;
};

Value.displayName = "DatePicker.Value";
