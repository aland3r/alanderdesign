# Alander Design System (ADS)

One set of components for Deviante and Flashbrix. Each product is a **brand**: the components are the same, only the tokens change.

## Tokens: two layers

| Layer | Where | What it holds |
| --- | --- | --- |
| Primitive | `src/core/primitives.json`, `src/brands/<brand>/primitives.json` | Raw values: each brand's palette and fonts, plus shared spacing, radii and type scale |
| Semantic | `src/core/semantic.json`, `src/brands/<brand>/semantic.json` | Names with intent (`color.action.primary`, `radius.control`). Same names in every brand, each pointing at that brand's primitives |

Components read semantic tokens only. There is no component-token layer: when a component needs something of its own, add a more specific semantic token.

The build fails if the brands do not define exactly the same semantic names, or if a text/background pair the components use drops below WCAG AA.

## Layout

```text
alanderdesign/
  alander-src-packages/
    tokens/   @alander/tokens  Style Dictionary source and build (dist/web CSS, dist/json)
    react/    @alander/react   BrandProvider, components and patterns for the web
  storybook/                   Visual catalog with a brand switcher in the toolbar
```

React Native will be a sibling `alander-src-packages/react-native/` reading the same tokens through a new Style Dictionary platform.

## Commands

```sh
pnpm install
pnpm storybook        # builds tokens, then opens Storybook on :6006
pnpm typecheck        # token contract + contrast check + TypeScript
pnpm build-storybook  # static Storybook in storybook/storybook-static
```

## Using it in a product

```jsx
import { AuthLayout, BrandProvider, LoginForm } from '@alander/react'

<BrandProvider brand="flashbrix">
  <AuthLayout>
    <LoginForm title="Criar conta" googleLabel="Cadastrar com Google" onGoogleSignIn={loginWithGoogle} />
  </AuthLayout>
</BrandProvider>
```

## Sources for the brand values

- Deviante: `deviante-web/src/index.css` (v1.0 dark/red theme).
- Flashbrix: Flashbrix v1.0 Figma variables (`mint`, `blank`, `rune`, `intercourse`, `headliner`), the isotype SVG, and the Login section. Values marked "Not in Figma yet" in `primitives.json` were added for hover states or AA contrast and should be confirmed in Figma.
