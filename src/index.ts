// SparkUI Primitives - Headless UI components
// https://github.com/chandiuke/sparkui-primitives

// Select
export * as Select from "./select";
export type {
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
} from "./select";

// Dropdown
export * as Dropdown from "./dropdown";
export type {
  DropdownRootProps,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownGroupProps,
  DropdownLabelProps,
  DropdownSeparatorProps,
} from "./dropdown";

// Modal
export * as Modal from "./modal";
export type {
  ModalRootProps,
  ModalTriggerProps,
  ModalPortalProps,
  ModalOverlayProps,
  ModalContentProps,
  ModalCloseProps,
  ModalTitleProps,
  ModalDescriptionProps,
} from "./modal";

// Accordion
export * as Accordion from "./accordion";
export type {
  AccordionRootProps,
  AccordionSingleProps,
  AccordionMultipleProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from "./accordion";

// Tabs
export * as Tabs from "./tabs";
export type {
  TabsRootProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from "./tabs";

// Popover
export * as Popover from "./popover";
export type {
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverCloseProps,
} from "./popover";

// Tooltip
export * as Tooltip from "./tooltip";
export type {
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipContentProps,
} from "./tooltip";

// Checkbox
export * as Checkbox from "./checkbox";
export type {
  CheckboxRootProps,
  CheckboxIndicatorProps,
  CheckedState,
} from "./checkbox";

// RadioGroup
export * as RadioGroup from "./radio";
export type {
  RadioGroupRootProps,
  RadioGroupItemProps,
  RadioGroupIndicatorProps,
} from "./radio";

// Switch
export * as Switch from "./switch";
export type {
  SwitchRootProps,
  SwitchThumbProps,
} from "./switch";

// Slider
export * as Slider from "./slider";
export type {
  SliderRootProps,
  SliderTrackProps,
  SliderRangeProps,
  SliderThumbProps,
} from "./slider";

// Utilities
export { composeRefs, useComposedRefs } from "./utils/compose-refs";
export { Slot, Slottable } from "./utils/slot";
