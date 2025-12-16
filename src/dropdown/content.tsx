import * as React from "react";
import { useDropdownContext } from "./context";
import { useComposedRefs } from "../utils/compose-refs";
import { useFloatingPosition } from "../utils/use-floating";
import { useArrowNavigation } from "../utils/use-arrow-navigation";
import type { DropdownContentProps } from "./types";

export const Content = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, side = "bottom", sideOffset = 4, align = "start", avoidCollisions = true, style, ...props }, ref) => {
    const ctx = useDropdownContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(contentRef, ref);

    // Floating UI positioning
    const placement = `${side}-${align === "center" ? "" : align}`.replace(/-$/, "") as any;
    const { refs, floatingStyles } = useFloatingPosition({
      placement,
      offset: sideOffset,
      flip: avoidCollisions,
      shift: avoidCollisions,
    });

    // Set reference to trigger
    React.useEffect(() => {
      const trigger = document.getElementById(ctx.triggerId);
      if (trigger) {
        refs.setReference(trigger);
      }
    }, [ctx.triggerId, refs]);

    // Arrow navigation
    const { handleKeyDown: handleArrowNav, focusFirst } = useArrowNavigation({
      containerRef: contentRef,
      itemSelector: "[role='menuitem']:not([data-disabled])",
      orientation: "vertical",
      loop: true,
    });

    // Combined keyboard handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      handleArrowNav(e);

      if (e.key === "Escape") {
        ctx.setOpen(false);
        document.getElementById(ctx.triggerId)?.focus();
      }
    };

    // Focus first item when opened
    React.useEffect(() => {
      if (ctx.open) {
        requestAnimationFrame(() => {
          focusFirst();
        });
      }
    }, [ctx.open, focusFirst]);

    // Close on click outside
    React.useEffect(() => {
      if (!ctx.open) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        const trigger = document.getElementById(ctx.triggerId);

        if (
          contentRef.current &&
          !contentRef.current.contains(target) &&
          trigger &&
          !trigger.contains(target)
        ) {
          ctx.setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ctx.open, ctx.triggerId, ctx.setOpen]);

    if (!ctx.open) return null;

    return (
      <div
        ref={(node) => {
          if (node) {
            composedRef(node);
            refs.setFloating(node);
          }
        }}
        role="menu"
        id={ctx.contentId}
        aria-labelledby={ctx.triggerId}
        data-state={ctx.open ? "open" : "closed"}
        data-side={side}
        data-align={align}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        style={{
          ...floatingStyles,
          zIndex: 50,
          minWidth: "8rem",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Content.displayName = "Dropdown.Content";
