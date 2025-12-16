import * as React from "react";
import { useScrollAreaContext, ScrollbarContext } from "./context";
import type { ScrollAreaScrollbarProps, ScrollAreaThumbProps, ScrollAreaCornerProps } from "./types";

export const Scrollbar = React.forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(
  ({ orientation = "vertical", forceMount, children, style, ...props }, ref) => {
    const ctx = useScrollAreaContext();
    const [thumb, setThumb] = React.useState<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
      if (orientation === "horizontal") {
        ctx.onScrollbarXEnabledChange(true);
        return () => ctx.onScrollbarXEnabledChange(false);
      } else {
        ctx.onScrollbarYEnabledChange(true);
        return () => ctx.onScrollbarYEnabledChange(false);
      }
    }, [orientation, ctx]);

    // Show/hide based on type
    React.useEffect(() => {
      if (ctx.type === "always") {
        setIsVisible(true);
      } else if (ctx.type === "auto" || ctx.type === "scroll") {
        const viewport = ctx.viewportRef.current;
        if (!viewport) return;

        const checkOverflow = () => {
          if (orientation === "horizontal") {
            setIsVisible(viewport.scrollWidth > viewport.clientWidth);
          } else {
            setIsVisible(viewport.scrollHeight > viewport.clientHeight);
          }
        };

        checkOverflow();
        const observer = new ResizeObserver(checkOverflow);
        observer.observe(viewport);
        return () => observer.disconnect();
      }
    }, [ctx.type, ctx.viewportRef, orientation]);

    const scrollbarContext = React.useMemo(
      () => ({
        orientation,
        hasThumb: !!thumb,
        onThumbChange: setThumb,
        onThumbPointerDown: () => {},
        onThumbPointerUp: () => {},
      }),
      [orientation, thumb]
    );

    if (!forceMount && !isVisible && ctx.type !== "always") {
      return null;
    }

    return (
      <ScrollbarContext.Provider value={scrollbarContext}>
        <div
          ref={ref}
          data-orientation={orientation}
          data-state={isVisible ? "visible" : "hidden"}
          style={{
            position: "absolute",
            ...(orientation === "vertical"
              ? {
                  top: 0,
                  right: ctx.dir === "ltr" ? 0 : undefined,
                  left: ctx.dir === "rtl" ? 0 : undefined,
                  bottom: 0,
                  width: 10,
                }
              : {
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 10,
                }),
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      </ScrollbarContext.Provider>
    );
  }
);

Scrollbar.displayName = "ScrollArea.Scrollbar";

export const Thumb = React.forwardRef<HTMLDivElement, ScrollAreaThumbProps>(
  ({ style, ...props }, ref) => {
    const ctx = useScrollAreaContext();
    const scrollbarCtx = React.useContext(ScrollbarContext);
    const [thumbSize, setThumbSize] = React.useState(0);
    const [thumbPosition, setThumbPosition] = React.useState(0);

    React.useEffect(() => {
      const viewport = ctx.viewportRef.current;
      if (!viewport || !scrollbarCtx) return;

      const updateThumb = () => {
        if (scrollbarCtx.orientation === "vertical") {
          const ratio = viewport.clientHeight / viewport.scrollHeight;
          setThumbSize(Math.max(ratio * viewport.clientHeight, 20));
          const scrollRatio =
            viewport.scrollTop / (viewport.scrollHeight - viewport.clientHeight);
          setThumbPosition(
            scrollRatio * (viewport.clientHeight - thumbSize)
          );
        } else {
          const ratio = viewport.clientWidth / viewport.scrollWidth;
          setThumbSize(Math.max(ratio * viewport.clientWidth, 20));
          const scrollRatio =
            viewport.scrollLeft / (viewport.scrollWidth - viewport.clientWidth);
          setThumbPosition(scrollRatio * (viewport.clientWidth - thumbSize));
        }
      };

      updateThumb();
      viewport.addEventListener("scroll", updateThumb);
      return () => viewport.removeEventListener("scroll", updateThumb);
    }, [ctx.viewportRef, scrollbarCtx, thumbSize]);

    if (!scrollbarCtx) return null;

    return (
      <div
        ref={ref}
        data-scroll-area-thumb=""
        style={{
          position: "absolute",
          borderRadius: 9999,
          background: "rgba(0, 0, 0, 0.3)",
          ...(scrollbarCtx.orientation === "vertical"
            ? {
                width: "100%",
                height: thumbSize,
                top: thumbPosition,
              }
            : {
                height: "100%",
                width: thumbSize,
                left: thumbPosition,
              }),
          ...style,
        }}
        {...props}
      />
    );
  }
);

Thumb.displayName = "ScrollArea.Thumb";

export const Corner = React.forwardRef<HTMLDivElement, ScrollAreaCornerProps>(
  ({ style, ...props }, ref) => {
    const ctx = useScrollAreaContext();

    if (!ctx.scrollbarXEnabled || !ctx.scrollbarYEnabled) {
      return null;
    }

    return (
      <div
        ref={ref}
        data-scroll-area-corner=""
        style={{
          position: "absolute",
          right: ctx.dir === "ltr" ? 0 : undefined,
          left: ctx.dir === "rtl" ? 0 : undefined,
          bottom: 0,
          width: 10,
          height: 10,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Corner.displayName = "ScrollArea.Corner";
