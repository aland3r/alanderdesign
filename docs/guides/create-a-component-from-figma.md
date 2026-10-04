# Create a new component from Figma

A step-by-step tutorial for designing a component in Figma and mirroring it in a product's code with the Alander Design System (ADS), without design and code drifting apart.

The example is still the **Accordion** from [create-a-component-from-code.md](./create-a-component-from-code.md). This guide covers the Figma side and the translation into code; the code itself is in that guide.

---

## Before you start: the files and the names

Three Figma files:

| File | What it holds |
| --- | --- |
| **ADS** (library) | The *Primitives* and *Semantic* variable collections, and the components already in ADS. Published as a library |
| **Flashbrix** | Flashbrix screens. Uses the ADS library |
| **Deviante** | Deviante screens. Uses the ADS library |

The *Semantic* collection has **one mode per brand** (Base, Portfolio, Deviante, Flashbrix). Switching a frame's mode in Figma is the same as switching `data-brand` in code.

The name is the same in all three places; only the separator changes:

| Figma (variable) | Token (JSON) | CSS |
| --- | --- | --- |
| `color/action/primary` | `color.action.primary` | `var(--color-action-primary)` |
| `space/inset/md` | `space.inset.md` | `var(--space-inset-md)` |
| `radius/control` | `radius.control` | `var(--radius-control)` |

That match is what makes the handoff work: whoever reads Figma in Dev Mode already knows the CSS variable name.

> If the ADS library does not exist in Figma yet, create the two collections with the same names as `alander-src-packages/tokens/src/base/*.json`. The **Foundations › Tokens** table in Storybook shows every name and its value per brand.

---

## Step 1. Check whether the component already exists

Before drawing, search the ADS library **Assets** and Storybook (**Families**). If it exists, use the instance. If something almost identical exists, the way forward is a new variant or property on the library component, not a new component.

## Step 2. Draw with variables, never with raw values

In the product file, draw the Accordion in a frame:

1. **Auto layout everywhere.** Item: vertical auto layout. Title: horizontal auto layout with the text and the `+` icon, set to *space between*.
2. **Colors only from semantic variables.** Title fill on hover: `color/background/hover`. Title text: `color/text/strong`. Border: `color/border/default`. If the panel shows a hex instead of a name, the color is loose.
3. **Spacing and radii from variables.** Title padding: `space/inset/md`. Gap: `space/inset/md`.
4. **Text from a style or typography variables.** Family, size and weight bound to the `font/...` variables.
5. **Test the brands:** switch the *Semantic* collection mode on the frame (Base, Deviante, Flashbrix). The component has to look right in all of them without you touching it.

If you need a value no variable has (a hover background, for example), **stop and create the semantic variable in the ADS library**, with a value in every mode. In code, the same token goes into the base (step 4 of the code guide). Never create the variable only in the product file.

## Step 3. Make it a component with properties that become props

Select the item and create a component (`Ctrl+Alt+K`). Define its properties with the code props in mind:

| Property in Figma | Type | Prop in code |
| --- | --- | --- |
| `Title` | Text | `title` |
| `Open` (`true`/`false`) | Variant or boolean | `defaultOpen` |
| `Content` | Slot / instance swap | `children` |

And interaction **states** as variants for documentation only: `State = Default / Hover / Focus`. In code they are not props: they are `:hover` and `:focus-visible` in CSS.

Name it with the family first, matching the code folder: `Accordion/Item`.

Golden rule: **every Figma property has a matching prop with the same name**, and the code has no prop Figma doesn't show. If the two lists don't match, one of them is wrong.

## Step 4. Prepare the handoff

1. In the component description, write what it is for and when **not** to use it.
2. Annotate accessibility on the frame itself: focus order, what the screen reader announces ("button, collapsed"), how it works with the keyboard.
3. Mark the frame as **Ready for dev**.
4. In Dev Mode, click each layer and check that **variable names** show up, not values. That is what the developer (or you) will copy.

## Step 5. Translate Figma into code

