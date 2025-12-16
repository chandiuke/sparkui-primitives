import * as React from "react";
import { useSliderContext } from "./context";
import type { SliderTrackProps, SliderRangeProps } from "./types";

export const Track = React.forwardRef<HTMLDivElement, SliderTrackProps>(
  ({ ...props }, ref) => {
    const ctx = useSliderContext();

    return (
      <div
        ref={ref}
        data-disabled={ctx.disabled ? "" : undefined}
        data-orientation={ctx.orientation}
        {...props}
      />
    );
  }
);

Track.displayName = "Slider.Track";

export const Range = React.forwardRef<HTMLDivElement, SliderRangeProps>(
  ({ style, ...props }, ref) => {
    const ctx = useSliderContext();
    const minValue = Math.min(...ctx.value);
    const maxValue = Math.max(...ctx.value);
    const minPercent = ((minValue - ctx.min) / (ctx.max - ctx.min)) * 100;
    const maxPercent = ((maxValue - ctx.min) / (ctx.max - ctx.min)) * 100;

    const rangeStyle: React.CSSProperties =
      ctx.orientation === "horizontal"
        ? { left: `${minPercent}%`, right: `${100 - maxPercent}%` }
        : { bottom: `${minPercent}%`, top: `${100 - maxPercent}%` };

    return (
      <div
        ref={ref}
        data-disabled={ctx.disabled ? "" : undefined}
        data-orientation={ctx.orientation}
        style={{ position: "absolute", ...rangeStyle, ...style }}
        {...props}
      />
    );
  }
);

Range.displayName = "Slider.Range";
