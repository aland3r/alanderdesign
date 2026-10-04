# Create a new component from code

A step-by-step tutorial for building a component by hand in a product front end (Flashbrix, Deviante or Portfolio) with the Alander Design System (ADS), and moving it into ADS when it makes sense.

The example is an **Accordion** (a list of questions that open and close), but the steps apply to any component.

> To start from a screen in Figma, see [create-a-component-from-figma.md](./create-a-component-from-figma.md). The code steps in that guide are the ones in this one.

---

## Before you start: the map

```text
primitive        →  semantic                  →  component
#4541c0             color.action.primary          .button { background: var(--color-action-primary) }
(raw value)         (intent, same name            (reads semantic tokens only)
                     in every brand)
```

- **Primitive**: each brand's raw value (`indigo.600 = #4541c0`). Lives in `alander-src-packages/tokens/src/**/primitives.json`.
- **Semantic**: the name with intent (`color.action.primary`). The base defines all of them; each brand overrides only what differs. Lives in `semantic.json`.
- **Component**: reads semantic tokens only, as CSS variables (`var(--color-action-primary)`). Never a raw hex or px value.
- **Family**: the folder the component lives in (`button`, `field`, `text`...). It is organization, not a token layer.

Switching brands happens on its own: `BrandProvider` sets `data-brand="flashbrix"` on the page, and each brand defines the same variable names with its own values.

---

## Step 1. Connect the product to ADS (once per project)

In the product project (for example `C:\gestalt\flashbrix-web`):

```sh
pnpm add @alander/react@link:../alanderdesign/alander-src-packages/react
pnpm add @alander/tokens@link:../alanderdesign/alander-src-packages/tokens
```

`link:` points at the local folder, so a change in ADS shows up in the product right away. For deploys (Vercel) the packages need to be published; until then this only works on your machine.

Wrap the app in `BrandProvider` once, at the top:

```tsx
// src/main.tsx
import { BrandProvider } from '@alander/react'

createRoot(document.getElementById('root')!).render(
  <BrandProvider brand="flashbrix">
    <App />
  </BrandProvider>,
)
```

`BrandProvider` already imports the tokens (the CSS variables for every brand) and the fonts.

## Step 2. Check whether the component already exists