Open the component in Dev Mode and translate it layer by layer:

| In Figma | In CSS |
| --- | --- |
| Vertical / horizontal auto layout | `display: flex; flex-direction: column / row` |
| Gap | `gap: var(--space-...)` |
| Padding | `padding: var(--space-...)` |
| *Space between* | `justify-content: space-between` |
| Alignment | `align-items: ...` |
| *Hug contents* | automatic width (don't declare it) |
| *Fill container* | `flex: 1` or `width: 100%` |
| Fill | `background: var(--color-...)` |
| Stroke | `border: 1px solid var(--color-border-...)` |
| Corner radius | `border-radius: var(--radius-...)` |
| Text style | `font-family`, `font-size`, `font-weight` with `var(--font-...)` |
| Variant `State=Hover` | `:hover` |
| Variant `State=Focus` | `:focus-visible` |
| Property `Open` | the `open` attribute of `<details>` |

The structure becomes semantic HTML, not `div` for everything: the clickable title is a `<summary>`, the item is a `<details>`.

Then follow the [code guide](./create-a-component-from-code.md), steps 3 to 7 (API, tokens, files, accessibility, use on the screen).

## Step 6. Compare side by side

Open the Figma frame and the Storybook story (or the product screen) side by side, at the same width, and compare in **every brand**:

- [ ] Same spacing and heights (use the Figma ruler and the browser inspector).
- [ ] Same colors in every mode/brand.
- [ ] Same typography (family, size, weight, case).
- [ ] Hover and focus states match the variants.
- [ ] On mobile, tablet (768px) and desktop (1024px), the behavior is what the design intended.

When you find a difference, decide which side is right and fix **that** side. If the design changed, Figma is updated; if the code drifted, the code goes back.

## Step 7. Move it into the ADS library

When the component is generic (step 8 of the code guide):

1. **Code:** move it to `alander-src-packages/react/src/components/accordion/` and create the story under `Families/Accordion` (step 9 of the code guide).
2. **Figma:** cut the component from the product file and paste it into the ADS file, on the `Accordion` family page. Publish the library.
3. In the product file, accept the library update: the instances now point to the ADS component.
4. In the component description in Figma, add the link to its Storybook story.

Optional, once it is stable: **Code Connect** links the Figma component to the `<Accordion>` in code, and Dev Mode shows the real code snippet instead of generated CSS.

## Done checklist

- [ ] In Figma, no raw hex or number: everything is an ADS library variable.
- [ ] It works in every mode of the *Semantic* collection.
- [ ] Figma properties = code props, with the same names.
- [ ] States and accessibility annotated.
- [ ] Compared side by side in every brand and at the three screen sizes.
- [ ] If generic: it is in the ADS library and in the `@alander/react` package, linked to each other.

---

## For interviews

**Handoff.** "The handoff is a contract, not a delivery: Figma variables have the same names as the code tokens, and component properties have the same names as the props. So nobody has to translate any value."

**Source of truth.** "For values, the source is the token package and Figma mirrors it. For visual intent, Figma leads and the code follows. When they disagree, we decide which side is right and fix that one."

**Modes and theming.** "One collection of semantic variables with a mode per brand. It's the same thing as `data-brand` in code: the component doesn't know which brand it's using."

**Auto layout is CSS flexbox.** "I design with auto layout because it maps to flexbox almost one to one. If a layout can't be built with auto layout, it will probably be hard in code too."

**Variants and props.** "Variants that change content or structure become props. State variants (hover, focus) exist only for documentation and become CSS pseudo-classes."

Questions that often come up:

- *How do you keep Figma and code in sync?* Same variable and token names, properties = props, a side-by-side comparison before delivering, and (at scale) tokens exported from one file to both sides plus Code Connect.
- *What do you do when a designer uses a value that isn't in the system?* I ask what the intent is. If it's a real need, it becomes a new semantic token on both sides; if not, I use the closest existing token.
- *How do you document a component?* What it's for, when not to use it, props/properties, states, accessibility, and a live example in Storybook.
