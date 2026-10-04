import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties, ReactNode } from 'react'
import { Heading, Link, Logo, Text } from '@alander/react'

const repo = 'https://github.com/aland3r/alanderdesign/blob/main'

const sections = [
  { name: 'Patterns', what: 'Telas e blocos prontos, como o login de cada produto.' },
  { name: 'Foundations', what: 'Os tokens: cores, tipografia, espaços e raios, com o valor de cada marca.' },
  { name: 'Families', what: 'Os componentes, agrupados por família: Button, Field, Link, Alert, Text, Logo.' },
]

const status: { component: string; family: string; state: 'Pronto' | 'Em construção' | 'Planejado' }[] = [
  { component: 'Button', family: 'button', state: 'Pronto' },
  { component: 'SocialButton', family: 'button', state: 'Pronto' },
  { component: 'TextField', family: 'field', state: 'Pronto' },
  { component: 'SearchField', family: 'field', state: 'Em construção' },
  { component: 'Link', family: 'link', state: 'Pronto' },
  { component: 'Alert', family: 'alert', state: 'Pronto' },
  { component: 'Text, Heading', family: 'text', state: 'Pronto' },
  { component: 'Logo', family: 'logo', state: 'Pronto' },
  { component: 'AuthLayout, LoginForm', family: 'padrão', state: 'Pronto' },
  { component: 'Accordion', family: 'accordion', state: 'Planejado' },
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

/** Página de entrada do Storybook. Ela mesma usa os componentes e tokens do ADS, então muda com a marca da barra de cima. */
function Welcome() {
  return (
    <main style={page}>
      <div style={column}>
        <header style={{ display: 'grid', gap: 'var(--space-stack-sm)' }}>
          <Logo size="lg" />
          <Heading size="display">Alander Design System</Heading>
          <Text tone="muted">
            Um conjunto de componentes para Portfolio, Deviante e Flashbrix. Os componentes são os mesmos; o que muda
            de um produto para o outro são os tokens. Troque a marca no botão da barra de cima e esta página muda junto.
          </Text>
        </header>

        <Section title="Princípios">
          <div style={grid}>
            {[
              ['Um componente, várias marcas', 'Nenhum componente sabe qual marca está usando. Ele lê tokens, e a marca define os valores.'],
              ['Duas camadas de tokens', 'Primitivos guardam os valores crus; semânticos dizem para que servem. Componentes leem só semânticos.'],
              ['Acessível por padrão', 'HTML nativo, foco visível e contraste AA conferido no build.'],
            ].map(([title, body]) => (
              <div key={title} style={card}>
                <Text tone="strong">{title}</Text>
                <Text size="small" tone="muted">{body}</Text>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Como está organizado">
          <div style={grid}>
            {sections.map((s) => (
              <div key={s.name} style={card}>
                <Text tone="strong">{s.name}</Text>
                <Text size="small" tone="muted">{s.what}</Text>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Como começar">
          <Text>Envolva o app no BrandProvider com a marca do produto e use os componentes:</Text>
          <pre style={code}>{`import { BrandProvider, Button } from '@alander/react'

<BrandProvider brand="flashbrix">
  <Button>Começar</Button>
</BrandProvider>`}</pre>
          <Text>
            Para criar um componente novo, siga o guia{' '}
            <Link href={`${repo}/docs/guides/criar-componente-pelo-codigo.md`} target="_blank" rel="noreferrer">pelo código</Link>
            {' '}ou o guia{' '}
            <Link href={`${repo}/docs/guides/criar-componente-pelo-figma.md`} target="_blank" rel="noreferrer">a partir do Figma</Link>.
          </Text>
        </Section>

        <Section title="Estado dos componentes">
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {['Componente', 'Família', 'Estado'].map((h) => (
                  <th key={h} style={cell}><Text size="small" tone="muted">{h}</Text></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {status.map((row) => (
                <tr key={row.component}>
                  <td style={cell}><Text size="small" tone="strong">{row.component}</Text></td>
                  <td style={cell}><Text size="small">{row.family}</Text></td>
                  <td style={cell}><Text size="small" tone={row.state === 'Pronto' ? 'strong' : 'muted'}>{row.state}</Text></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      </div>
    </main>
  )
}

const meta = { title: 'Introdução/Bem-vindo', component: Welcome } satisfies Meta<typeof Welcome>
export default meta
export const BemVindo: StoryObj<typeof meta> = { name: 'Bem-vindo' }
