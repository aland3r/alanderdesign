import type { Meta, StoryObj } from '@storybook/react-vite'
import { useBrand } from '@alander/react'
import deviante from '@alander/tokens/brands/deviante.json'
import flashbrix from '@alander/tokens/brands/flashbrix.json'

const values: Record<string, Record<string, unknown>> = { deviante, flashbrix }
const show = (v: unknown) => (Array.isArray(v) ? v.join(', ') : String(v))

/** Every semantic token and the value it resolves to in each brand. */
function TokenTable() {
  const active = useBrand()
  const names = Object.keys(deviante)
  const cell = { padding: '8px 12px', borderBottom: '1px solid var(--color-border-default)', textAlign: 'left' as const }

  return (
    <div style={{ padding: 32, background: 'var(--color-background-surface)', minHeight: '100vh', color: 'var(--color-text-strong)' }}>
      <table style={{ borderCollapse: 'collapse', fontSize: 14, width: '100%' }}>
        <thead>
          <tr>
            <th style={cell}>Token semântico</th>
            <th style={cell}>Deviante</th>
            <th style={cell}>Flashbrix</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name) => (
            <tr key={name}>
              <td style={cell}><code>{name}</code></td>
              {(['deviante', 'flashbrix'] as const).map((brand) => {
                const value = show(values[brand][name])
                const isColor = value.startsWith('#') || value.startsWith('rgb')
                return (
                  <td key={brand} style={{ ...cell, fontWeight: brand === active ? 600 : 400 }}>
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
