import * as React from "react";
import { useDatePickerContext } from "./context";
import type {
  DatePickerContentProps,
  DatePickerCalendarProps,
  DatePickerHeaderProps,
  DatePickerPrevProps,
  DatePickerNextProps,
  DatePickerTitleProps,
  DatePickerGridProps,
  DatePickerHeadProps,
  DatePickerHeadCellProps,
  DatePickerBodyProps,
  DatePickerRowProps,
  DatePickerCellProps,
  DatePickerDayProps,
} from "./types";
import { useFloatingPosition } from "../utils/use-floating";

// Date utilities
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isToday = (date: Date) => isSameDay(date, new Date());

export const Content = React.forwardRef<HTMLDivElement, DatePickerContentProps>(
  ({ children, sideOffset = 4, style, ...props }, ref) => {
    const ctx = useDatePickerContext();
    const { floatingStyles, refs } = useFloatingPosition({
      placement: "bottom-start",
      offset: sideOffset,
    });

    React.useEffect(() => {
      if (ctx.triggerRef.current) {
        refs.setReference(ctx.triggerRef.current);
      }
    }, [ctx.triggerRef, refs]);

    if (!ctx.open) return null;

    return (
      <div
        ref={(node) => {
          refs.setFloating(node);
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="dialog"
        id={ctx.contentId}
        aria-modal="true"
        aria-label="Choose date"
        data-state="open"
        style={{ ...floatingStyles, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Content.displayName = "DatePicker.Content";

export const Calendar = React.forwardRef<HTMLDivElement, DatePickerCalendarProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} data-datepicker-calendar="" {...props}>
        {children}
      </div>
    );
  }
);

Calendar.displayName = "DatePicker.Calendar";

export const Header = React.forwardRef<HTMLDivElement, DatePickerHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} data-datepicker-header="" {...props}>
        {children}
      </div>
    );
  }
);

Header.displayName = "DatePicker.Header";

export const Prev = React.forwardRef<HTMLButtonElement, DatePickerPrevProps>(
  ({ children, onClick, ...props }, ref) => {
    const ctx = useDatePickerContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newDate = new Date(ctx.viewDate);
      if (ctx.view === "days") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (ctx.view === "months") {
        newDate.setFullYear(newDate.getFullYear() - 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() - 12);
      }
      ctx.setViewDate(newDate);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Previous"
        onClick={handleClick}
        data-datepicker-prev=""
        {...props}
      >
        {children || "←"}
      </button>
    );
  }
);

Prev.displayName = "DatePicker.Prev";

export const Next = React.forwardRef<HTMLButtonElement, DatePickerNextProps>(
  ({ children, onClick, ...props }, ref) => {
    const ctx = useDatePickerContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newDate = new Date(ctx.viewDate);
      if (ctx.view === "days") {
        newDate.setMonth(newDate.getMonth() + 1);
      } else if (ctx.view === "months") {
        newDate.setFullYear(newDate.getFullYear() + 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() + 12);
      }
      ctx.setViewDate(newDate);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Next"
        onClick={handleClick}
        data-datepicker-next=""
        {...props}
      >
        {children || "→"}
      </button>
    );
  }
);

Next.displayName = "DatePicker.Next";

export const Title = React.forwardRef<HTMLButtonElement, DatePickerTitleProps & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, onClick, ...props }, ref) => {
    const ctx = useDatePickerContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ctx.view === "days") {
        ctx.setView("months");
      } else if (ctx.view === "months") {
        ctx.setView("years");
      }
      onClick?.(e);
    };

    const getTitle = () => {
      const year = ctx.viewDate.getFullYear();
      const month = ctx.viewDate.toLocaleString(ctx.locale, { month: "long" });
      
      if (ctx.view === "days") return `${month} ${year}`;
      if (ctx.view === "months") return `${year}`;
      const startYear = Math.floor(year / 12) * 12;
      return `${startYear} - ${startYear + 11}`;
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        data-datepicker-title=""
        {...props}
      >
        {children || getTitle()}
      </button>
    );
  }
);

Title.displayName = "DatePicker.Title";

export const Grid = React.forwardRef<HTMLTableElement, DatePickerGridProps>(
  ({ children, ...props }, ref) => {
    return (
      <table ref={ref} role="grid" data-datepicker-grid="" {...props}>
        {children}
      </table>
    );
  }
);

Grid.displayName = "DatePicker.Grid";

export const Head = React.forwardRef<HTMLTableSectionElement, DatePickerHeadProps>(
  ({ children, ...props }, ref) => {
    return (
      <thead ref={ref} data-datepicker-head="" {...props}>
        <tr>{children}</tr>
      </thead>
    );
  }
);

Head.displayName = "DatePicker.Head";

export const HeadCell = React.forwardRef<HTMLTableCellElement, DatePickerHeadCellProps>(
  ({ day, children, ...props }, ref) => {
    const ctx = useDatePickerContext();
    const dayIndex = (day + ctx.weekStartsOn) % 7;
    const dayName = new Date(2024, 0, dayIndex).toLocaleString(ctx.locale, { weekday: "short" });

    return (
      <th ref={ref} scope="col" aria-label={dayName} data-datepicker-headcell="" {...props}>
        {children || dayName}
      </th>
    );
  }
);

