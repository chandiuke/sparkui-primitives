import * as React from "react";
import type { DatePickerContextValue } from "./types";

export const DatePickerContext = React.createContext<DatePickerContextValue | null>(null);

export function useDatePickerContext() {
  const ctx = React.useContext(DatePickerContext);
  if (!ctx) {
    throw new Error("DatePicker components must be used within a DatePicker.Root");
  }
  return ctx;
}
