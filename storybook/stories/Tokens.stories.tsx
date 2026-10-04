import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties, ReactNode } from 'react'
import { useBrand } from '@alander/react'
import { catalog } from '@alander/tokens/web/tokens'
import base from '@alander/tokens/brands/base.json'
import deviante from '@alander/tokens/brands/deviante.json'
import flashbrix from '@alander/tokens/brands/flashbrix.json'
import portfolio from '@alander/tokens/brands/portfolio.json'

const themes = ['base', 'portfolio', 'deviante', 'flashbrix'] as const
const values: Record<string, Record<string, unknown>> = { base, portfolio, deviante, flashbrix }
const show = (v: unknown) => (Array.isArray(v) ? v.join(', ') : String(v))

// The flat JSON is keyed in PascalCase; CSS variables are kebab-case.
const key = (name: string) => name.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase())

// Which semantic tokens each component family reads, taken from the component styles.
// Families are the folders under alander-src-packages/react/src/components.
const styles = import.meta.glob('../../alander-src-packages/react/src/components/*/*/*.module.css', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>
const families: Record<string, Set<string>> = {}
for (const [file, css] of Object.entries(styles)) {
  const family = file.split('/components/')[1].split('/')[0]
  families[family] ??= new Set()
  for (const [, name] of css.matchAll(/var\(--([a-z0-9-]+)/g)) families[family].add(name)
}

const cell: CSSProperties = { padding: '8px 12px', borderBottom: '1px solid var(--color-border-default)', textAlign: 'left' }

function Row({ name }: { name: string }) {
  const active = useBrand()
  return (
    <tr>
      <td style={cell}><code>--{name}</code></td>
      {themes.map((brand) => {
        const value = show(values[brand][key(name)])
        const isColor = value.startsWith('#') || value.startsWith('rgb')
        const inherited = brand !== 'base' && value === show(values.base[key(name)])
        return (
          <td key={brand} style={{ ...cell, fontWeight: brand === active ? 600 : 400, opacity: inherited ? 0.5 : 1 }}>
            {isColor ? (
              <span style={{ display: 'inline-block', width: 16, height: 16, marginRight: 8, verticalAlign: 'middle', borderRadius: 4, background: value, border: '1px solid var(--color-border-default)' }} />
            ) : null}
            <code>{value}</code>
          </td>
        )
      })}
    </tr>
  )
}

function Table({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div style={{ padding: 32, background: 'var(--color-background-surface)', minHeight: '100vh', color: 'var(--color-text-strong)' }}>
      <table style={{ borderCollapse: 'collapse', fontSize: 14, width: '100%' }}>
        <thead>
          <tr>
            <th style={cell}>{heading}</th>
            {themes.map((t) => <th key={t} style={cell}>{t}</th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

const Group = ({ title }: { title: string }) => (
  <tr><th colSpan={themes.length + 1} style={{ ...cell, paddingTop: 24, fontSize: 16 }}>{title}</th></tr>
)

/** Semantic tokens grouped by kind, or by the component family that reads them. Faded cells inherit the base. */
function TokenTable({ by }: { by: 'kind' | 'family' }) {
  const groups =
    by === 'kind'
      ? [...new Set(catalog.map((t) => t.group))].map((g) => [g, catalog.filter((t) => t.group === g).map((t) => t.name as string)] as const)
      : Object.keys(families).sort().map((f) => [f, catalog.map((t) => t.name as string).filter((n) => families[f].has(n))] as const)
  return (
    <Table heading={by === 'family' ? 'Token semântico usado pela família' : 'Token semântico'}>
      {groups.flatMap(([title, names]) => [<Group key={title} title={title} />, ...names.map((n) => <Row key={`${title}-${n}`} name={n} />)])}
    </Table>
  )
}

const meta = { title: 'Foundations/Tokens', component: TokenTable } satisfies Meta<typeof TokenTable>
export default meta
export const Semantic: StoryObj<typeof meta> = { args: { by: 'kind' } }
export const ByFamily: StoryObj<typeof meta> = { args: { by: 'family' } }