HeadCell.displayName = "DatePicker.HeadCell";

export const Body = React.forwardRef<HTMLTableSectionElement, DatePickerBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <tbody ref={ref} data-datepicker-body="" {...props}>
        {children}
      </tbody>
    );
  }
);

Body.displayName = "DatePicker.Body";

export const Row = React.forwardRef<HTMLTableRowElement, DatePickerRowProps>(
  ({ children, ...props }, ref) => {
    return (
      <tr ref={ref} data-datepicker-row="" {...props}>
        {children}
      </tr>
    );
  }
);

Row.displayName = "DatePicker.Row";

export const Cell = React.forwardRef<HTMLTableCellElement, DatePickerCellProps>(
  ({ date, children, ...props }, ref) => {
    const ctx = useDatePickerContext();
    const isSelected = ctx.value ? isSameDay(date, ctx.value) : false;
    const isCurrentMonth = date.getMonth() === ctx.viewDate.getMonth();

    return (
      <td
        ref={ref}
        role="gridcell"
        aria-selected={isSelected}
        data-datepicker-cell=""
        data-selected={isSelected ? "" : undefined}
        data-outside={!isCurrentMonth ? "" : undefined}
        {...props}
      >
        {children}
      </td>
    );
  }
);

Cell.displayName = "DatePicker.Cell";

export const Day = React.forwardRef<HTMLButtonElement, DatePickerDayProps>(
  ({ date, children, onClick, disabled: propDisabled, ...props }, ref) => {
    const ctx = useDatePickerContext();
    const isSelected = ctx.value ? isSameDay(date, ctx.value) : false;
    const isTodayDate = isToday(date);
    const isDisabled = propDisabled || ctx.isDateDisabled(date);
    const isCurrentMonth = date.getMonth() === ctx.viewDate.getMonth();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        ctx.onValueChange(date);
        ctx.setOpen(false);
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        tabIndex={isSelected ? 0 : -1}
        disabled={isDisabled}
        aria-selected={isSelected}
        aria-current={isTodayDate ? "date" : undefined}
        onClick={handleClick}
        data-datepicker-day=""
        data-selected={isSelected ? "" : undefined}
        data-today={isTodayDate ? "" : undefined}
        data-disabled={isDisabled ? "" : undefined}
        data-outside={!isCurrentMonth ? "" : undefined}
        {...props}
      >
        {children || date.getDate()}
      </button>
    );
  }
);

Day.displayName = "DatePicker.Day";

// Month picker for month view
export interface DatePickerMonthProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  month: number;
}

export const Month = React.forwardRef<HTMLButtonElement, DatePickerMonthProps>(
  ({ month, children, onClick, ...props }, ref) => {
    const ctx = useDatePickerContext();
    const isSelected = ctx.value?.getMonth() === month && ctx.value?.getFullYear() === ctx.viewDate.getFullYear();
    const monthName = new Date(2024, month).toLocaleString(ctx.locale, { month: "short" });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newDate = new Date(ctx.viewDate);
      newDate.setMonth(month);
      ctx.setViewDate(newDate);
      ctx.setView("days");
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-selected={isSelected}
        onClick={handleClick}
        data-datepicker-month=""
        data-selected={isSelected ? "" : undefined}
        {...props}
      >
        {children || monthName}
      </button>
    );
  }
);

Month.displayName = "DatePicker.Month";

// Year picker for year view
export interface DatePickerYearProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  year: number;
}

export const Year = React.forwardRef<HTMLButtonElement, DatePickerYearProps>(
  ({ year, children, onClick, ...props }, ref) => {
    const ctx = useDatePickerContext();
    const isSelected = ctx.value?.getFullYear() === year;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newDate = new Date(ctx.viewDate);
      newDate.setFullYear(year);
      ctx.setViewDate(newDate);
      ctx.setView("months");
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-selected={isSelected}
        onClick={handleClick}
        data-datepicker-year=""
        data-selected={isSelected ? "" : undefined}
        {...props}
      >
        {children || year}
      </button>
    );
  }
);

Year.displayName = "DatePicker.Year";

// Helper hook to generate calendar data
export function useCalendarDays() {
  const ctx = useDatePickerContext();
  const year = ctx.viewDate.getFullYear();
  const month = ctx.viewDate.getMonth();

  return React.useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const adjustedFirstDay = (firstDay - ctx.weekStartsOn + 7) % 7;

    const days: Date[][] = [];
    let week: Date[] = [];

    // Previous month days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      week.push(new Date(prevYear, prevMonth, daysInPrevMonth - i));
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(new Date(year, month, day));
      if (week.length === 7) {
        days.push(week);
        week = [];
      }
    }

    // Next month days
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    let nextDay = 1;

    while (week.length < 7 && week.length > 0) {
      week.push(new Date(nextYear, nextMonth, nextDay++));
    }
    if (week.length > 0) {
      days.push(week);
    }

    // Ensure 6 rows for consistent height
    while (days.length < 6) {
      week = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(nextYear, nextMonth, nextDay++));
      }
      days.push(week);
    }

    return days;
  }, [year, month, ctx.weekStartsOn]);
}
