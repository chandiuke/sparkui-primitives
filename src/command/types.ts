import * as React from "react";

export interface CommandContextValue {
  search: string;
  setSearch: (search: string) => void;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  filteredItems: Set<string>;
  registerItem: (value: string, keywords?: string[]) => void;
  unregisterItem: (value: string) => void;
  onSelect?: (value: string) => void;
}

export interface CommandRootProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  filter?: (value: string, search: string, keywords?: string[]) => boolean;
  loop?: boolean;
}

export interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode;
}

export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  keywords?: string[];
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export interface CommandLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number;
}
