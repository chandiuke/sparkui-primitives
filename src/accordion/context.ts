import * as React from "react";
import type { AccordionContextValue, AccordionItemContextValue } from "./types";

export const AccordionContext = React.createContext<AccordionContextValue | null>(null);
export const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

export function useAccordionContext() {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) {
    throw new Error("Accordion components must be used within an Accordion.Root");
  }
  return ctx;
}

export function useAccordionItemContext() {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error("Accordion.Trigger/Content must be used within an Accordion.Item");
  }
  return ctx;
}