1. Open the ADS Storybook (`pnpm storybook` inside `alanderdesign`, at http://localhost:6006).
2. Look in the sidebar under **Families**.
3. Also check `alander-src-packages/react/src/index.ts`: everything ADS exports is there.

If it exists, use the ADS one and stop here. If something almost identical exists, the answer is usually a new prop on the ADS component, not a new component.

## Step 3. Write the API before the code

Decide what the people using the component will write. For the Accordion:

```tsx
<Accordion>
  <AccordionItem title="How does spaced repetition work?">
    Flashbrix shows the cards you got wrong again...
  </AccordionItem>
  <AccordionItem title="Can I study offline?" defaultOpen>
    Yes...
  </AccordionItem>
</Accordion>
```

Questions worth asking:

- **Which props?** Only what is needed (`title`, `children`, `defaultOpen`). Every extra prop is something to maintain.
- **Controlled or not?** Start uncontrolled (`defaultOpen`). Add `open` + `onOpenChange` when someone needs them.
- **Which HTML element?** Prefer the native one. Here, `<details>` and `<summary>` already open and close, work with the keyboard and are announced by screen readers.
- **Composition or an array?** Children (`<AccordionItem>`) give more freedom than an `items={[...]}` prop.

## Step 4. List the tokens the component needs

For each visual decision, find the semantic token. Use the Storybook token table (**Foundations › Tokens**, *Semantic* or *By Family* view).

| Part | Decision | Token |
| --- | --- | --- |
| Border between items | default border color | `--color-border-default` |
| Title | strong text, label weight | `--color-text-strong`, `--font-weight-label` |
| Content | default text | `--color-text-default` |
| Inner spacing | medium inset | `--space-inset-md` |
| Focus | focus ring | `--color-focus-ring` |
| Title hover | light background on hover | **does not exist** |

### When a token is missing

Do not write the value in the component. Create a new semantic token **in the ADS base**, and the product's value as an override:

```jsonc
// alanderdesign/alander-src-packages/tokens/src/base/semantic.json
"color": {
  "background": {
    "hover": { "$type": "color", "$value": "{color.gray.50}" }
  }
}
```

```jsonc
// alanderdesign/alander-src-packages/tokens/src/brands/flashbrix/semantic.json
"color": {
  "background": {
    "hover": { "$type": "color", "$value": "{color.navy.800}" }
  }
}
```

Rules:

- The name describes the **intent**, not the component or the color (`color.background.hover`, not `accordionGray`).
- Every token is born in the base. The build rejects a token that exists in only one brand.
- If a brand needs a color it does not have yet, it becomes a primitive in `brands/<brand>/primitives.json`.

Then run, inside `alanderdesign`:

```sh
pnpm tokens      # generates the CSS variables
pnpm typecheck   # checks the name contract and AA contrast
```

Now `var(--color-background-hover)` exists in every brand.

## Step 5. Create the files

In the product, one folder per family and one per component, the same as in ADS (so the move in step 9 is just moving the folder):

```text
src/components/accordion/
  Accordion/
    Accordion.tsx
    Accordion.module.css
```

```tsx
// Accordion.tsx
import type { ReactNode } from 'react'
import styles from './Accordion.module.css'

export interface AccordionProps {
  className?: string
  children: ReactNode
}

export function Accordion({ className, children }: AccordionProps) {
  return <div className={[styles.accordion, className].filter(Boolean).join(' ')}>{children}</div>
}

export interface AccordionItemProps {
  title: ReactNode
  /** Starts open. */
  defaultOpen?: boolean
  children: ReactNode
}

export function AccordionItem({ title, defaultOpen = false, children }: AccordionItemProps) {
  return (
    <details className={styles.item} open={defaultOpen}>
      <summary className={styles.summary}>{title}</summary>
      <div className={styles.content}>{children}</div>
    </details>
  )
}
```

```css
/* Accordion.module.css: semantic tokens only, no raw values */
.accordion {
  border-top: 1px solid var(--color-border-default);
}

.item {
  border-bottom: 1px solid var(--color-border-default);
}

.summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-inset-md);
  padding: var(--space-inset-md);
  font-weight: var(--font-weight-label);
  color: var(--color-text-strong);
  cursor: pointer;
  list-style: none;
}

.summary::-webkit-details-marker {
  display: none;
}

.summary::after {
  content: '+';
}

.item[open] .summary::after {
  content: '−';
}

.summary:hover {
  background: var(--color-background-hover);
}

.summary:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.content {
  padding: 0 var(--space-inset-md) var(--space-inset-md);
  color: var(--color-text-default);
}
```

Why **CSS Modules**: class names are unique per file (no clashes between components), and the CSS is still plain CSS reading variables.

`1px` borders are the accepted exception: line thickness does not change by brand. If it ever does, it becomes a token.

## Step 6. Accessibility

Check before using it on a screen:

- [ ] It works with the keyboard only: `Tab` reaches the title, `Enter` or `Space` opens and closes it.
- [ ] Focus is visible (`:focus-visible` with the focus ring).
- [ ] Screen readers announce "collapsed/expanded" (the native `<summary>` already does this).
- [ ] Text contrast against the background passes AA (4.5:1). The ADS `pnpm typecheck` checks the known pairs; for a new pair, add it to `tokens/check-contrast.mjs`.
- [ ] Nothing relies on color alone for meaning.
- [ ] Any animation respects `prefers-reduced-motion`.

## Step 7. Use it on the screen

```tsx
import { Accordion, AccordionItem } from './components/accordion/Accordion/Accordion'

<Accordion>
  <AccordionItem title="How does spaced repetition work?">...</AccordionItem>
</Accordion>
```

Test the screen on mobile, tablet and desktop (768px and 1024px are the ADS breakpoints).

## Step 8. Decide where the component lives

| The component is... | Where it lives |
| --- | --- |
| Generic (accordion, modal, tabs, card, tooltip) | Moves to ADS (step 9) |
| Specific to one screen of one product (the Flashbrix study card) | Stays in the product. Moves to ADS when a second product needs it |

Even when it stays in the product, it uses ADS tokens only. That already makes it ready to move later.

## Step 9. Move it into ADS

1. Move the folder to `alanderdesign/alander-src-packages/react/src/components/accordion/Accordion/`.
2. Use the ADS class helper: `import { cx } from '../../../utils/cx'`.
3. Export it in `alander-src-packages/react/src/index.ts`:

   ```ts
   export { Accordion, AccordionItem } from './components/accordion/Accordion/Accordion'
   export type { AccordionProps, AccordionItemProps } from './components/accordion/Accordion/Accordion'
   ```

4. Create the story `storybook/stories/Accordion.stories.tsx`:

   ```tsx
   import type { Meta, StoryObj } from '@storybook/react-vite'
   import { Accordion, AccordionItem } from '@alander/react'
   import { Canvas } from './Canvas'

   const meta = {
     title: 'Families/Accordion/Accordion',
     decorators: [(Story) => <Canvas><Story /></Canvas>],
   } satisfies Meta

   export default meta
   type Story = StoryObj<typeof meta>

   export const Default: Story = {
     render: () => (
       <Accordion>
         <AccordionItem title="First question">Answer.</AccordionItem>
         <AccordionItem title="Second question" defaultOpen>Open answer.</AccordionItem>
       </Accordion>
     ),
   }
   ```

5. Switch the brand in the Storybook toolbar (Base, Portfolio, Deviante, Flashbrix) and check the component works in all of them. The **Accessibility** panel shows a11y problems.
6. Run `pnpm typecheck` and `pnpm build-storybook`, then commit.
7. In the product, change the import to `import { Accordion, AccordionItem } from '@alander/react'` and delete the local copy.

## Done checklist

- [ ] Nothing similar existed in ADS.
- [ ] Small API, with a native HTML element whenever possible.
- [ ] CSS uses only semantic `var(--...)`. Any new token was born in the base.
- [ ] Accessible with keyboard and screen reader, AA contrast.
- [ ] Tested in every brand and at the three screen sizes.
- [ ] If generic: it is in ADS, exported in `index.ts`, with a story under `Families/<family>`.

---

## For interviews

The concepts this workflow shows, and how to explain each one in a sentence.

**Design tokens.** "Design decisions stored as named data, so design and code use the same source. Ours are built with Style Dictionary into CSS variables and JSON."

**Primitive and semantic.** "A primitive says *what* it is (`indigo.600`); a semantic token says *what it is for* (`color.action.primary`). Components read semantic tokens only, so switching brands means switching the mapping, not the component."

**Why we have no component tokens.** "We chose two layers to keep it simple. When a component needs something of its own, we create a more specific semantic token. It's a trade-off: less per-component flexibility, far fewer tokens to maintain." Know the other side: large systems (Material, Spectrum) have the third layer because many teams need to tweak individual components.

**Multi-brand theming.** "A neutral base defines the whole contract; each brand overrides only what differs. The build fails if a brand invents a name the base doesn't have, and fails if a color pair drops below AA."

**Accessibility.** "I start from native HTML (`button`, `details`, `label`) because it already handles keyboard and screen readers. Then visible focus, contrast and `prefers-reduced-motion`."

**Component API.** "Few props, names that describe intent (`variant="primary"`, not `color="indigo"`), uncontrolled first, composition through children when the structure varies."

**Contribution.** "A generic component is born in, or moved into, the system with a Storybook story and build checks. A product-specific one stays in the product, but is born using tokens."

Questions that often come up:

- *How do you keep the system and the product from drifting apart?* One token package, product components forbidden from using raw values, and a clear path to move components into the system.
- *How do you measure whether the design system is being used?* How many product components come from the package, and how many raw values are still in the CSS (search for `#` and `px` in the `.module.css` files).
- *What would you do differently at scale?* Version and publish the packages, visual tests per brand (Chromatic or Playwright), a changelog, and maybe component tokens if many teams need to tweak individual pieces.
