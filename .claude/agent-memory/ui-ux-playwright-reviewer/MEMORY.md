# UI/UX Playwright Reviewer — Persistent Memory

## Project Conventions

- **Font**: Outfit (Google Fonts) — used everywhere, no fallback display issues observed
- **Color palette**: Primary pink/magenta (~#E91E8C range), destructive red (~#E53E3E), secondary teal/cyan, black, white
- **Background**: Warm off-white cream (`bg-background` resolves to approx #F5F0E8)
- **Backdrop**: `bg-black/50 backdrop-blur-sm` — renders well, sufficient contrast against light pages
- **Border radius**: `rounded-xl` on modals — consistent with card components
- **Shadow**: `shadow-xl` on modals — visually appropriate elevation

## Modal Component (`components/ui/modal.tsx`) — v2 review (post-fixes applied)

### Confirmed Fixed Since v1
- `aria-labelledby` + `aria-describedby` wired via `React.useId()` — working
- Focus trap (Tab cycle within modal) — working; keyboard Tab/Shift+Tab stays inside
- `document.body` scroll lock when open — working
- Close button touch target increased to `p-2.5` — measures 36×36px (up from ~28px)
- Focus ring changed to `ring-foreground ring-offset-2` — now clearly visible
- ghost variant: `border-border/50 shadow-sm` — boundary now visible
- link variant: `text-foreground` — body text no longer pink
- white variant: `shadow-2xl` — clearly separates from cream backdrop
- Zero JS console errors across all variants

### Remaining Open Issues (v2)
1. **black — ghost Cancel button invisible**: ghost button on pure black has no affordance; text nearly invisible
2. **black — focus ring contrast**: `ring-foreground` (dark teal) on black bg is ~2.5:1, fails WCAG 1.4.11 (3:1 for UI components)
3. **secondary — ghost Cancel low affordance**: ghost Cancel button blends into teal background
4. **destructive — body text color**: body copy inherits `text-destructive` red; normal-size red text on light red bg likely fails WCAG AA 4.5:1
5. **Close button mobile touch target**: 36×36px at 390px viewport — 8px short of WCAG 2.5.5 44×44px advisory minimum
6. **Return focus on close**: focus drops to body when modal closes; should return to trigger button (WCAG 2.4.3)
7. **outline — no shadow**: floats without elevation cue; low severity
8. **ModalTitle does not scale with size**: `text-lg` at all sizes; lg modal could use `text-xl`

### Variant Status (v2)
- **default**: production-ready — clean card bg, visible border+shadow, good text contrast
- **destructive**: body text in red is a contrast concern; otherwise boundary and structure good
- **outline**: no shadow, floats ambiguously; acceptable but weak
- **secondary**: teal fill, dark text readable; ghost Cancel button low affordance
- **ghost**: boundary now visible; both footer buttons are ghost-on-ghost — low affordance
- **link**: boundary visible, text foreground — pink Confirm button acceptable
- **black**: excellent contrast for title/body; ghost Cancel invisible; focus ring low contrast
- **white**: shadow-2xl provides clear separation; description text teal-muted is acceptable

### Close Button (v2)
- At rest: `opacity-60`, 16×16 SVG X icon, position `top-3 right-3`
- Focus ring: rounded-md ring with offset — confirmed visible in default/ghost/white/secondary
- On black: ring is dark teal on black — low contrast, needs `ring-white` override
- Mobile size: 36×36px — acceptable for most use, but below WCAG 2.5.5 strict minimum

## Playwright Setup Note

- Script must run from project directory (`cd ibuiltthis-app && node script.js`) so `require('playwright')` resolves local node_modules
- Use `deviceScaleFactor: 2` or `3` on `newPage()` for crisp close-button/focus-ring crops
- `focus-visible` CSS ONLY triggers on keyboard nav — use `keyboard.press('Tab')` then `keyboard.press('Shift+Tab')` to land focus-visible on close button; programmatic `.focus()` does NOT trigger the CSS pseudo-class in headless Chromium
- Chromium headless shell caches in local ms-playwright folder after first run

## Preview Page Layout

- Clean, minimal, well-structured sections with `border-b` dividers
- `max-w-3xl mx-auto` container — appropriate width
- Ghost/link buttons in Variants row are visually indistinguishable from plain text
- "white" button has faint border on cream background — hard to identify as a button
