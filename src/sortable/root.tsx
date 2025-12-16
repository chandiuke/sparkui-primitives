import * as React from "react";
import { SortableContext } from "./context";
import type { SortableRootProps } from "./types";

export const Root = React.forwardRef<HTMLDivElement, SortableRootProps>(
  ({ items, onReorder, orientation = "vertical", children, ...props }, ref) => {
    const [activeId, setActiveId] = React.useState<string | null>(null);
    const [overId, setOverId] = React.useState<string | null>(null);

    const handleReorder = React.useCallback(
      (newItems: string[]) => {
        onReorder(newItems);
      },
      [onReorder]
    );

    // Handle drop
    React.useEffect(() => {
      if (activeId && overId && activeId !== overId) {
        const oldIndex = items.indexOf(activeId);
        const newIndex = items.indexOf(overId);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newItems = [...items];
          newItems.splice(oldIndex, 1);
          newItems.splice(newIndex, 0, activeId);
          handleReorder(newItems);
        }
      }
    }, [activeId, overId, items, handleReorder]);

    const contextValue = React.useMemo(
      () => ({
        items,
        activeId,
        overId,
        setActiveId,
        setOverId,
        onReorder: handleReorder,
        orientation,
      }),
      [items, activeId, overId, handleReorder, orientation]
    );

    return (
      <SortableContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="list"
          aria-label="Sortable list"
          data-sortable-root=""
          data-orientation={orientation}
          {...props}
        >
          {children}
        </div>
      </SortableContext.Provider>
    );
  }
);

Root.displayName = "Sortable.Root";
