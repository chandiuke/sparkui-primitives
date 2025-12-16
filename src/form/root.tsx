import * as React from "react";
import { FormContext, FieldContext } from "./context";
import type {
  FormRootProps,
  FormFieldProps,
  FormLabelProps,
  FormControlProps,
  FormMessageProps,
  FormSubmitProps,
} from "./types";

export const Root = React.forwardRef<HTMLFormElement, FormRootProps>(
  ({ onClearServerErrors, onSubmit, children, ...props }, ref) => {
    const [errors, setErrors] = React.useState<Map<string, string[]>>(new Map());

    const setFieldError = React.useCallback((name: string, fieldErrors: string[]) => {
      setErrors((prev) => {
        const next = new Map(prev);
        next.set(name, fieldErrors);
        return next;
      });
    }, []);

    const clearFieldError = React.useCallback((name: string) => {
      setErrors((prev) => {
        const next = new Map(prev);
        next.delete(name);
        return next;
      });
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      onClearServerErrors?.();
      onSubmit?.(e);
    };

    const contextValue = React.useMemo(
      () => ({ errors, setFieldError, clearFieldError }),
      [errors, setFieldError, clearFieldError]
    );

    return (
      <FormContext.Provider value={contextValue}>
        <form ref={ref} onSubmit={handleSubmit} {...props}>
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

Root.displayName = "Form.Root";

export const Field = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, serverInvalid = false, children, ...props }, ref) => {
    const formCtx = useFormContext();
    const id = React.useId();
    const errors = formCtx.errors.get(name) || [];

    const contextValue = React.useMemo(
      () => ({ name, id, errors, serverInvalid }),
      [name, id, errors, serverInvalid]
    );

    return (
      <FieldContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-invalid={errors.length > 0 || serverInvalid ? "" : undefined}
          {...props}
        >
          {children}
        </div>
      </FieldContext.Provider>
    );
  }
);

Field.displayName = "Form.Field";

function useFormContext() {
  const ctx = React.useContext(FormContext);
  if (!ctx) {
    throw new Error("Form components must be used within a Form.Root");
  }
  return ctx;
}

export const Label = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, ...props }, ref) => {
    const fieldCtx = useFieldContext();

    return (
      <label ref={ref} htmlFor={fieldCtx.id} data-invalid={fieldCtx.errors.length > 0 ? "" : undefined} {...props}>
        {children}
      </label>
    );
  }
);

Label.displayName = "Form.Label";

function useFieldContext() {
  const ctx = React.useContext(FieldContext);
  if (!ctx) {
    throw new Error("Form.Control/Label/Message must be used within a Form.Field");
  }
  return ctx;
}

export const Control = React.forwardRef<HTMLInputElement, FormControlProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ asChild, ...props }, ref) => {
    const fieldCtx = useFieldContext();

    return (
      <input
        ref={ref}
        id={fieldCtx.id}
        name={fieldCtx.name}
        aria-invalid={fieldCtx.errors.length > 0 || fieldCtx.serverInvalid}
        aria-describedby={`${fieldCtx.id}-message`}
        data-invalid={fieldCtx.errors.length > 0 ? "" : undefined}
        {...props}
      />
    );
  }
);

Control.displayName = "Form.Control";

export const Message = React.forwardRef<HTMLSpanElement, FormMessageProps>(
  ({ match, forceMatch, children, ...props }, ref) => {
    const fieldCtx = useFieldContext();

    // Show message if there are errors or forceMatch is true
    const shouldShow = forceMatch || fieldCtx.errors.length > 0 || fieldCtx.serverInvalid;

    if (!shouldShow) return null;

    return (
      <span
        ref={ref}
        id={`${fieldCtx.id}-message`}
        role="alert"
        data-invalid=""
        {...props}
      >
        {children || fieldCtx.errors[0]}
      </span>
    );
  }
);

Message.displayName = "Form.Message";

export const Submit = React.forwardRef<HTMLButtonElement, FormSubmitProps>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} type="submit" {...props}>
        {children}
      </button>
    );
  }
);

Submit.displayName = "Form.Submit";
