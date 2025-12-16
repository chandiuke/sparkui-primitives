export type ScrollAreaType = "auto" | "always" | "scroll" | "hover";
export type ScrollAreaDir = "ltr" | "rtl";

export interface ScrollAreaContextValue {
  type: ScrollAreaType;
  dir: ScrollAreaDir;
  scrollbarXEnabled: boolean;
  scrollbarYEnabled: boolean;
  viewportRef: React.RefObject<HTMLDivElement>;
  onScrollbarXEnabledChange: (enabled: boolean) => void;
  onScrollbarYEnabledChange: (enabled: boolean) => void;
}

export interface ScrollAreaRootProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: ScrollAreaType;
  dir?: ScrollAreaDir;
  scrollHideDelay?: number;
}

export interface ScrollAreaViewportProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface ScrollAreaScrollbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  forceMount?: boolean;
}

export interface ScrollAreaThumbProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface ScrollAreaCornerProps
  extends React.HTMLAttributes<HTMLDivElement> {}
