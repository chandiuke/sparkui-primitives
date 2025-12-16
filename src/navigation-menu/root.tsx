import * as React from "react";
import { NavigationMenuContext } from "./context";
import type { NavigationMenuRootProps } from "./types";

export const Root = React.forwardRef<HTMLElement, NavigationMenuRootProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      dir = "ltr",
      orientation = "horizontal",
      delayDuration = 200,
      skipDelayDuration = 300,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [previousValue, setPreviousValue] = React.useState("");
    const [indicatorTrack, setIndicatorTrack] = React.useState<HTMLDivElement | null>(null);
    const [viewport, setViewport] = React.useState<HTMLDivElement | null>(null);
    const baseId = React.useId();

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const setValue = React.useCallback(
      (newValue: string) => {
        setPreviousValue(value);
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange, value]
    );

    const openTimerRef = React.useRef(0);
    const closeTimerRef = React.useRef(0);

    const handleTriggerEnter = React.useCallback(
      (itemValue: string) => {
        window.clearTimeout(closeTimerRef.current);
        openTimerRef.current = window.setTimeout(() => {
          setValue(itemValue);
        }, delayDuration);
      },
      [delayDuration, setValue]
    );

    const handleTriggerLeave = React.useCallback(() => {
      window.clearTimeout(openTimerRef.current);
      closeTimerRef.current = window.setTimeout(() => {
        setValue("");
      }, skipDelayDuration);
    }, [skipDelayDuration, setValue]);

    const handleContentEnter = React.useCallback(() => {
      window.clearTimeout(closeTimerRef.current);
    }, []);

    const handleContentLeave = React.useCallback(() => {
      closeTimerRef.current = window.setTimeout(() => {
        setValue("");
      }, skipDelayDuration);
    }, [skipDelayDuration, setValue]);

    React.useEffect(() => {
      return () => {
        window.clearTimeout(openTimerRef.current);
        window.clearTimeout(closeTimerRef.current);
      };
    }, []);

    const contextValue = React.useMemo(
      () => ({
        value,
        setValue,
        previousValue,
        baseId,
        dir,
        orientation,
        rootNavigationMenu: true,
        indicatorTrack,
        onIndicatorTrackChange: setIndicatorTrack,
        viewport,
        onViewportChange: setViewport,
        onTriggerEnter: handleTriggerEnter,
        onTriggerLeave: handleTriggerLeave,
        onContentEnter: handleContentEnter,
        onContentLeave: handleContentLeave,
      }),
      [
        value,
        setValue,
        previousValue,
        baseId,
        dir,
        orientation,
        indicatorTrack,
        viewport,
        handleTriggerEnter,
        handleTriggerLeave,
        handleContentEnter,
        handleContentLeave,
      ]
    );

    return (
      <NavigationMenuContext.Provider value={contextValue}>
        <nav
          ref={ref}
          aria-label="Main"
          dir={dir}
          data-orientation={orientation}
          {...props}
        >
          {children}
        </nav>
      </NavigationMenuContext.Provider>
    );
  }
);

Root.displayName = "NavigationMenu.Root";
