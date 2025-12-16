import * as React from "react";
import { StepperContext } from "./context";
import type { StepperRootProps } from "./types";

export const Root = React.forwardRef<HTMLDivElement, StepperRootProps>(
  (
    {
      currentStep: controlledStep,
      defaultStep = 0,
      onStepChange,
      orientation = "horizontal",
      linear = false,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledStep, setUncontrolledStep] = React.useState(defaultStep);
    const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(new Set());
    const [totalSteps, setTotalSteps] = React.useState(0);

    const isControlled = controlledStep !== undefined;
    const currentStep = isControlled ? controlledStep : uncontrolledStep;

    // Count steps
    React.useEffect(() => {
      const stepElements = document.querySelectorAll("[data-stepper-step]");
      setTotalSteps(stepElements.length);
    }, [children]);

    const goToStep = React.useCallback(
      (step: number) => {
        if (step < 0 || step >= totalSteps) return;
        if (linear && step > currentStep && !completedSteps.has(currentStep)) return;

        if (!isControlled) {
          setUncontrolledStep(step);
        }
        onStepChange?.(step);
      },
      [isControlled, onStepChange, totalSteps, linear, currentStep, completedSteps]
    );

    const nextStep = React.useCallback(() => {
      goToStep(currentStep + 1);
    }, [currentStep, goToStep]);

    const prevStep = React.useCallback(() => {
      goToStep(currentStep - 1);
    }, [currentStep, goToStep]);

    const markCompleted = React.useCallback((step: number) => {
      setCompletedSteps((prev) => new Set([...prev, step]));
    }, []);

    const contextValue = React.useMemo(
      () => ({
        currentStep,
        totalSteps,
        goToStep,
        nextStep,
        prevStep,
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === totalSteps - 1,
        completedSteps,
        markCompleted,
        orientation,
      }),
      [currentStep, totalSteps, goToStep, nextStep, prevStep, completedSteps, markCompleted, orientation]
    );

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="group"
          aria-label="Progress steps"
          data-stepper-root=""
          data-orientation={orientation}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    );
  }
);

Root.displayName = "Stepper.Root";
