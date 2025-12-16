export type ValidityMatcher =
  | "badInput"
  | "customError"
  | "patternMismatch"
  | "rangeOverflow"
  | "rangeUnderflow"
  | "stepMismatch"
  | "tooLong"
  | "tooShort"
  | "typeMismatch"
  | "valid"
  | "valueMissing";

export interface FormContextValue {
  errors: Map<string, string[]>;
  setFieldError: (name: string, errors: string[]) => void;
  clearFieldError: (name: string) => void;
}

export interface FieldContextValue {
  name: string;
  id: string;
  errors: string[];
  serverInvalid: boolean;
}

export interface FormRootProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onClearServerErrors?: () => void;
}

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  serverInvalid?: boolean;
}

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export interface FormControlProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export interface FormMessageProps extends React.HTMLAttributes<HTMLSpanElement> {
  match?: ValidityMatcher | ((value: string, formData: FormData) => boolean);
  forceMatch?: boolean;
  name?: string;
}

export interface FormValidityStateProps {
  children: (validity: ValidityState | undefined) => React.ReactNode;
}

export interface FormSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
