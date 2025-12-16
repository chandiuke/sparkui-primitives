import * as React from "react";
import { ModalContext } from "./context";
import type { ModalRootProps } from "./types";

let modalIdCounter = 0;

export function Root({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: ModalRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const [ids] = React.useState(() => {
    const id = ++modalIdCounter;
    return {
      contentId: `modal-content-${id}`,
      titleId: `modal-title-${id}`,
      descriptionId: `modal-description-${id}`,
    };
  });

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  // Lock body scroll when open
  React.useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  return (
    <ModalContext.Provider value={{ open, setOpen, ...ids }}>
      {children}
    </ModalContext.Provider>
  );
}

Root.displayName = "Modal.Root";
