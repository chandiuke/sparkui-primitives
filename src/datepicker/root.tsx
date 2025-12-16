import * as React from "react";
import { DatePickerContext } from "./context";
import type { DatePickerRootProps } from "./types";

// Date utility functions
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const Root: React.FC<DatePickerRootProps> = ({
  children,
  value: controlledValue,
  defaultValue = null,
  onValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  minDate,
  maxDate,
  disabledDates = [],
  locale = "en-US",
  weekStartsOn = 0,
}) => {
  const [internalValue, setInternalValue] = React.useState<Date | null>(defaultValue);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [viewDate, setViewDate] = React.useState<Date>(defaultValue || new Date());
  const [view, setView] = React.useState<"days" | "months" | "years">("days");

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const triggerId = React.useId();
  const contentId = React.useId();

  const isValueControlled = controlledValue !== undefined;
  const isOpenControlled = controlledOpen !== undefined;

  const value = isValueControlled ? controlledValue : internalValue;
  const open = isOpenControlled ? controlledOpen : internalOpen;

  const handleValueChange = React.useCallback(
    (date: Date | null) => {
      if (!isValueControlled) {
        setInternalValue(date);
      }
      onValueChange?.(date);
    },
    [isValueControlled, onValueChange]
  );

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isOpenControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
      if (!newOpen) {
        setView("days");
      }
    },
    [isOpenControlled, onOpenChange]
  );

  const isDateDisabled = React.useCallback(
    (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      if (disabledDates.some((d) => isSameDay(d, date))) return true;
      return false;
    },
    [minDate, maxDate, disabledDates]
  );

  // Close on escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleOpenChange(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleOpenChange]);

  const contextValue = React.useMemo(
    () => ({
      value,
      onValueChange: handleValueChange,
      open,
      setOpen: handleOpenChange,
      viewDate,
      setViewDate,
      view,
      setView,
      disabled,
      minDate,
      maxDate,
      disabledDates,
      isDateDisabled,
      locale,
      weekStartsOn,
      triggerId,
      contentId,
      triggerRef,
    }),
    [value, handleValueChange, open, handleOpenChange, viewDate, view, disabled, minDate, maxDate, disabledDates, isDateDisabled, locale, weekStartsOn, triggerId, contentId]
  );

  return (
    <DatePickerContext.Provider value={contextValue}>
      <div style={{ position: "relative", display: "inline-block" }}>
        {children}
      </div>
    </DatePickerContext.Provider>
  );
};

Root.displayName = "DatePicker.Root";
