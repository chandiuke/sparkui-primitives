import * as React from "react";
import { CollapsibleContext } from "./context";
import type { CollapsibleRootProps } from "./types";

export const Root = React.forwardRef<
  HTMLDivElement,
  CollapsibleRootProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      children,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const triggerId = React.useId();
    const contentId = React.useId();

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const setOpen = React.useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isControlled, onOpenChange]
    );

    const contextValue = React.useMemo(
      () => ({ open, setOpen, disabled, contentId, triggerId }),
      [open, setOpen, disabled, contentId, triggerId]
    );

    return (
      <CollapsibleContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);

Root.displayName = "Collapsible.Root";
