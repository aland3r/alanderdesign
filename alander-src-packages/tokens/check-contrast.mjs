// Fails when a text/background pair the components rely on drops below
// WCAG AA (4.5:1 for body text). Runs against the built JSON of every brand.
import fs from 'node:fs'

const pairs = [
  ['ColorTextDefault', 'ColorBackgroundSurface'],
  ['ColorTextStrong', 'ColorBackgroundSurface'],
  ['ColorTextMuted', 'ColorBackgroundSurface'],
  ['ColorTextLink', 'ColorBackgroundSurface'],
  ['ColorTextStrong', 'ColorBackgroundInput'],
  ['ColorTextOnAction', 'ColorActionPrimary'],
  ['ColorTextOnAction', 'ColorActionPrimaryHover'],
  ['ColorFeedbackErrorText', 'ColorBackgroundSurface'],
  ['ColorTextBrand', 'ColorBackgroundSurface'],
  ['ColorTextOnHero', 'ColorBackgroundHero'],
  ['ColorTextOnHeroAccent', 'ColorBackgroundHero'],
]

const channel = (c) => {
  const v = c / 255
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}
const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => channel(parseInt(hex.slice(i, i + 2), 16)))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

let failed = false
for (const file of fs.readdirSync('dist/json')) {
  const brand = file.replace('.json', '')
  const tokens = JSON.parse(fs.readFileSync(`dist/json/${file}`, 'utf8'))
  for (const [fg, bg] of pairs) {
    const r = ratio(tokens[fg], tokens[bg])
    if (r < 4.5) {
      failed = true
      console.error(`${brand}: ${fg} on ${bg} is ${r.toFixed(2)}:1 (needs 4.5:1)`)
    }
  }
}
if (failed) process.exit(1)
console.log(`Contrast OK: ${pairs.length} pairs per brand meet WCAG AA`)
