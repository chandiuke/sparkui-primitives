import * as React from "react";

export interface UseArrowNavigationOptions {
  containerRef: React.RefObject<HTMLElement>;
  itemSelector?: string;
  orientation?: "vertical" | "horizontal" | "both";
  loop?: boolean;
  onNavigate?: (element: HTMLElement, index: number) => void;
}

export function useArrowNavigation(options: UseArrowNavigationOptions) {
  const {
    containerRef,
    itemSelector = "[role='option'], [role='menuitem']",
    orientation = "vertical",
    loop = true,
    onNavigate,
  } = options;

  const [activeIndex, setActiveIndex] = React.useState(-1);

  const getItems = React.useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(itemSelector)
    ).filter((el) => !el.hasAttribute("data-disabled"));
  }, [containerRef, itemSelector]);

  const focusItem = React.useCallback(
    (index: number) => {
      const items = getItems();
      if (items.length === 0) return;

      let newIndex = index;

      // Handle bounds
      if (loop) {
        if (newIndex < 0) newIndex = items.length - 1;
        if (newIndex >= items.length) newIndex = 0;
      } else {
        newIndex = Math.max(0, Math.min(newIndex, items.length - 1));
      }

      const item = items[newIndex];
      if (item) {
        item.focus();
        setActiveIndex(newIndex);
        onNavigate?.(item, newIndex);
      }
    },
    [getItems, loop, onNavigate]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const items = getItems();
      if (items.length === 0) return;

      const currentIndex = activeIndex >= 0 ? activeIndex : -1;

      switch (e.key) {
        case "ArrowDown":
          if (orientation === "vertical" || orientation === "both") {
            e.preventDefault();
            focusItem(currentIndex + 1);
          }
          break;
        case "ArrowUp":
          if (orientation === "vertical" || orientation === "both") {
            e.preventDefault();
            focusItem(currentIndex - 1);
          }
          break;
        case "ArrowRight":
          if (orientation === "horizontal" || orientation === "both") {
            e.preventDefault();
            focusItem(currentIndex + 1);
          }
          break;
        case "ArrowLeft":
          if (orientation === "horizontal" || orientation === "both") {
            e.preventDefault();
            focusItem(currentIndex - 1);
          }
          break;
        case "Home":
          e.preventDefault();
          focusItem(0);
          break;
        case "End":
          e.preventDefault();
          focusItem(items.length - 1);
          break;
      }
    },
    [activeIndex, focusItem, getItems, orientation]
  );

  // Reset active index when container changes
  const resetNavigation = React.useCallback(() => {
    setActiveIndex(-1);
  }, []);

  // Focus first item
  const focusFirst = React.useCallback(() => {
    focusItem(0);
  }, [focusItem]);

  // Focus last item
  const focusLast = React.useCallback(() => {
    const items = getItems();
    focusItem(items.length - 1);
  }, [focusItem, getItems]);

  return {
    activeIndex,
    handleKeyDown,
    focusItem,
    focusFirst,
    focusLast,
    resetNavigation,
  };
}
