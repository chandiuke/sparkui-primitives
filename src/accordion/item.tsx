import * as React from "react";
import { useAccordionContext, AccordionItemContext } from "./context";
import type { AccordionItemProps } from "./types";

let accordionItemIdCounter = 0;

export const Item = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled: itemDisabled, children, ...props }, ref) => {
    const ctx = useAccordionContext();
    const disabled = itemDisabled ?? ctx.disabled;
    const open = ctx.value.includes(value);

    const [ids] = React.useState(() => {
      const id = ++accordionItemIdCounter;
      return {
        triggerId: `accordion-trigger-${id}`,
        contentId: `accordion-content-${id}`,
      };
    });

    return (
      <AccordionItemContext.Provider value={{ value, open, disabled, ...ids }}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

Item.displayName = "Accordion.Item";
