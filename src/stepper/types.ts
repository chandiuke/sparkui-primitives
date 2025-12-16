import * as React from "react";

export interface StepperContextValue {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  completedSteps: Set<number>;
  markCompleted: (step: number) => void;
  orientation: "horizontal" | "vertical";
}

export interface StepperRootProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep?: number;
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  orientation?: "horizontal" | "vertical";
  linear?: boolean; // Must complete steps in order
}

export interface StepperListProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface StepperStepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  completed?: boolean;
  disabled?: boolean;
}

export interface StepperTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface StepperTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface StepperDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface StepperSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  forceMount?: boolean;
}

export interface StepperPrevProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface StepperNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
