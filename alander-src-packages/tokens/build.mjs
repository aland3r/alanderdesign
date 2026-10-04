// Builds the ADS tokens for every brand with Style Dictionary.
//
// Two layers only:
//   1. primitives  (src/core/primitives.json + src/brands/<brand>/primitives.json)
//   2. semantic    (src/core/semantic.json   + src/brands/<brand>/semantic.json)
//
// Components read semantic tokens only, so only semantic tokens are emitted.
// Every brand must define exactly the same semantic names; the build fails
// otherwise, which keeps the contract identical across products.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import StyleDictionary from 'style-dictionary'

const root = path.dirname(fileURLToPath(import.meta.url))
const brands = fs.readdirSync(path.join(root, 'src/brands'))
const checkOnly = process.argv.includes('--check')

const isSemantic = (token) => token.filePath.endsWith('semantic.json')

function sourcesFor(brand) {
  return [
    'src/core/primitives.json',
    `src/brands/${brand}/primitives.json`,
    'src/core/semantic.json',
    `src/brands/${brand}/semantic.json`,
  ]
}

const names = {}

for (const brand of brands) {
  const sd = new StyleDictionary({
    source: sourcesFor(brand),
    usesDtcg: true,
    log: { verbosity: 'silent' },
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'dist/web/',
        files: [
          {
            destination: `${brand}.css`,
            format: 'css/variables',
            filter: isSemantic,
            options: { selector: `[data-brand="${brand}"]`, outputReferences: false },
          },
        ],
      },
      json: {
        transformGroup: 'js',
        buildPath: 'dist/json/',
        files: [{ destination: `${brand}.json`, format: 'json/flat', filter: isSemantic }],
      },
    },
  })

  const tokens = await sd.getPlatformTokens('css')
  names[brand] = tokens.allTokens.filter(isSemantic).map((t) => t.name).sort()

  if (!checkOnly) await sd.buildAllPlatforms()
}

// The semantic contract must be identical for every brand.
const [first, ...rest] = brands
for (const brand of rest) {
  const missing = names[first].filter((n) => !names[brand].includes(n))
  const extra = names[brand].filter((n) => !names[first].includes(n))
  if (missing.length || extra.length) {
    console.error(`Semantic contract mismatch between ${first} and ${brand}`)
    if (missing.length) console.error(`  missing in ${brand}: ${missing.join(', ')}`)
    if (extra.length) console.error(`  only in ${brand}: ${extra.join(', ')}`)
    process.exit(1)
  }
}

if (checkOnly) {
  console.log(`Semantic contract OK: ${names[first].length} tokens x ${brands.length} brands`)
  process.exit(0)
}

const all = brands.map((b) => `@import './${b}.css';`).join('\n')
fs.writeFileSync(path.join(root, 'dist/web/all.css'), `${all}\n`)

const vars = Object.fromEntries(names[first].map((n) => [n, `var(--${n})`]))
fs.writeFileSync(
  path.join(root, 'dist/web/tokens.js'),
  `export const brands = ${JSON.stringify(brands)}\nexport const tokens = ${JSON.stringify(vars, null, 2)}\n`,
)
fs.writeFileSync(
  path.join(root, 'dist/web/tokens.d.ts'),
  `export type Brand = ${brands.map((b) => `'${b}'`).join(' | ')}\n` +
    `export declare const brands: Brand[]\n` +
    `export type TokenName = ${names[first].map((n) => `'${n}'`).join('\n  | ')}\n` +
    `export declare const tokens: Record<TokenName, string>\n`,
)

console.log(`Built ${names[first].length} semantic tokens for ${brands.join(', ')}`)
