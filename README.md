# SparkUI Primitives

Headless, unstyled UI primitives for building accessible React components. Complete Radix UI alternative with extra features.

## Installation

```bash
npm install sparkui-primitives
```

## 22 Primitives Available

### Core Primitives (Radix-compatible)

| Primitive | Description |
|-----------|-------------|
| `Accordion` | Collapsible content sections (single or multiple) |
| `Checkbox` | Checkbox with indeterminate state |
| `Collapsible` | Simple expand/collapse container |
| `Dropdown` | Menu dropdown with items, groups, separators |
| `Form` | Form validation with Field, Label, Control, Message |
| `Modal` | Dialog/modal with portal, overlay, focus management |
| `NavigationMenu` | Complex navigation with submenus and hover |
| `Popover` | Floating content anchored to a trigger |
| `Progress` | Progress bar with indeterminate support |
| `RadioGroup` | Radio button group |
| `ScrollArea` | Custom scrollbar styling |
| `Select` | Customizable select with **built-in search** |
| `Slider` | Range slider with single or multiple thumbs |
| `Switch` | Toggle switch |
| `Tabs` | Tab navigation with panels |
| `Tooltip` | Hover/focus tooltip with delay |

### 🚀 Unique Primitives (Not in Radix UI)

| Primitive | Description |
|-----------|-------------|
| `Toast` | Toast notifications with Provider, Viewport, useToast |
| `Command` | Command palette (like cmdk) with search & keyboard nav |
| `Sortable` | Drag & drop sortable lists |
| `Stepper` | Multi-step wizard with navigation |
| `DatePicker` | Full calendar with month/year views |

### 🛠️ Utility Hooks

| Hook | Description |
|------|-------------|
| `useAnimation` | Built-in enter/exit animation states |
| `useVirtual` | Virtual scrolling for large lists |
| `useAsync` | Async data loading with status management |
| `useDebouncedAsync` | Debounced async operations |
| `useFloatingPosition` | Floating UI positioning |
| `useFocusTrap` | Focus trapping for modals |
| `useArrowNavigation` | Arrow key navigation |
| `useTypeahead` | Type-ahead search in lists |

## Usage Examples

### Collapsible

```tsx
import { Collapsible } from "sparkui-primitives";

<Collapsible.Root>
  <Collapsible.Trigger>Toggle</Collapsible.Trigger>
  <Collapsible.Content>
    Hidden content here
  </Collapsible.Content>
</Collapsible.Root>
```

### Progress

```tsx
import { Progress } from "sparkui-primitives";

<Progress.Root value={60}>
  <Progress.Indicator style={{ width: '60%' }} />
</Progress.Root>
```

### ScrollArea

```tsx
import { ScrollArea } from "sparkui-primitives";

<ScrollArea.Root style={{ height: 200 }}>
  <ScrollArea.Viewport>
    {/* Long content */}
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="vertical">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
</ScrollArea.Root>
```

### Form

```tsx
import { Form } from "sparkui-primitives";

<Form.Root onSubmit={handleSubmit}>
  <Form.Field name="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" required />
    <Form.Message match="valueMissing">Email is required</Form.Message>
  </Form.Field>
  <Form.Submit>Submit</Form.Submit>
</Form.Root>
```

### NavigationMenu

```tsx
import { NavigationMenu } from "sparkui-primitives";

<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="/product-a">Product A</NavigationMenu.Link>
        <NavigationMenu.Link href="/product-b">Product B</NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

### Select with Search

```tsx
import { Select } from "sparkui-primitives";

<Select.Root searchable>
  <Select.Trigger>
    <Select.Value placeholder="Select..." />
  </Select.Trigger>
  <Select.Content>
    <Select.Search placeholder="Search..." />
    <Select.Item value="apple">Apple</Select.Item>
    <Select.Item value="banana">Banana</Select.Item>
  </Select.Content>
</Select.Root>
```

### Toast

```tsx
import { Toast, useToast } from "sparkui-primitives";

function App() {
  return (
    <Toast.Provider>
      <MyComponent />
      <Toast.Viewport />
    </Toast.Provider>
  );
}

function MyComponent() {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ title: "Success!", type: "success" })}>
      Show Toast
    </button>
  );
}
```

### Command Palette

```tsx
import { Command } from "sparkui-primitives";

<Command.Root>
  <Command.Input placeholder="Type a command..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Actions">
      <Command.Item onSelect={() => console.log("New file")}>
        New File
        <Command.Shortcut>⌘N</Command.Shortcut>
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command.Root>
```

### Sortable

```tsx
import { Sortable } from "sparkui-primitives";

<Sortable.Root items={items} onReorder={setItems}>
  {items.map((item) => (
    <Sortable.Item key={item.id} id={item.id}>
      <Sortable.Handle>⋮⋮</Sortable.Handle>
      {item.label}
    </Sortable.Item>
  ))}
</Sortable.Root>
```

### Stepper

```tsx
import { Stepper } from "sparkui-primitives";

<Stepper.Root defaultStep={0}>
  <Stepper.List>
    <Stepper.Step step={0}>
      <Stepper.Trigger>
        <Stepper.Title>Step 1</Stepper.Title>
      </Stepper.Trigger>
    </Stepper.Step>
    <Stepper.Separator />
    <Stepper.Step step={1}>
      <Stepper.Trigger>
        <Stepper.Title>Step 2</Stepper.Title>
      </Stepper.Trigger>
    </Stepper.Step>
  </Stepper.List>
  
  <Stepper.Content step={0}>Step 1 content</Stepper.Content>
  <Stepper.Content step={1}>Step 2 content</Stepper.Content>
  
  <Stepper.Prev>Back</Stepper.Prev>
  <Stepper.Next>Next</Stepper.Next>
</Stepper.Root>
```

### DatePicker

```tsx
import { DatePicker } from "sparkui-primitives";

<DatePicker.Root value={date} onValueChange={setDate}>
  <DatePicker.Trigger>
    <DatePicker.Value placeholder="Pick a date" />
  </DatePicker.Trigger>
  <DatePicker.Content>
    <DatePicker.Calendar>
      <DatePicker.Header>
        <DatePicker.Prev />
        <DatePicker.Title />
        <DatePicker.Next />
      </DatePicker.Header>
      {/* Calendar grid */}
    </DatePicker.Calendar>
  </DatePicker.Content>
</DatePicker.Root>
```

## Styling

Completely unstyled. Use `data-*` attributes:

- `data-state="open" | "closed"` - Open/closed state
- `data-state="checked" | "unchecked"` - Checked state
- `data-state="active" | "inactive"` - Active tab
- `data-state="complete" | "loading" | "indeterminate"` - Progress
- `data-disabled` - Disabled state
- `data-selected` - Selected item
- `data-today` - Today's date
- `data-dragging` - Currently dragging
- `data-orientation="horizontal" | "vertical"` - Orientation

Example with Tailwind:

```tsx
<Collapsible.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
  ...
</Collapsible.Content>
```

## License

MIT
