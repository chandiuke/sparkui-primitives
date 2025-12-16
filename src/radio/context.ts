import * as React from "react";
import type { RadioGroupContextValue, RadioItemContextValue } from "./types";

export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);
export const RadioItemContext = React.createContext<RadioItemContextValue | null>(null);

export function useRadioGroupContext() {
  const ctx = React.useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error("RadioGroup components must be used within a RadioGroup.Root");
  }
  return ctx;
}

export function useRadioItemContext() {
  const ctx = React.useContext(RadioItemContext);
  if (!ctx) {
    throw new Error("RadioGroup.Indicator must be used within a RadioGroup.Item");
  }
  return ctx;
}
