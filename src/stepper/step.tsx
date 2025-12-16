import * as React from "react";
import { useStepperContext, StepContext, useStepContext } from "./context";
import type {
  StepperStepProps,
  StepperTriggerProps,
  StepperTitleProps,
  StepperDescriptionProps,
  StepperSeparatorProps,
  StepperListProps,
} from "./types";

export const List = React.forwardRef<HTMLDivElement, StepperListProps>(
  ({ children, ...props }, ref) => {
    const ctx = useStepperContext();

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={ctx.orientation}
        data-stepper-list=""
        {...props}
      >
        {children}
      </div>
    );
  }
);

List.displayName = "Stepper.List";

export const Step = React.forwardRef<HTMLDivElement, StepperStepProps>(
  ({ step, completed: completedProp, disabled, children, ...props }, ref) => {
    const ctx = useStepperContext();
    const isActive = ctx.currentStep === step;
    const isCompleted = completedProp ?? ctx.completedSteps.has(step);
    const isDisabled = disabled ?? false;

    const stepContext = React.useMemo(
      () => ({
        step,
        isActive,
        isCompleted,
        isDisabled,
      }),
      [step, isActive, isCompleted, isDisabled]
    );

    return (
      <StepContext.Provider value={stepContext}>
        <div
          ref={ref}
          role="tab"
          aria-selected={isActive}
          aria-disabled={isDisabled}
          data-stepper-step=""
          data-step={step}
          data-state={isActive ? "active" : isCompleted ? "completed" : "inactive"}
          data-disabled={isDisabled ? "" : undefined}
          {...props}
        >
          {children}
        </div>
      </StepContext.Provider>
    );
  }
);

Step.displayName = "Stepper.Step";

export const Trigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  ({ onClick, children, ...props }, ref) => {
    const rootCtx = useStepperContext();
    const stepCtx = useStepContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!stepCtx.isDisabled) {
        rootCtx.goToStep(stepCtx.step);
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={stepCtx.isActive}
        disabled={stepCtx.isDisabled}
        data-stepper-trigger=""
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Trigger.displayName = "Stepper.Trigger";

export const Title = React.forwardRef<HTMLDivElement, StepperTitleProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} data-stepper-title="" {...props} />;
  }
);

Title.displayName = "Stepper.Title";

export const Description = React.forwardRef<HTMLDivElement, StepperDescriptionProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} data-stepper-description="" {...props} />;
  }
);

Description.displayName = "Stepper.Description";

export const Separator = React.forwardRef<HTMLDivElement, StepperSeparatorProps>(
  ({ ...props }, ref) => {
    const ctx = useStepperContext();

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={ctx.orientation === "horizontal" ? "vertical" : "horizontal"}
        data-stepper-separator=""
        {...props}
      />
    );
  }
);

Separator.displayName = "Stepper.Separator";
