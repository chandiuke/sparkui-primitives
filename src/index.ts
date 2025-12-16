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

// Collapsible
export * as Collapsible from "./collapsible";
export type {
  CollapsibleRootProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from "./collapsible";

// Progress
export * as Progress from "./progress";
export type {
  ProgressRootProps,
  ProgressIndicatorProps,
} from "./progress";

// ScrollArea
export * as ScrollArea from "./scroll-area";
export type {
  ScrollAreaRootProps,
  ScrollAreaViewportProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaCornerProps,
} from "./scroll-area";

// Form
export * as Form from "./form";
export type {
  FormRootProps,
  FormFieldProps,
  FormLabelProps,
  FormControlProps,
  FormMessageProps,
  FormSubmitProps,
} from "./form";

// NavigationMenu
export * as NavigationMenu from "./navigation-menu";
export type {
  NavigationMenuRootProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
} from "./navigation-menu";

// ============================================
// NEW PRIMITIVES (Not in Radix UI)
// ============================================

// Toast
export * as Toast from "./toast";
export { useToast } from "./toast";
export type {
  ToastProviderProps,
  ToastViewportProps,
  ToastRootProps,
  ToastData,
  ToastType,
  ToastPosition,
} from "./toast";

// Command (Command Palette)
export * as Command from "./command";
export type {
  CommandRootProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandItemProps,
} from "./command";

// Sortable (Drag & Drop)
export * as Sortable from "./sortable";
export type {
  SortableRootProps,
  SortableItemProps,
  SortableHandleProps,
} from "./sortable";

// Stepper (Multi-step wizard)
export * as Stepper from "./stepper";
export type {
  StepperRootProps,
  StepperStepProps,
  StepperContentProps,
} from "./stepper";

// DatePicker
export * as DatePicker from "./datepicker";
export { useCalendarDays } from "./datepicker";
export type {
  DatePickerRootProps,
  DatePickerTriggerProps,
  DatePickerContentProps,
  DatePickerDayProps,
} from "./datepicker";

// ============================================
// Utilities
// ============================================
export { composeRefs, useComposedRefs } from "./utils/compose-refs";
export { Slot, Slottable } from "./utils/slot";
export { useFloatingPosition } from "./utils/use-floating";
export { useFocusTrap } from "./utils/use-focus-trap";
export { useArrowNavigation } from "./utils/use-arrow-navigation";
export { useTypeahead } from "./utils/use-typeahead";
export { useAnimation, useAnimationState } from "./utils/use-animation";
export { useVirtual } from "./utils/use-virtual";
export { useAsync, useDebouncedAsync } from "./utils/use-async";
export type { AsyncState, AsyncStatus, UseAsyncOptions, UseAsyncReturn } from "./utils/use-async";
