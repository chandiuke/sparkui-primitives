import * as React from "react";

export type AnimationName = 
  | "fadeIn" | "fadeOut"
  | "slideInUp" | "slideInDown" | "slideInLeft" | "slideInRight"
  | "slideOutUp" | "slideOutDown" | "slideOutLeft" | "slideOutRight"
  | "scaleIn" | "scaleOut"
  | "none";

export interface UseAnimationOptions {
  open: boolean;
  duration?: number;
  enterAnimation?: AnimationName;
  exitAnimation?: AnimationName;
  onAnimationEnd?: () => void;
}

const animations: Record<AnimationName, React.CSSProperties> = {
  none: {},
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
  slideInUp: { transform: "translateY(0)", opacity: 1 },
  slideInDown: { transform: "translateY(0)", opacity: 1 },
  slideInLeft: { transform: "translateX(0)", opacity: 1 },
  slideInRight: { transform: "translateX(0)", opacity: 1 },
  slideOutUp: { transform: "translateY(-10px)", opacity: 0 },
  slideOutDown: { transform: "translateY(10px)", opacity: 0 },
  slideOutLeft: { transform: "translateX(-10px)", opacity: 0 },
  slideOutRight: { transform: "translateX(10px)", opacity: 0 },
  scaleIn: { transform: "scale(1)", opacity: 1 },
  scaleOut: { transform: "scale(0.95)", opacity: 0 },
};

const initialStyles: Record<AnimationName, React.CSSProperties> = {
  none: {},
  fadeIn: { opacity: 0 },
  fadeOut: { opacity: 1 },
  slideInUp: { transform: "translateY(10px)", opacity: 0 },
  slideInDown: { transform: "translateY(-10px)", opacity: 0 },
  slideInLeft: { transform: "translateX(-10px)", opacity: 0 },
  slideInRight: { transform: "translateX(10px)", opacity: 0 },
  slideOutUp: { transform: "translateY(0)", opacity: 1 },
  slideOutDown: { transform: "translateY(0)", opacity: 1 },
  slideOutLeft: { transform: "translateX(0)", opacity: 1 },
  slideOutRight: { transform: "translateX(0)", opacity: 1 },
  scaleIn: { transform: "scale(0.95)", opacity: 0 },
  scaleOut: { transform: "scale(1)", opacity: 1 },
};

export function useAnimation(options: UseAnimationOptions) {
  const {
    open,
    duration = 150,
    enterAnimation = "fadeIn",
    exitAnimation = "fadeOut",
    onAnimationEnd,
  } = options;

  const [isVisible, setIsVisible] = React.useState(open);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [currentAnimation, setCurrentAnimation] = React.useState<AnimationName>(
    open ? enterAnimation : "none"
  );

  React.useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsAnimating(true);
      setCurrentAnimation(enterAnimation);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onAnimationEnd?.();
      }, duration);
      
      return () => clearTimeout(timer);
    } else if (isVisible) {
      setIsAnimating(true);
      setCurrentAnimation(exitAnimation);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
        onAnimationEnd?.();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [open, duration, enterAnimation, exitAnimation, isVisible, onAnimationEnd]);

  const animationStyles: React.CSSProperties = React.useMemo(() => {
    if (!isAnimating && !open) return {};
    
    const baseStyle: React.CSSProperties = {
      transition: `all ${duration}ms ease-out`,
    };

    if (isAnimating) {
      if (open) {
        // Entering - start from initial, animate to final
        return {
          ...baseStyle,
          ...animations[currentAnimation],
        };
      } else {
        // Exiting - animate to exit state
        return {
          ...baseStyle,
          ...animations[currentAnimation],
        };
      }
    }

    return baseStyle;
  }, [isAnimating, open, duration, currentAnimation]);

  const initialStyle: React.CSSProperties = React.useMemo(() => {
    if (open && isAnimating) {
      return initialStyles[enterAnimation];
    }
    return {};
  }, [open, isAnimating, enterAnimation]);

  return {
    isVisible,
    isAnimating,
    animationStyles,
    initialStyle,
    // For data attributes
    dataState: open ? "open" : "closed",
    dataAnimating: isAnimating ? "" : undefined,
  };
}

// Hook for CSS-based animations using data attributes
export function useAnimationState(open: boolean, duration = 150) {
  const [state, setState] = React.useState<"closed" | "opening" | "open" | "closing">(
    open ? "open" : "closed"
  );

  React.useEffect(() => {
    if (open && state === "closed") {
      setState("opening");
      const timer = setTimeout(() => setState("open"), duration);
      return () => clearTimeout(timer);
    } else if (!open && (state === "open" || state === "opening")) {
      setState("closing");
      const timer = setTimeout(() => setState("closed"), duration);
      return () => clearTimeout(timer);
    }
  }, [open, state, duration]);

  return {
    state,
    isVisible: state !== "closed",
    isAnimating: state === "opening" || state === "closing",
    dataState: state,
  };
}
