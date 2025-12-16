import * as React from "react";
import type { NavigationMenuContextValue, NavigationMenuItemContextValue } from "./types";

export const NavigationMenuContext =
  React.createContext<NavigationMenuContextValue | null>(null);

export function useNavigationMenuContext() {
  const ctx = React.useContext(NavigationMenuContext);
  if (!ctx) {
    throw new Error(
      "NavigationMenu components must be used within a NavigationMenu.Root"
    );
  }
  return ctx;
}

export const NavigationMenuItemContext =
  React.createContext<NavigationMenuItemContextValue | null>(null);

export function useNavigationMenuItemContext() {
  const ctx = React.useContext(NavigationMenuItemContext);
  if (!ctx) {
    throw new Error(
      "NavigationMenu.Trigger/Content must be used within a NavigationMenu.Item"
    );
  }
  return ctx;
}
