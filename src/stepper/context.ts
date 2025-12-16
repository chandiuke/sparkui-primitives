import * as React from "react";
import type { StepperContextValue } from "./types";

export const StepperContext = React.createContext<StepperContextValue | null>(null);

export function useStepperContext() {
  const ctx = React.useContext(StepperContext);
  if (!ctx) {
    throw new Error("Stepper components must be used within a Stepper.Root");
  }
  return ctx;
}

// Step-level context
export const StepContext = React.createContext<{
  step: number;
  isActive: boolean;
  isCompleted: boolean;
  isDisabled: boolean;
} | null>(null);

export function useStepContext() {
  const ctx = React.useContext(StepContext);
  if (!ctx) {
    throw new Error("Step components must be used within a Stepper.Step");
  }
  return ctx;
}
