import * as React from "react";
import { useSelectContext } from "./context";
import { useComposedRefs } from "../utils/compose-refs";
import { useFloatingPosition } from "../utils/use-floating";
import { useArrowNavigation } from "../utils/use-arrow-navigation";
import { useTypeahead } from "../utils/use-typeahead";
import type { SelectContentProps } from "./types";

export const Content = React.forwardRef<HTMLDivElement, SelectContentProps>(
  (
    {
      children,
      position = "popper",
      side = "bottom",
      sideOffset = 4,
      align = "start",
      avoidCollisions = true,
      collisionPadding = 8,
      style,
      ...props
    },
    ref
  ) => {
    const ctx = useSelectContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(contentRef, ref);

    // Floating UI positioning
    const placement = `${side}-${align === "center" ? "" : align}`.replace(/-$/, "") as any;
    const { refs, floatingStyles } = useFloatingPosition({
      placement,
      offset: sideOffset,
      flip: avoidCollisions,
      shift: avoidCollisions,
      matchWidth: true,
    });

    // Set reference to trigger
    React.useEffect(() => {
      if (ctx.triggerRef.current) {
        refs.setReference(ctx.triggerRef.current);
      }
    }, [ctx.triggerRef, refs]);

    // Arrow navigation
    const { handleKeyDown: handleArrowNav, focusFirst } = useArrowNavigation({
      containerRef: contentRef,
      itemSelector: "[role='option']:not([data-disabled])",
      orientation: "vertical",
      loop: true,
      onNavigate: (element) => {
        const value = element.getAttribute("data-value");
        if (value) {
          ctx.setHighlightedValue(value);
        }
      },
    });

    // Typeahead search
    const items = React.useMemo((): { value: string; textValue?: string; disabled?: boolean }[] => {
      const ctxItems = (ctx as any).items as Map<string, { value: string; textValue?: string; disabled?: boolean }> | undefined;
      if (!ctxItems) return [];
      return Array.from(ctxItems.values());
    }, [(ctx as any).items]);

    const { handleTypeahead } = useTypeahead({
      items,
      onMatch: (value) => {
        ctx.setHighlightedValue(value);
        // Focus the matched item
        const item = contentRef.current?.querySelector(`[data-value="${value}"]`) as HTMLElement | null;
        item?.focus();
      },
    });

    // Combined keyboard handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      handleArrowNav(e);

      // Typeahead for printable characters
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        handleTypeahead(e.key);
      }

      // Select on Enter
      if (e.key === "Enter" && ctx.highlightedValue) {
        e.preventDefault();
        ctx.onValueChange(ctx.highlightedValue);
        ctx.setOpen(false);
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
        const trigger = ctx.triggerRef.current;

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
    }, [ctx.open, ctx.triggerRef, ctx.setOpen]);

    if (!ctx.open) return null;

    return (
      <div
        ref={(node) => {
          if (node) {
            composedRef(node);
            refs.setFloating(node);
          }
        }}
        role="listbox"
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
          minWidth: "var(--radix-select-trigger-width)",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Content.displayName = "Select.Content";
