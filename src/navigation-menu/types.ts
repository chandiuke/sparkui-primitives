export type NavigationMenuOrientation = "horizontal" | "vertical";
export type NavigationMenuDir = "ltr" | "rtl";

export interface NavigationMenuContextValue {
  value: string;
  setValue: (value: string) => void;
  previousValue: string;
  baseId: string;
  dir: NavigationMenuDir;
  orientation: NavigationMenuOrientation;
  rootNavigationMenu: boolean;
  indicatorTrack: HTMLDivElement | null;
  onIndicatorTrackChange: (track: HTMLDivElement | null) => void;
  viewport: HTMLDivElement | null;
  onViewportChange: (viewport: HTMLDivElement | null) => void;
  onTriggerEnter: (itemValue: string) => void;
  onTriggerLeave: () => void;
  onContentEnter: () => void;
  onContentLeave: () => void;
}

export interface NavigationMenuItemContextValue {
  value: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  wasEscapeCloseRef: React.MutableRefObject<boolean>;
}

export interface NavigationMenuRootProps extends React.HTMLAttributes<HTMLElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  dir?: NavigationMenuDir;
  orientation?: NavigationMenuOrientation;
  delayDuration?: number;
  skipDelayDuration?: number;
}

export interface NavigationMenuListProps extends React.HTMLAttributes<HTMLUListElement> {}

export interface NavigationMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value?: string;
}

export interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean;
}

export interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  onSelect?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface NavigationMenuViewportProps extends React.HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean;
}

export interface NavigationMenuIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean;
}
