import type { Meta, StoryObj } from '@storybook/react-vite'
import { useBrand } from '@alander/react'
import base from '@alander/tokens/brands/base.json'
import deviante from '@alander/tokens/brands/deviante.json'
import flashbrix from '@alander/tokens/brands/flashbrix.json'
import portfolio from '@alander/tokens/brands/portfolio.json'

const themes = ['base', 'portfolio', 'deviante', 'flashbrix'] as const
const values: Record<string, Record<string, unknown>> = { base, portfolio, deviante, flashbrix }
const show = (v: unknown) => (Array.isArray(v) ? v.join(', ') : String(v))

/** Every semantic token and the value it resolves to in each theme. Faded cells inherit the base. */
function TokenTable() {
  const active = useBrand()
  const names = Object.keys(base)
  const cell = { padding: '8px 12px', borderBottom: '1px solid var(--color-border-default)', textAlign: 'left' as const }

  return (
    <div style={{ padding: 32, background: 'var(--color-background-surface)', minHeight: '100vh', color: 'var(--color-text-strong)' }}>
      <table style={{ borderCollapse: 'collapse', fontSize: 14, width: '100%' }}>
        <thead>
          <tr>
            <th style={cell}>Token semântico</th>
            {themes.map((t) => (
              <th key={t} style={cell}>{t}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {names.map((name) => (
            <tr key={name}>
              <td style={cell}><code>{name}</code></td>
              {themes.map((brand) => {
                const value = show(values[brand][name])
                const isColor = value.startsWith('#') || value.startsWith('rgb')
                const inherited = brand !== 'base' && value === show(values.base[name])
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
          ))}
        </tbody>
      </table>
    </div>
  )
}

const meta = { title: 'Foundations/Tokens', component: TokenTable } satisfies Meta<typeof TokenTable>
export default meta
export const Semantic: StoryObj<typeof meta> = {}
