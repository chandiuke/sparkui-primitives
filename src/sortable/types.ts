import * as React from "react";

export interface SortableContextValue {
  items: string[];
  activeId: string | null;
  overId: string | null;
  setActiveId: (id: string | null) => void;
  setOverId: (id: string | null) => void;
  onReorder: (items: string[]) => void;
  orientation: "vertical" | "horizontal";
}

export interface SortableRootProps extends React.HTMLAttributes<HTMLDivElement> {
  items: string[];
  onReorder: (items: string[]) => void;
  orientation?: "vertical" | "horizontal";
}

export interface SortableItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  disabled?: boolean;
}

export interface SortableHandleProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SortableOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}
