import * as React from "react";
import { ScrollAreaContext } from "./context";
import type { ScrollAreaRootProps } from "./types";

export const Root = React.forwardRef<HTMLDivElement, ScrollAreaRootProps>(
  ({ type = "hover", dir = "ltr", scrollHideDelay = 600, children, style, ...props }, ref) => {
    const [scrollbarXEnabled, setScrollbarXEnabled] = React.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = React.useState(false);
    const viewportRef = React.useRef<HTMLDivElement>(null);

    const contextValue = React.useMemo(
      () => ({
        type,
        dir,
        scrollbarXEnabled,
        scrollbarYEnabled,
        viewportRef,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
      }),
      [type, dir, scrollbarXEnabled, scrollbarYEnabled]
    );

    return (
      <ScrollAreaContext.Provider value={contextValue}>
        <div
          ref={ref}
          dir={dir}
          data-scroll-area-root=""
          style={{
            position: "relative",
            overflow: "hidden",
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      </ScrollAreaContext.Provider>
    );
  }
);

Root.displayName = "ScrollArea.Root";
