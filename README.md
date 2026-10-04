# Alander Design System (ADS)

One set of components for Portfolio, Deviante and Flashbrix. Each product is a **brand** on top of a neutral **base** theme: the components are the same, only the tokens change.

## Tokens: two layers

| Layer | Where | What it holds |
| --- | --- | --- |
| Primitive | `src/base/primitives.json`, `src/brands/<brand>/primitives.json` | Raw values: the neutral palette, each brand's palette and fonts, shared spacing, radii and type scale |
| Semantic | `src/base/semantic.json`, `src/brands/<brand>/semantic.json` | Names with intent (`color.action.primary`, `radius.control`). The base defines the whole contract; a brand overrides only what differs and inherits the rest |

Components read semantic tokens only. There is no component-token layer: when a component needs something of its own, add a more specific semantic token to the base.

The build fails if a brand adds a semantic name the base does not have, or if a text/background pair the components use drops below WCAG AA.

Themes: `base` (neutral ADS, the Storybook default), `portfolio`, `deviante`, `flashbrix`.

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

- Portfolio: `portfolio/app/portfolio-tokens.css` and `typography-tokens.css`.
- Deviante: `deviante-web/src/index.css` (v1.0 dark/red theme).
- Flashbrix: Flashbrix v1.0 Figma variables (`mint`, `blank`, `rune`, `intercourse`, `headliner`), the isotype SVG, and the Login section. Values marked "Not in Figma yet" in `primitives.json` were added for hover states or AA contrast and should be confirmed in Figma.

## Fonts

Inter and EB Garamond load from Google Fonts. Tijolo, GT Planar and Carbonot are licensed, so their files are not in this repository: the `@font-face` rules use a locally installed copy, and each product keeps shipping its own files. Without them, the next font in the token's stack is used.
