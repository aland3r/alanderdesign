import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading, Text } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Text/Typography',
  decorators: [(Story) => <Canvas><Story /></Canvas>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Headings: Story = {
  render: () => (
    <>
      <Heading size="display">Display</Heading>
      <Heading>Título</Heading>
    </>
  ),
}

export const Body: Story = {
  render: () => (
    <>
      <Text tone="strong">Texto forte</Text>
      <Text>Texto padrão</Text>
      <Text tone="muted" size="small">Texto discreto, pequeno</Text>
      <Text size="caption" tone="muted">Legenda</Text>
    </>
  ),
}

/** Landing-page highlight. Resize the canvas (or use the viewport toolbar) to see mobile, tablet and desktop sizes. */
export const Headline: Story = {
  render: () => <Heading size="headline">Aprenda com flashcards</Heading>,
}
