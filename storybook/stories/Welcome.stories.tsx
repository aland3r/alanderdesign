import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties, ReactNode } from 'react'
import { Heading, Link, Logo, Text } from '@alander/react'

const repo = 'https://github.com/aland3r/alanderdesign/blob/main'

const sections = [
  { name: 'Patterns', what: 'Ready-made screens and blocks, like each product’s login.' },
  { name: 'Foundations', what: 'The tokens: color, typography, spacing and radii, with each brand’s value.' },
  { name: 'Families', what: 'The components, grouped by family: Button, Field, Link, Alert, Text, Logo.' },
]

const status: { component: string; family: string; state: 'Ready' | 'In progress' | 'Planned' }[] = [
  { component: 'Button', family: 'button', state: 'Ready' },
  { component: 'SocialButton', family: 'button', state: 'Ready' },
  { component: 'TextField', family: 'field', state: 'Ready' },
  { component: 'SearchField', family: 'field', state: 'In progress' },
  { component: 'Link', family: 'link', state: 'Ready' },
  { component: 'Alert', family: 'alert', state: 'Ready' },
  { component: 'Text, Heading', family: 'text', state: 'Ready' },
  { component: 'Logo', family: 'logo', state: 'Ready' },
  { component: 'AuthLayout, LoginForm', family: 'pattern', state: 'Ready' },
  { component: 'Accordion', family: 'accordion', state: 'Planned' },
]

const page: CSSProperties = {
  minHeight: '100vh',
  padding: 'var(--space-stack-xl) var(--space-inset-lg)',
  background: 'var(--color-background-surface)',
}
const column: CSSProperties = { maxWidth: 880, margin: '0 auto', display: 'grid', gap: 'var(--space-stack-xl)' }
const grid: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-stack-sm)' }
const card: CSSProperties = {
  display: 'grid',
  gap: 'var(--space-stack-xs)',
  padding: 'var(--space-inset-md)',
  border: '1px solid var(--color-border-default)',
  borderRadius: 'var(--radius-control)',
}
const cell: CSSProperties = { padding: 'var(--space-inset-sm) 0', borderBottom: '1px solid var(--color-border-default)', textAlign: 'left' }
const code: CSSProperties = {
  margin: 0,
  padding: 'var(--space-inset-md)',
  borderRadius: 'var(--radius-control)',
  background: 'var(--color-background-input)',
  color: 'var(--color-text-strong)',
  fontSize: 'var(--font-size-small)',
  overflowX: 'auto',
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: 'grid', gap: 'var(--space-stack-sm)' }}>
      <Heading level={2}>{title}</Heading>
      {children}
    </section>
  )
}

/** Storybook entry page. It is built with ADS components and tokens, so it follows the brand in the toolbar. */
function WelcomePage() {
  return (
    <main style={page}>
      <div style={column}>
        <header style={{ display: 'grid', gap: 'var(--space-stack-sm)' }}>
          <Logo size="lg" />
          <Heading size="display">Alander Design System</Heading>
          <Text tone="muted">
            One set of components for Portfolio, Deviante and Flashbrix. The components are the same; what changes from
            one product to another is the tokens. Switch the brand in the toolbar and this page changes with it.
          </Text>
        </header>

        <Section title="Principles">
          <div style={grid}>
            {[
              ['One component, many brands', 'No component knows which brand it is using. It reads tokens, and the brand sets the values.'],
              ['Two token layers', 'Primitives hold the raw values; semantic tokens say what they are for. Components read semantic tokens only.'],
              ['Accessible by default', 'Native HTML, visible focus, and AA contrast checked in the build.'],
            ].map(([title, body]) => (
              <div key={title} style={card}>
                <Text tone="strong">{title}</Text>
                <Text size="small" tone="muted">{body}</Text>
              </div>
            ))}
          </div>
        </Section>

        <Section title="How it is organized">
          <div style={grid}>
            {sections.map((s) => (
              <div key={s.name} style={card}>
                <Text tone="strong">{s.name}</Text>
                <Text size="small" tone="muted">{s.what}</Text>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Getting started">
          <Text>Wrap the app in BrandProvider with the product’s brand and use the components:</Text>
          <pre style={code}>{`import { BrandProvider, Button } from '@alander/react'

<BrandProvider brand="base">
  <Button>Get started</Button>
</BrandProvider>`}</pre>
          <Text>
            To create a new component, follow the guide{' '}
            <Link href={`${repo}/docs/guides/create-a-component-from-code.md`} target="_blank" rel="noreferrer">from code</Link>
            {' '}or the guide{' '}
            <Link href={`${repo}/docs/guides/create-a-component-from-figma.md`} target="_blank" rel="noreferrer">from Figma</Link>.
          </Text>
        </Section>

        <Section title="Component status">
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {['Component', 'Family', 'Status'].map((h) => (
                  <th key={h} style={cell}><Text size="small" tone="muted">{h}</Text></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {status.map((row) => (
                <tr key={row.component}>
                  <td style={cell}><Text size="small" tone="strong">{row.component}</Text></td>
                  <td style={cell}><Text size="small">{row.family}</Text></td>
                  <td style={cell}><Text size="small" tone={row.state === 'Ready' ? 'strong' : 'muted'}>{row.state}</Text></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      </div>
    </main>
  )
}

const meta = { title: 'Introduction/Welcome', component: WelcomePage } satisfies Meta<typeof WelcomePage>
export default meta
export const Welcome: StoryObj<typeof meta> = {}
