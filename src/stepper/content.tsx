import * as React from "react";
import { useStepperContext } from "./context";
import type { StepperContentProps, StepperPrevProps, StepperNextProps } from "./types";

export const Content = React.forwardRef<HTMLDivElement, StepperContentProps>(
  ({ step, forceMount, children, ...props }, ref) => {
    const ctx = useStepperContext();
    const isActive = ctx.currentStep === step;

    if (!forceMount && !isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        aria-hidden={!isActive}
        data-stepper-content=""
        data-step={step}
        data-state={isActive ? "active" : "inactive"}
        hidden={!isActive}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Content.displayName = "Stepper.Content";

export const Prev = React.forwardRef<HTMLButtonElement, StepperPrevProps>(
  ({ onClick, disabled, children, ...props }, ref) => {
    const ctx = useStepperContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.prevStep();
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled ?? ctx.isFirstStep}
        data-stepper-prev=""
        onClick={handleClick}
        {...props}
      >
        {children ?? "Previous"}
      </button>
    );
  }
);

Prev.displayName = "Stepper.Prev";

export const Next = React.forwardRef<HTMLButtonElement, StepperNextProps>(
  ({ onClick, disabled, children, ...props }, ref) => {
    const ctx = useStepperContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.nextStep();
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled ?? ctx.isLastStep}
        data-stepper-next=""
        onClick={handleClick}
        {...props}
      >
        {children ?? "Next"}
      </button>
    );
  }
);

Next.displayName = "Stepper.Next";
