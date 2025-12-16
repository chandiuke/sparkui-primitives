import * as React from "react";

export interface SliderRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
}

export interface SliderTrackProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SliderRangeProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SliderThumbProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
}

export interface SliderContextValue {
  value: number[];
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  orientation: "horizontal" | "vertical";
  onValueChange: (value: number[]) => void;
  onValueCommit: (value: number[]) => void;
}
