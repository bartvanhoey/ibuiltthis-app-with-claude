---
description: "Guidelines for creating UI components in the ibuiltthis app."
argument-hint: "Component name | Component summary"
---

## Context

Parse $ARGUMENTS to get the following values:

- [name] - The name from $ARGUMENTS, converted to PascalCase (e.g. "button" becomes "Button")
- [summary] - Component summary from $ARGUMENTS (e.g. "A reusable button component with multiple variants and states.")

## Task

Make a UI component according to the [name] and [summary] provided, following these guidelines:

- Create the component in `components/ui/` (e.g. `components/ui/button.tsx`)
- Use a functional component with the name in PascalCase (e.g. `Button`)
- Reference the [summary] when making the component to ensure it meets the requirements and includes the necessary variants and states.
  
## variants

- Add the following variants for the components using the colors from the themes variables as in the Button component:

1. default
2. destructive
3. outline
4. secondary
5. ghost
6. link
7. black
8. white

- Support common patterns like disabled states and sizes where appropriate (e.g. small, medium, large for buttons), defaulting to medium if no size is specified.

## Testing

- Make a test file for the component to test basic use cases.
- Place the test file in the same directory as the component (e.g. `components/ui/button.test.tsx`)
- Run tests and iterate on the component until all tests pass successfully.

## Previews

- Add a preview page for the component in `app/preview/` (e.g. `app/preview/button/page.tsx`) and add the component with different variants and states to visually verify the implementation.
- Do not add the component to any other pages until the component is fully implemented and tested.
  