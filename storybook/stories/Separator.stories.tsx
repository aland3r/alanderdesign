import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator, Text } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Separator/Separator',
  component: Separator,
  decorators: [(Story) => <Canvas><Story /></Canvas>],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 320, display: 'grid', gap: 'var(--space-stack-sm)' }}>
      <Text>Processes</Text>
      <Separator />
      <Text>Analyses</Text>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-inset-md)' }}>
      <Text>Processes</Text>
      <Separator orientation="vertical" />
      <Text>Analyses</Text>
    </div>
  ),
}
