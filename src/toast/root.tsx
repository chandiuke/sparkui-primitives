import * as React from "react";
import { useToastContext } from "./context";
import type { ToastRootProps, ToastTitleProps, ToastDescriptionProps, ToastActionProps, ToastCloseProps } from "./types";

export const Root = React.forwardRef<HTMLLIElement, ToastRootProps>(
  ({ toast, onClose, duration, style, children, ...props }, ref) => {
    const ctx = useToastContext();
    const [isLeaving, setIsLeaving] = React.useState(false);

    const handleClose = React.useCallback(() => {
      setIsLeaving(true);
      setTimeout(() => {
        ctx.removeToast(toast.id);
        onClose?.();
      }, 150); // Animation duration
    }, [ctx, toast.id, onClose]);

    // Swipe to dismiss
    const [startX, setStartX] = React.useState(0);
    const [offsetX, setOffsetX] = React.useState(0);

    const handlePointerDown = (e: React.PointerEvent) => {
      setStartX(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (startX === 0) return;
      const diff = e.clientX - startX;
      setOffsetX(diff);
    };

    const handlePointerUp = () => {
      if (Math.abs(offsetX) > 100) {
        handleClose();
      } else {
        setOffsetX(0);
      }
      setStartX(0);
    };

    return (
      <li
        ref={ref}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-state={isLeaving ? "closed" : "open"}
        data-type={toast.type || "default"}
        data-swipe-direction={offsetX > 0 ? "right" : offsetX < 0 ? "left" : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          pointerEvents: "auto",
          transform: offsetX ? `translateX(${offsetX}px)` : undefined,
          opacity: isLeaving ? 0 : 1,
          transition: startX === 0 ? "all 150ms ease-out" : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </li>
    );
  }
);

Root.displayName = "Toast.Root";

export const Title = React.forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} {...props} />;
  }
);

Title.displayName = "Toast.Title";

export const Description = React.forwardRef<HTMLDivElement, ToastDescriptionProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} {...props} />;
  }
);

Description.displayName = "Toast.Description";

export const Action = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ altText, ...props }, ref) => {
    return <button ref={ref} aria-label={altText} {...props} />;
  }
);

Action.displayName = "Toast.Action";

export const Close = React.forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label="Close"
        onClick={onClick}
        {...props}
      />
    );
  }
);

Close.displayName = "Toast.Close";
