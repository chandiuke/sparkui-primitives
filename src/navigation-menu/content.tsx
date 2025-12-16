import * as React from "react";
import { useNavigationMenuContext, NavigationMenuItemContext } from "./context";
import type {
  NavigationMenuContentProps,
  NavigationMenuViewportProps,
  NavigationMenuIndicatorProps,
} from "./types";

export const Content = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ forceMount, children, onPointerEnter, onPointerLeave, ...props }, ref) => {
    const ctx = useNavigationMenuContext();
    const itemCtx = useNavigationMenuItemContext();
    const isOpen = ctx.value === itemCtx.value;

    const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
      ctx.onContentEnter();
      onPointerEnter?.(e);
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
      ctx.onContentLeave();
      onPointerLeave?.(e);
    };

    if (!forceMount && !isOpen) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={`${ctx.baseId}-content-${itemCtx.value}`}
        aria-labelledby={`${ctx.baseId}-trigger-${itemCtx.value}`}
        data-state={isOpen ? "open" : "closed"}
        data-orientation={ctx.orientation}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Content.displayName = "NavigationMenu.Content";

function useNavigationMenuItemContext() {
  const ctx = React.useContext(NavigationMenuItemContext);
  if (!ctx) {
    throw new Error(
      "NavigationMenu.Trigger/Content must be used within a NavigationMenu.Item"
    );
  }
  return ctx;
}

export const Viewport = React.forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
  ({ forceMount, style, ...props }, ref) => {
    const ctx = useNavigationMenuContext();
    const isOpen = ctx.value !== "";

    React.useEffect(() => {
      const node = (ref as React.RefObject<HTMLDivElement>)?.current;
      if (node) {
        ctx.onViewportChange(node);
      }
      return () => ctx.onViewportChange(null);
    }, [ctx, ref]);

    if (!forceMount && !isOpen) {
      return null;
    }

    return (
      <div
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        data-orientation={ctx.orientation}
        style={{
          position: "relative",
          ...style,
        }}
        {...props}
      />
    );
  }
);

Viewport.displayName = "NavigationMenu.Viewport";

export const Indicator = React.forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>(
  ({ forceMount, style, children, ...props }, ref) => {
    const ctx = useNavigationMenuContext();
    const isVisible = ctx.value !== "";

    if (!forceMount && !isVisible) {
      return null;
    }

    return (
      <div
        ref={ref}
        aria-hidden
        data-state={isVisible ? "visible" : "hidden"}
        data-orientation={ctx.orientation}
        style={{
          position: "absolute",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Indicator.displayName = "NavigationMenu.Indicator";
