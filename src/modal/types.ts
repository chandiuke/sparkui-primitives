import * as React from "react";

export interface ModalRootProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ModalTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface ModalPortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

export interface ModalOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onEscapeKeyDown?: (e: KeyboardEvent) => void;
  onPointerDownOutside?: (e: MouseEvent) => void;
}

export interface ModalCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface ModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
  titleId: string;
  descriptionId: string;
}
