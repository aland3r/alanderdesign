import type { Meta, StoryObj } from '@storybook/react-vite'
import { useBrand } from '@alander/react'
import { catalog } from '@alander/tokens/web/tokens'
import base from '@alander/tokens/brands/base.json'
import deviante from '@alander/tokens/brands/deviante.json'
import flashbrix from '@alander/tokens/brands/flashbrix.json'
import portfolio from '@alander/tokens/brands/portfolio.json'

const themes = ['base', 'portfolio', 'deviante', 'flashbrix'] as const
const values: Record<string, Record<string, unknown>> = { base, portfolio, deviante, flashbrix }
const show = (v: unknown) => (Array.isArray(v) ? v.join(', ') : String(v))

// The flat JSON keys tokens in PascalCase; the catalog lists them in kebab-case.
const key = (name: string) => name.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase())

/** Tokens of one layer, grouped, with the value each resolves to in each theme. Faded cells inherit the base. */
function TokenTable({ layer }: { layer: 'semantic' | 'family' }) {
  const active = useBrand()
  const rows = catalog.filter((t) => t.layer === layer)
  const groups = [...new Set(rows.map((t) => t.group))]
  const cell = {
    padding: '8px 12px',
    borderBottom: '1px solid var(--color-border-default)',
    textAlign: 'left' as const,
  }

  return (
    <div
      style={{
        padding: 32,
        background: 'var(--color-background-surface)',
        minHeight: '100vh',
        color: 'var(--color-text-strong)',
      }}
    >
      <table style={{ borderCollapse: 'collapse', fontSize: 14, width: '100%' }}>
        <thead>
          <tr>
            <th style={cell}>{layer === 'family' ? 'Token da família' : 'Token semântico'}</th>
            {themes.map((t) => (
              <th key={t} style={cell}>
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.flatMap((group) => [
            <tr key={group}>
              <th colSpan={themes.length + 1} style={{ ...cell, paddingTop: 24, fontSize: 16 }}>
                {group}
              </th>
            </tr>,
            ...rows
              .filter((t) => t.group === group)
              .map(({ name: css }) => {
                const name = key(css)
                return (
                  <tr key={name}>
                    <td style={cell}>
                      <code>--{css}</code>
                    </td>
                    {themes.map((brand) => {
                      const value = show(values[brand][name])
                      const isColor = value.startsWith('#') || value.startsWith('rgb')
                      const inherited = brand !== 'base' && value === show(values.base[name])
                      return (
                        <td
                          key={brand}
                          style={{ ...cell, fontWeight: brand === active ? 600 : 400, opacity: inherited ? 0.5 : 1 }}
                        >
                          {isColor ? (
                            <span
                              style={{
                                display: 'inline-block',
                                width: 16,
                                height: 16,
                                marginRight: 8,
                                verticalAlign: 'middle',
                                borderRadius: 4,
                                background: value,
                                border: '1px solid var(--color-border-default)',
                              }}
                            />
                          ) : null}
                          <code>{value}</code>
                        </td>
                      )
                    })}
                  </tr>
                )
              }),
          ])}
        </tbody>
      </table>
    </div>
  )
}

const meta = { title: 'Foundations/Tokens', component: TokenTable } satisfies Meta<typeof TokenTable>
export default meta
export const Semantic: StoryObj<typeof meta> = { args: { layer: 'semantic' } }
export const Families: StoryObj<typeof meta> = { args: { layer: 'family' } }
