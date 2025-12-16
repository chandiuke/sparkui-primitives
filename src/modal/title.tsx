import * as React from "react";
import { useModalContext } from "./context";
import type { ModalTitleProps, ModalDescriptionProps } from "./types";

export const Title = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ ...props }, ref) => {
    const ctx = useModalContext();
    return <h2 ref={ref} id={ctx.titleId} {...props} />;
  }
);

Title.displayName = "Modal.Title";

export const Description = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ ...props }, ref) => {
    const ctx = useModalContext();
    return <p ref={ref} id={ctx.descriptionId} {...props} />;
  }
);

Description.displayName = "Modal.Description";
