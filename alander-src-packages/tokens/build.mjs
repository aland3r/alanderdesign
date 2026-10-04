// Builds the ADS tokens for the base theme and every brand with Style Dictionary.
//
// Two layers only:
//   1. primitives  src/base/primitives.json, then src/brands/<brand>/primitives.json
//   2. semantic    src/base/semantic.json,   then src/brands/<brand>/semantic.json
//
// The base defines the full semantic contract with a neutral palette and is a
// theme of its own ("base"). A brand overrides only what differs; anything it
// leaves out falls back to the base. A brand may not add semantic names the
// base does not have, which keeps the contract identical everywhere.
//
// Components read semantic tokens only, so only semantic tokens are emitted.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import StyleDictionary from 'style-dictionary'

const root = path.dirname(fileURLToPath(import.meta.url))
const brands = fs.readdirSync(path.join(root, 'src/brands')).sort()
const themes = ['base', ...brands]
const checkOnly = process.argv.includes('--check')

const isSemantic = (token) => token.filePath.endsWith('semantic.json')

function sourcesFor(theme) {
  const brand = (layer) => (theme === 'base' ? [] : [`src/brands/${theme}/${layer}.json`])
  return [
    'src/base/primitives.json',
    ...brand('primitives'),
    'src/base/semantic.json',
    ...brand('semantic'),
  ]
}

function dictionaryFor(theme) {
  return new StyleDictionary({
    source: sourcesFor(theme),
    usesDtcg: true,
    log: { verbosity: 'silent' },
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'dist/web/',
        files: [
          {
            destination: `${theme}.css`,
            format: 'css/variables',
            filter: isSemantic,
            options: { selector: `[data-brand="${theme}"]`, outputReferences: false },
          },
        ],
      },
      json: {
        transformGroup: 'js',
        buildPath: 'dist/json/',
        files: [{ destination: `${theme}.json`, format: 'json/flat', filter: isSemantic }],
      },
    },
  })
}

const names = {}
const overrides = {}
let catalog = []

for (const theme of themes) {
  const sd = dictionaryFor(theme)
  const { allTokens } = await sd.getPlatformTokens('css')
  const semantic = allTokens.filter(isSemantic)
  names[theme] = semantic.map((t) => t.name).sort()
  overrides[theme] = semantic.filter((t) => t.filePath.includes('/brands/')).length
  if (theme === 'base') {
    // Group for the Storybook token table: color.text, font.size, radius, ...
    const group = (p) => (p[0] === 'color' || p[0] === 'font' ? p.slice(0, 2) : p.slice(0, 1)).join('.')
    catalog = semantic.map((t) => ({ name: t.name, group: group(t.path) }))
  }
  if (!checkOnly) await sd.buildAllPlatforms()
}

// A brand may only override names the base defines.
let broken = false
for (const brand of brands) {
  const extra = names[brand].filter((n) => !names.base.includes(n))
  if (extra.length) {
    broken = true
    console.error(`${brand} defines semantic tokens the base does not have: ${extra.join(', ')}`)
  }
}
if (broken) process.exit(1)

const summary = brands.map((b) => `${b} overrides ${overrides[b]}`).join(', ')
if (checkOnly) {
  console.log(`Semantic contract OK: ${names.base.length} tokens; ${summary}`)
  process.exit(0)
}

const all = themes.map((t) => `@import './${t}.css';`).join('\n')
fs.writeFileSync(path.join(root, 'dist/web/all.css'), `${all}\n`)

const vars = Object.fromEntries(names.base.map((n) => [n, `var(--${n})`]))
fs.writeFileSync(
  path.join(root, 'dist/web/tokens.js'),
  `export const brands = ${JSON.stringify(themes)}\n` +
    `export const tokens = ${JSON.stringify(vars, null, 2)}\n` +
    `export const catalog = ${JSON.stringify(catalog, null, 2)}\n`,
)
fs.writeFileSync(
  path.join(root, 'dist/web/tokens.d.ts'),
  `export type Brand = ${themes.map((t) => `'${t}'`).join(' | ')}\n` +
    `export declare const brands: Brand[]\n` +
    `export type TokenName = ${names.base.map((n) => `'${n}'`).join('\n  | ')}\n` +
    `export declare const tokens: Record<TokenName, string>\n` +
    `export declare const catalog: { name: TokenName; group: string }[]\n`,
)

console.log(`Built ${names.base.length} semantic tokens for ${themes.join(', ')}`)
