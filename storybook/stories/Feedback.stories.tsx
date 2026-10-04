import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, Heading, Link, Logo, Text } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Components/Overview',
  decorators: [(Story) => <Canvas><Story /></Canvas>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const LogoSizes: Story = {
  render: () => (
    <>
      <Logo />
      <Logo size="lg" />
    </>
  ),
}

export const Typography: Story = {
  render: () => (
    <>
      <Heading size="display">Display</Heading>
      <Heading>Título</Heading>
      <Text tone="strong">Texto forte</Text>
      <Text>Texto padrão</Text>
      <Text tone="muted" size="small">Texto discreto, pequeno</Text>
      <Text size="caption" tone="muted">Legenda</Text>
    </>
  ),
}

export const Links: Story = {
  render: () => (
    <Text size="small" tone="muted">
      Ao continuar, você aceita os <Link href="#">Termos de Uso</Link>.
    </Text>
  ),
}

export const ErrorAlert: Story = {
  render: () => <Alert>Não foi possível iniciar o login com Google.</Alert>,
}
