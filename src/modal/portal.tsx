import * as React from "react";
import { createPortal } from "react-dom";
import { useModalContext } from "./context";
import type { ModalPortalProps } from "./types";

export function Portal({ children, container }: ModalPortalProps) {
  const ctx = useModalContext();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!ctx.open || !mounted) return null;

  return createPortal(children, container || document.body);
}

Portal.displayName = "Modal.Portal";
