# Alander Design System (ADS)

One set of components for Portfolio, Deviante and Flashbrix. Each product is a **brand** on top of a neutral **base** theme: the components are the same, only the tokens change.

## Tokens: two layers

| Layer | Where | What it holds |
| --- | --- | --- |
| Primitive | `src/base/primitives.json`, `src/brands/<brand>/primitives.json` | Raw values: the neutral palette, each brand's palette and fonts, shared spacing, radii and type scale |
| Semantic | `src/base/semantic.json`, `src/brands/<brand>/semantic.json` | Names with intent (`color.action.primary`, `radius.control`). The base defines the whole contract; a brand overrides only what differs and inherits the rest |

Components read semantic tokens only. There is no component-token layer: when a component needs something of its own, add a more specific semantic token to the base.

Components are organized in families, one folder each under `alander-src-packages/react/src/components/`: `button` (Button, SocialButton), `field` (TextField, SearchField, TextArea, Select), `link`, `alert`, `text` (Text, Heading), `logo`, `badge`, `card`, `avatar`, `dialog` (Dialog, ConfirmDialog), `menu`, `tabs`, `table`, `separator`. Families are an organization, not a token layer: Storybook groups stories under `Families/<family>`, and the token table has a view of which semantic tokens each family reads, taken from its styles. A new component (an accordion, say) gets a new family folder.

Breakpoints: tablet from 768px, desktop from 1024px. `font.size.headline.{mobile,tablet,desktop}` is the landing-page highlight (`<Heading size="headline">`); Flashbrix sets it to 32/68/74px in EB Garamond.

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

## Guides

- [Create a component from code](docs/guides/create-a-component-from-code.md)
- [Create a component from Figma](docs/guides/create-a-component-from-figma.md)

## Using it in a product

Install the published package by URL. It works with npm, pnpm and yarn, and on Vercel, with no token or registry setup:

```sh
npm install https://github.com/aland3r/alanderdesign/releases/download/v0.2.0/alander-react-0.2.0.tgz
```

`@alander/react` is self-contained: its stylesheet already includes every brand's tokens. Install `alander-tokens-<version>.tgz` from the same release only if the product reads token values directly, or uses TypeScript.

```jsx
import '@alander/react/styles.css' // once, in the app entry file
import { AuthLayout, BrandProvider, LoginForm } from '@alander/react'

<BrandProvider brand="flashbrix">
  <AuthLayout>
    <LoginForm title="Criar conta" googleLabel="Cadastrar com Google" onGoogleSignIn={loginWithGoogle} />
  </AuthLayout>
</BrandProvider>
```

## Publishing

A release is a version tag. Pushing it runs `.github/workflows/release.yml`, which type-checks, builds both packages and attaches them to a GitHub Release as tarballs.

1. Set the same new `version` in `alander-src-packages/react/package.json` and `alander-src-packages/tokens/package.json`.
2. Commit, then tag and push:

```sh
git tag v0.3.0
git push origin main v0.3.0
```

3. In each product, install the new URL (`.../download/v0.3.0/alander-react-0.3.0.tgz`).

`pnpm release:pack` builds the same tarballs into `release/` on your machine. To try a change in a product before releasing, install that local file: `npm install ../alanderdesign/release/alander-react-<version>.tgz`.

Inside this repository nothing changes: Storybook reads the packages straight from `src`.

## Sources for the brand values

- Portfolio: `portfolio/app/portfolio-tokens.css` and `typography-tokens.css`.
- Deviante: `deviante-web/src/index.css` (v1.0 dark/red theme).
- Flashbrix: Flashbrix v1.0 Figma variables (`mint`, `blank`, `rune`, `intercourse`, `headliner`), the isotype SVG, and the Login section. Values marked "Not in Figma yet" in `primitives.json` were added for hover states or AA contrast and should be confirmed in Figma.

## Fonts

Inter and EB Garamond load from Google Fonts. Tijolo, GT Planar and Carbonot are licensed, so their files are not in this repository: the `@font-face` rules use a locally installed copy, and each product keeps shipping its own files. Without them, the next font in the token's stack is used.
