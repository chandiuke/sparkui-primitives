import * as React from "react";
import { composeRefs } from "./compose-refs";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    const newElement = slottable.props.children as React.ReactNode;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React.Children.count(newElement) > 1) return React.Children.only(null);
        return React.isValidElement(newElement)
          ? (newElement.props.children as React.ReactNode)
          : null;
      }
      return child;
    });

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {React.isValidElement(newElement)
          ? React.cloneElement(newElement, undefined, newChildren)
          : null}
      </SlotClone>
    );
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});

Slot.displayName = "Slot";

interface SlotCloneProps {
  children: React.ReactNode;
}

const SlotClone = React.forwardRef<HTMLElement, SlotCloneProps & React.HTMLAttributes<HTMLElement>>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...mergeProps(slotProps, children.props),
        // @ts-ignore
        ref: forwardedRef
          ? composeRefs(forwardedRef, (children as any).ref)
          : (children as any).ref,
      } as any);
    }

    return React.Children.count(children) > 1 ? React.Children.only(null) : null;
  }
);

SlotClone.displayName = "SlotClone";

const Slottable = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

function isSlottable(child: React.ReactNode): child is React.ReactElement {
  return React.isValidElement(child) && child.type === Slottable;
}

function mergeProps(slotProps: Record<string, any>, childProps: Record<string, any>) {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }

  return { ...slotProps, ...overrideProps };
}

export { Slottable };
