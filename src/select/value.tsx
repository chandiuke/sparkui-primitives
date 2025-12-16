import * as React from "react";
import { useSelectContext } from "./context";
import type { SelectValueProps } from "./types";

export const Value: React.FC<SelectValueProps> = ({ placeholder, children }) => {
  const ctx = useSelectContext();

  if (children) {
    return <>{children}</>;
  }

  return (
    <span data-placeholder={!ctx.displayValue ? "" : undefined}>
      {ctx.displayValue || placeholder}
    </span>
  );
};

Value.displayName = "Select.Value";
