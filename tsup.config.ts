import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "select/index": "src/select/index.ts",
    "dropdown/index": "src/dropdown/index.ts",
    "modal/index": "src/modal/index.ts",
    "accordion/index": "src/accordion/index.ts",
    "tabs/index": "src/tabs/index.ts",
    "popover/index": "src/popover/index.ts",
    "tooltip/index": "src/tooltip/index.ts",
    "checkbox/index": "src/checkbox/index.ts",
    "radio/index": "src/radio/index.ts",
    "switch/index": "src/switch/index.ts",
    "slider/index": "src/slider/index.ts",
    // New primitives (not in Radix UI)
    "toast/index": "src/toast/index.ts",
    "command/index": "src/command/index.ts",
    "sortable/index": "src/sortable/index.ts",
    "stepper/index": "src/stepper/index.ts",
    "datepicker/index": "src/datepicker/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
});
