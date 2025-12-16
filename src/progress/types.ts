export interface ProgressContextValue {
  value: number | null;
  max: number;
  getValueLabel: (value: number, max: number) => string;
}

export interface ProgressRootProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number | null;
  max?: number;
  getValueLabel?: (value: number, max: number) => string;
}

export interface ProgressIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}
