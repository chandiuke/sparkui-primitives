import * as React from "react";
import { useSortableContext, SortableItemContext, useSortableItemContext } from "./context";
import type { SortableItemProps, SortableHandleProps } from "./types";

export const Item = React.forwardRef<HTMLDivElement, SortableItemProps>(
  ({ id, disabled, children, style, ...props }, ref) => {
    const ctx = useSortableContext();
    const itemRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const startPos = React.useRef({ x: 0, y: 0 });

    const isActive = ctx.activeId === id;
    const isOver = ctx.overId === id;

    const handleDragStart = (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      
      setIsDragging(true);
      ctx.setActiveId(id);
      startPos.current = { x: e.clientX, y: e.clientY };

      const handleMove = (moveEvent: PointerEvent) => {
        const dx = moveEvent.clientX - startPos.current.x;
        const dy = moveEvent.clientY - startPos.current.y;
        setPosition({ x: dx, y: dy });

        // Find element under cursor
        const elements = document.elementsFromPoint(moveEvent.clientX, moveEvent.clientY);
        const overElement = elements.find((el) => el.hasAttribute("data-sortable-item"));
        const overId = overElement?.getAttribute("data-sortable-id");
        if (overId && overId !== id) {
          ctx.setOverId(overId);
        }
      };

      const handleEnd = () => {
        setIsDragging(false);
        setPosition({ x: 0, y: 0 });
        ctx.setActiveId(null);
        ctx.setOverId(null);
        document.removeEventListener("pointermove", handleMove);
        document.removeEventListener("pointerup", handleEnd);
      };

      document.addEventListener("pointermove", handleMove);
      document.addEventListener("pointerup", handleEnd);
    };

    const dragListeners = {
      onPointerDown: handleDragStart,
    };

    const dragAttributes = {
      "aria-grabbed": isDragging,
      "aria-dropeffect": "move" as const,
    };

    const itemContext = React.useMemo(
      () => ({
        id,
        isDragging,
        attributes: dragAttributes,
        listeners: dragListeners,
      }),
      [id, isDragging]
    );

    return (
      <SortableItemContext.Provider value={itemContext}>
        <div
          ref={ref}
          role="listitem"
          data-sortable-item=""
          data-sortable-id={id}
          data-dragging={isDragging ? "" : undefined}
          data-over={isOver ? "" : undefined}
          data-disabled={disabled ? "" : undefined}
          style={{
            ...style,
            transform: isDragging
              ? `translate(${position.x}px, ${position.y}px)`
              : undefined,
            zIndex: isDragging ? 999 : undefined,
            cursor: disabled ? "default" : "grab",
            touchAction: "none",
            userSelect: "none",
          }}
          {...dragAttributes}
          {...(disabled ? {} : dragListeners)}
          {...props}
        >
          {children}
        </div>
      </SortableItemContext.Provider>
    );
  }
);

Item.displayName = "Sortable.Item";

export const Handle = React.forwardRef<HTMLDivElement, SortableHandleProps>(
  ({ children, style, ...props }, ref) => {
    const ctx = useSortableItemContext();

    return (
      <div
        ref={ref}
        data-sortable-handle=""
        style={{
          ...style,
          cursor: "grab",
          touchAction: "none",
        }}
        {...ctx.attributes}
        {...ctx.listeners}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Handle.displayName = "Sortable.Handle";
