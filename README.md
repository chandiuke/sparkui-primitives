# SparkUI Primitives

Headless, unstyled UI primitives for building accessible React components. Like Radix UI, but with extra features.

## Installation

```bash
npm install sparkui-primitives
```

## Available Primitives

### Core Primitives (Radix-like)

| Primitive | Description |
|-----------|-------------|
| `Select` | Customizable select with **built-in search** support |
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

### 🚀 Unique Primitives (Not in Radix UI)

| Primitive | Description |
|-----------|-------------|
| `Toast` | Toast notifications with Provider, Viewport, and useToast hook |
| `Command` | Command palette (like cmdk) with search, groups, and keyboard nav |
| `Sortable` | Drag & drop sortable lists with pointer-based dragging |
| `Stepper` | Multi-step wizard with navigation and validation |
| `DatePicker` | Full-featured date picker with calendar, month/year views |

### 🛠️ Utility Hooks

| Hook | Description |
|------|-------------|
| `useAnimation` | Built-in enter/exit animation states |
| `useVirtual` | Virtual scrolling for large lists |
| `useAsync` | Async data loading with status management |
| `useDebouncedAsync` | Debounced async operations (great for search) |
| `useFloatingPosition` | Floating UI positioning with collision detection |
| `useFocusTrap` | Focus trapping for modals |
| `useArrowNavigation` | Arrow key navigation between items |
| `useTypeahead` | Type-ahead search in lists |

## Usage Examples

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

### Toast Notifications

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

### Sortable List

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

### Stepper (Multi-step Wizard)

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
import { DatePicker, useCalendarDays } from "sparkui-primitives";

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
      <DatePicker.Grid>
        <DatePicker.Head>
          {[0,1,2,3,4,5,6].map(day => (
            <DatePicker.HeadCell key={day} day={day} />
          ))}
        </DatePicker.Head>
        <DatePicker.Body>
          {/* Use useCalendarDays() hook for calendar data */}
        </DatePicker.Body>
      </DatePicker.Grid>
    </DatePicker.Calendar>
  </DatePicker.Content>
</DatePicker.Root>
```

### Async Data Loading

```tsx
import { useAsync, useDebouncedAsync } from "sparkui-primitives";

// Basic async
const { data, isLoading, execute } = useAsync(fetchData);

// Debounced for search
const { data, debouncedExecute } = useDebouncedAsync(searchApi, 300);
```

## Styling

These primitives are completely unstyled. Use `data-*` attributes for styling:

- `data-state="open" | "closed"` - Open/closed state
- `data-state="checked" | "unchecked"` - Checked state
- `data-state="active" | "inactive"` - Active tab state
- `data-disabled` - Disabled state
- `data-selected` - Selected item
- `data-today` - Today's date (DatePicker)
- `data-dragging` - Currently dragging (Sortable)

Example with Tailwind:

```tsx
<Select.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out">
  ...
</Select.Content>
```

## License

MIT
