# SparkUI Primitives

Headless, unstyled UI primitives for building accessible React components. Like Radix UI, but for SparkUI.

## Installation

```bash
npm install sparkui-primitives
```

## Available Primitives

| Primitive | Description |
|-----------|-------------|
| `Select` | Customizable select/dropdown with search, multi-select support |
| `Dropdown` | Menu dropdown with items, groups, and separators |
| `Modal` | Dialog/modal with portal, overlay, and focus management |
| `Accordion` | Collapsible content sections (single or multiple) |
| `Tabs` | Tab navigation with panels |
| `Popover` | Floating content anchored to a trigger |
| `Tooltip` | Hover/focus tooltip with delay |
| `Checkbox` | Checkbox with indeterminate state |
| `RadioGroup` | Radio button group |
| `Switch` | Toggle switch |
| `Slider` | Range slider with single or multiple thumbs |

## Usage

### Select

```tsx
import { Select } from "sparkui-primitives";

<Select.Root value={value} onValueChange={setValue}>
  <Select.Trigger>
    <Select.Value placeholder="Select..." />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="apple">Apple</Select.Item>
    <Select.Item value="banana">Banana</Select.Item>
  </Select.Content>
</Select.Root>
```

### Modal

```tsx
import { Modal } from "sparkui-primitives";

<Modal.Root open={open} onOpenChange={setOpen}>
  <Modal.Trigger>Open Modal</Modal.Trigger>
  <Modal.Portal>
    <Modal.Overlay />
    <Modal.Content>
      <Modal.Title>Title</Modal.Title>
      <Modal.Description>Description</Modal.Description>
      <Modal.Close>Close</Modal.Close>
    </Modal.Content>
  </Modal.Portal>
</Modal.Root>
```

### Accordion

```tsx
import { Accordion } from "sparkui-primitives";

<Accordion.Root type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content 1</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Tabs

```tsx
import { Tabs } from "sparkui-primitives";

<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs.Root>
```

### Checkbox

```tsx
import { Checkbox } from "sparkui-primitives";

<Checkbox.Root checked={checked} onCheckedChange={setChecked}>
  <Checkbox.Indicator>✓</Checkbox.Indicator>
</Checkbox.Root>
```

### Switch

```tsx
import { Switch } from "sparkui-primitives";

<Switch.Root checked={checked} onCheckedChange={setChecked}>
  <Switch.Thumb />
</Switch.Root>
```

## Styling

These primitives are completely unstyled. Use `data-*` attributes for styling:

- `data-state="open" | "closed"` - Open/closed state
- `data-state="checked" | "unchecked"` - Checked state
- `data-state="active" | "inactive"` - Active tab state
- `data-disabled` - Disabled state
- `data-side="top" | "bottom" | "left" | "right"` - Position side
- `data-align="start" | "center" | "end"` - Position alignment

Example with Tailwind:

```tsx
<Select.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out">
  ...
</Select.Content>
```

## License

MIT
