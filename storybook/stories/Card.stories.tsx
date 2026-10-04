import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, Button, Card, Text } from '@alander/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Families/Card/Card',
  component: Card,
  decorators: [(Story) => <Canvas><div style={{ width: 320 }}><Story /></div></Canvas>],
  args: { title: 'Analysis DR_MS_04', description: 'Edited 1 day ago' },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const TitleOnly: Story = {}
export const WithContent: Story = {
  args: { children: <Text size="small">Process DR_MS_04 has drifted from its reference in nine places.</Text> },
}
export const WithFooter: Story = {
  args: {
    children: <Badge tone="danger">9 drifts</Badge>,
    footer: <Button size="sm" variant="secondary">Open</Button>,
  },
}
