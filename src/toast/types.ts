import * as React from "react";

export type ToastType = "default" | "success" | "error" | "warning" | "info";
export type ToastPosition = 
  | "top-left" | "top-center" | "top-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

export interface ToastData {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: ToastType;
  duration?: number;
  action?: React.ReactNode;
  onClose?: () => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  duration?: number;
  maxToasts?: number;
  gap?: number;
}

export interface ToastViewportProps extends React.HTMLAttributes<HTMLOListElement> {
  hotkey?: string[];
  label?: string;
}

export interface ToastRootProps extends React.HTMLAttributes<HTMLLIElement> {
  toast: ToastData;
  onClose?: () => void;
  duration?: number;
}

export interface ToastTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ToastDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ToastActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  altText: string;
}

export interface ToastCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface ToastContextValue {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, toast: Partial<ToastData>) => void;
  position: ToastPosition;
  duration: number;
}
