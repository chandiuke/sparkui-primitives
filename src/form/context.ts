import * as React from "react";
import type { FormContextValue, FieldContextValue } from "./types";

export const FormContext = React.createContext<FormContextValue | null>(null);

export function useFormContext() {
  const ctx = React.useContext(FormContext);
  if (!ctx) {
    throw new Error("Form components must be used within a Form.Root");
  }
  return ctx;
}

export const FieldContext = React.createContext<FieldContextValue | null>(null);

export function useFieldContext() {
  const ctx = React.useContext(FieldContext);
  if (!ctx) {
    throw new Error("Form.Control/Label/Message must be used within a Form.Field");
  }
  return ctx;
}
