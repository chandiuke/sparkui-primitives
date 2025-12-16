import * as React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size,
  arrow,
  type Placement,
  type Strategy,
} from "@floating-ui/react-dom";

export interface UseFloatingOptions {
  placement?: Placement;
  strategy?: Strategy;
  offset?: number;
  flip?: boolean;
  shift?: boolean;
  matchWidth?: boolean;
  arrowPadding?: number;
}

export function useFloatingPosition(options: UseFloatingOptions = {}) {
  const {
    placement = "bottom-start",
    strategy = "absolute",
    offset: offsetValue = 4,
    flip: enableFlip = true,
    shift: enableShift = true,
    matchWidth = false,
    arrowPadding = 8,
  } = options;

  const arrowRef = React.useRef<HTMLDivElement>(null);

  const middleware = React.useMemo(() => {
    const mw = [offset(offsetValue)];

    if (enableFlip) {
      mw.push(flip({ padding: 8 }));
    }

    if (enableShift) {
      mw.push(shift({ padding: 8 }));
    }

    if (matchWidth) {
      mw.push(
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              minWidth: `${rects.reference.width}px`,
            });
          },
        })
      );
    }

    if (arrowRef.current) {
      mw.push(arrow({ element: arrowRef.current, padding: arrowPadding }));
    }

    return mw;
  }, [offsetValue, enableFlip, enableShift, matchWidth, arrowPadding]);

  const floating = useFloating({
    placement,
    strategy,
    middleware,
    whileElementsMounted: autoUpdate,
  });

  return {
    ...floating,
    arrowRef,
  };
}

export type { Placement, Strategy };
