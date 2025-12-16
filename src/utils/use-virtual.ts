import * as React from "react";

export interface UseVirtualOptions {
  itemCount: number;
  itemHeight: number | ((index: number) => number);
  overscan?: number;
  containerRef: React.RefObject<HTMLElement>;
}

export interface VirtualItem {
  index: number;
  start: number;
  size: number;
  end: number;
}

export function useVirtual(options: UseVirtualOptions) {
  const { itemCount, itemHeight, overscan = 3, containerRef } = options;

  const [scrollTop, setScrollTop] = React.useState(0);
  const [containerHeight, setContainerHeight] = React.useState(0);

  // Calculate item size
  const getItemSize = React.useCallback(
    (index: number) => {
      return typeof itemHeight === "function" ? itemHeight(index) : itemHeight;
    },
    [itemHeight]
  );

  // Calculate total height
  const totalHeight = React.useMemo(() => {
    if (typeof itemHeight === "number") {
      return itemCount * itemHeight;
    }
    let total = 0;
    for (let i = 0; i < itemCount; i++) {
      total += getItemSize(i);
    }
    return total;
  }, [itemCount, itemHeight, getItemSize]);

  // Calculate visible range
  const { startIndex, endIndex, virtualItems } = React.useMemo(() => {
    if (containerHeight === 0) {
      return { startIndex: 0, endIndex: 0, virtualItems: [] };
    }

    let start = 0;
    let startIndex = 0;
    let accumulatedHeight = 0;

    // Find start index
    for (let i = 0; i < itemCount; i++) {
      const size = getItemSize(i);
      if (accumulatedHeight + size > scrollTop) {
        startIndex = i;
        start = accumulatedHeight;
        break;
      }
      accumulatedHeight += size;
    }

    // Apply overscan
    startIndex = Math.max(0, startIndex - overscan);

    // Recalculate start position with overscan
    start = 0;
    for (let i = 0; i < startIndex; i++) {
      start += getItemSize(i);
    }

    // Find end index
    let endIndex = startIndex;
    accumulatedHeight = start;
    while (accumulatedHeight < scrollTop + containerHeight && endIndex < itemCount) {
      accumulatedHeight += getItemSize(endIndex);
      endIndex++;
    }

    // Apply overscan
    endIndex = Math.min(itemCount, endIndex + overscan);

    // Build virtual items
    const virtualItems: VirtualItem[] = [];
    let currentStart = start;
    for (let i = startIndex; i < endIndex; i++) {
      const size = getItemSize(i);
      virtualItems.push({
        index: i,
        start: currentStart,
        size,
        end: currentStart + size,
      });
      currentStart += size;
    }

    return { startIndex, endIndex, virtualItems };
  }, [scrollTop, containerHeight, itemCount, getItemSize, overscan]);

  // Handle scroll
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    const handleResize = () => {
      setContainerHeight(container.clientHeight);
    };

    // Initial measurement
    handleResize();

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  // Scroll to index
  const scrollToIndex = React.useCallback(
    (index: number, align: "start" | "center" | "end" = "start") => {
      const container = containerRef.current;
      if (!container) return;

      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += getItemSize(i);
      }

      const itemSize = getItemSize(index);

      switch (align) {
        case "center":
          offset = offset - containerHeight / 2 + itemSize / 2;
          break;
        case "end":
          offset = offset - containerHeight + itemSize;
          break;
      }

      container.scrollTop = Math.max(0, offset);
    },
    [containerRef, containerHeight, getItemSize]
  );

  return {
    virtualItems,
    totalHeight,
    startIndex,
    endIndex,
    scrollToIndex,
    containerProps: {
      style: {
        height: "100%",
        overflow: "auto",
      } as React.CSSProperties,
    },
    innerProps: {
      style: {
        height: totalHeight,
        position: "relative",
      } as React.CSSProperties,
    },
  };
}
