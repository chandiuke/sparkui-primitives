import * as React from "react";
import { useSliderContext } from "./context";
import type { SliderThumbProps } from "./types";

export const Thumb = React.forwardRef<HTMLDivElement, SliderThumbProps>(
  ({ index = 0, style, onKeyDown, onPointerDown, ...props }, ref) => {
    const ctx = useSliderContext();
    const thumbValue = ctx.value[index] ?? ctx.min;
    const percent = ((thumbValue - ctx.min) / (ctx.max - ctx.min)) * 100;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (ctx.disabled) return;

      let newValue = thumbValue;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          newValue = Math.min(thumbValue + ctx.step, ctx.max);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          newValue = Math.max(thumbValue - ctx.step, ctx.min);
          break;
        case "Home":
          newValue = ctx.min;
          break;
        case "End":
          newValue = ctx.max;
          break;
        default:
          onKeyDown?.(e);
          return;
      }

      e.preventDefault();
      const newValues = [...ctx.value];
      newValues[index] = newValue;
      ctx.onValueChange(newValues);
      ctx.onValueCommit(newValues);
      onKeyDown?.(e);
    };

    const positionStyle: React.CSSProperties =
      ctx.orientation === "horizontal"
        ? { left: `${percent}%`, transform: "translateX(-50%)" }
        : { bottom: `${percent}%`, transform: "translateY(50%)" };

    return (
      <div
        ref={ref}
        role="slider"
        tabIndex={ctx.disabled ? -1 : 0}
        aria-valuemin={ctx.min}
        aria-valuemax={ctx.max}
        aria-valuenow={thumbValue}
        aria-disabled={ctx.disabled}
        aria-orientation={ctx.orientation}
        data-disabled={ctx.disabled ? "" : undefined}
        data-orientation={ctx.orientation}
        style={{ position: "absolute", ...positionStyle, ...style }}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);

Thumb.displayName = "Slider.Thumb";
