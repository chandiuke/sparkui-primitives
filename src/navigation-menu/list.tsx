import * as React from "react";
import { useNavigationMenuContext, NavigationMenuItemContext } from "./context";
import type {
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuLinkProps,
} from "./types";

export const List = React.forwardRef<HTMLUListElement, NavigationMenuListProps>(
  ({ children, style, ...props }, ref) => {
    const ctx = useNavigationMenuContext();

    return (
      <ul
        ref={ref}
        data-orientation={ctx.orientation}
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: ctx.orientation === "horizontal" ? "row" : "column",
          ...style,
        }}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

List.displayName = "NavigationMenu.List";

export const Item = React.forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ value, children, ...props }, ref) => {
    const itemValue = value || React.useId();
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const wasEscapeCloseRef = React.useRef(false);

    const contextValue = React.useMemo(
      () => ({
        value: itemValue,
        triggerRef,
        contentRef,
        wasEscapeCloseRef,
      }),
      [itemValue]
    );

    return (
      <NavigationMenuItemContext.Provider value={contextValue}>
        <li ref={ref} {...props}>
          {children}
        </li>
      </NavigationMenuItemContext.Provider>
    );
  }
);

Item.displayName = "NavigationMenu.Item";

export const Trigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ children, onPointerEnter, onPointerLeave, onClick, ...props }, ref) => {
    const ctx = useNavigationMenuContext();
    const itemCtx = useNavigationMenuItemContext();
    const isOpen = ctx.value === itemCtx.value;

    const handlePointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
      ctx.onTriggerEnter(itemCtx.value);
      onPointerEnter?.(e);
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
      ctx.onTriggerLeave();
      onPointerLeave?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.setValue(isOpen ? "" : itemCtx.value);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        id={`${ctx.baseId}-trigger-${itemCtx.value}`}
        aria-expanded={isOpen}
        aria-controls={`${ctx.baseId}-content-${itemCtx.value}`}
        data-state={isOpen ? "open" : "closed"}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Trigger.displayName = "NavigationMenu.Trigger";

function useNavigationMenuItemContext() {
  const ctx = React.useContext(NavigationMenuItemContext);
  if (!ctx) {
    throw new Error(
      "NavigationMenu.Trigger/Content must be used within a NavigationMenu.Item"
    );
  }
  return ctx;
}

export const Link = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ active, onSelect, onClick, children, ...props }, ref) => {
    const ctx = useNavigationMenuContext();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onSelect?.(e);
      if (!e.defaultPrevented) {
        ctx.setValue("");
      }
      onClick?.(e);
    };

    return (
      <a
        ref={ref}
        data-active={active ? "" : undefined}
        aria-current={active ? "page" : undefined}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = "NavigationMenu.Link";
