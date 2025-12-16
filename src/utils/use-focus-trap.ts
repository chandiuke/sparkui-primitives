import * as React from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[contenteditable]",
  "audio[controls]",
  "video[controls]",
  'details > summary:first-of-type',
].join(",");

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  return elements.filter((el) => {
    return el.offsetParent !== null && getComputedStyle(el).visibility !== "hidden";
  });
}

export interface UseFocusTrapOptions {
  enabled?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
  returnFocus?: boolean;
}

export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement>,
  options: UseFocusTrapOptions = {}
) {
  const { enabled = true, initialFocus, returnFocus = true } = options;
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!enabled || !containerRef.current) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus initial element or first focusable
    const focusInitial = () => {
      if (initialFocus?.current) {
        initialFocus.current.focus();
      } else {
        const focusable = getFocusableElements(containerRef.current!);
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          containerRef.current?.focus();
        }
      }
    };

    // Small delay to ensure DOM is ready
    requestAnimationFrame(focusInitial);

    // Handle tab key to trap focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !containerRef.current) return;

      const focusable = getFocusableElements(containerRef.current);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      
      // Return focus to previous element
      if (returnFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [enabled, containerRef, initialFocus, returnFocus]);
}
